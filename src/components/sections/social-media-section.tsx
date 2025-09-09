import { TwitterIcon, LinkedinIcon, FacebookIcon } from '../icons';
import { FadeIn } from '../fade-in';

const socialLinks = [
  {
    href: 'https://twitter.com/SarAfraTech',
    'aria-label': 'Twitter',
    icon: TwitterIcon,
  },
  {
    href: 'https://linkedin.com/company/SarAfraTech',
    'aria-label': 'LinkedIn',
    icon: LinkedinIcon,
  },
  {
    href: 'https://facebook.com/SarAfraTech',
    'aria-label': 'Facebook',
    icon: FacebookIcon,
  },
];

const SocialMediaSection = () => {
  return (
    <section id="social-media" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Connect with Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Follow us on social media for updates, news, and insights.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link['aria-label']}
                className="text-muted-foreground hover:text-accent transition-transform duration-300 ease-in-out hover:scale-125"
              >
                <link.icon />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default SocialMediaSection;
