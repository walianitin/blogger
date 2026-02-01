interface HeroSectionProps {
  Avatar_url: string;
  author_name: string;
}

export default function HeroSection({ author_name }: HeroSectionProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/avatar.png"
        alt=""
        className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
      />
      <span className="text-sm font-medium text-slate-600">{author_name}</span>
    </div>
  );
}