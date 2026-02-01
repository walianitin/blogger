import Hero from "../components/Hero";
import HeaderHome from "../components/HeaderHome";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50">
      <HeaderHome />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}