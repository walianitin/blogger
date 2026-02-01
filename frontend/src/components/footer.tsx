export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60 py-6 backdrop-blur-sm">
      <p className="text-center text-sm text-slate-500">
        Design and developed by{" "}
        <a
          href="https://github.com/walianitin"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Nitin Walia
        </a>
      </p>
    </footer>
  );
}