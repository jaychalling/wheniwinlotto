import Link from "next/link";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({ title = "로또 일기", showBack = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-lg mx-auto flex items-center h-14 px-4">
        {showBack && (
          <Link href="/" className="mr-3 text-muted hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
        <h1 className="text-lg font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
    </header>
  );
}
