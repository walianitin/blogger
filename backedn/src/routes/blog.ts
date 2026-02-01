import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '../../../common/dist/index'
// const rate_limit = rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   limit: 1,
//   standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   keyGenerator: c => '<unique_key>', // Method to generate custom identifiers for clients.
// })
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

// GET /bulk is public so Explore page can show all posts without login
blogRouter.get('/bulk', async c => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return c.json({ posts })
})

blogRouter.use('/*', async (c, next: any) => {
  const authHeader = c.req.header('Authorization') || ''
  console.log(c.req.header)
  if (!authHeader)
    {return c.json({
      // token:authHeader,
      message: '  did not get the token',
    })}
  try {
    const user = await verify(authHeader, 'NITIN_WALIA')
  
    if (user) {

      //@ts-ignore
      c.set('userId', user.id)
      await next()
    } else {
      c.status(403)
      return c.json({
        message: 'you are not logged in',
      })
    }
  } catch (err) {
    return c.json({
      message: 'error in the middleware',
      errror:err
    })
  }
})

blogRouter.post('/post', async c => {
  const body = await c.req.json()
  const { success } = createPostInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({
      message: 'Inputs not correct',
    })
  }
  const authorId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId,
    },
  })
  return c.json({
    message: 'blog created successfully',
    id: blog.id,
  })
})

blogRouter.get('/user_post', async c => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return c.json({ post })
  } catch (e) {
    c.status(411) //
    return c.json({
      message: 'Error while fetching blog post',
      error:e
    })
  }
})

blogRouter.put('/update', async c => {
  const body = await c.req.json()
  const post_id = c.req.param('id')

  console.log('Post ID:', post_id)
  const { success } = updatePostInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({
      message: 'Inputs not correct',
    })
  }
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    if (!post_id) {
      throw new Error('  Post ID is missing or invalid')
    }

    const post = await prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return c.json({
      id: post.id,
      message: 'update are successfully done',
    })
  } catch (err: any) {
    console.error('Error during post update:', err)
    c.status(500)
    return c.json({
      message: 'Something went wrong, unable to update the post.',
      error: err.message, // Optionally send the error message
    })
  }
})
