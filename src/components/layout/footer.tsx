import { cn } from "@/lib/utils";

const Footer = () => {
  const navItems = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#appointment', label: 'Contact' },
  ];

  return (
    <footer className={cn("bg-background py-8 border-t border-white/10")}>
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} SarAfra Technologies. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
