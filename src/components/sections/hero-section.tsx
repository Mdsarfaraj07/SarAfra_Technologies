import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FadeIn } from '../fade-in';

const HeroSection = () => {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <FadeIn className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-4">
            Your Partner in <span className="gradient-text">Digital Growth</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            We build innovative software and execute data-driven digital marketing strategies to help your business thrive.
          </p>
          <a href="#services">
            <Button size="lg" className="btn-primary text-white font-medium rounded-full">
              Explore Services
            </Button>
          </a>
        </FadeIn>
        <FadeIn className="md:w-1/2 flex justify-center">
          <Image
            src="https://res.cloudinary.com/dazw9kv1l/image/upload/v1722883363/sarafra-hero-image_kclxlm.png"
            alt="A team of professionals from SarAfra Technologies collaborating on a software project."
            data-ai-hint="software development team"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl w-full max-w-lg md:max-w-none"
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
