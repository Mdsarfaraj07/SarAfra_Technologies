import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '../fade-in';

const reasons = [
  {
    title: 'Expert Team',
    description: 'Our team consists of certified professionals with years of industry experience.',
  },
  {
    title: 'Custom Solutions',
    description: 'We don\'t believe in one-size-fits-all. We tailor every solution to your unique goals.',
  },
  {
    title: 'Transparent Process',
    description: 'We keep you informed every step of the way, with clear communication and reporting.',
  },
];

const AboutUsSection = () => {
  return (
    <section id="about" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We are committed to delivering exceptional results and building long-term partnerships.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reasons.map((reason, index) => (
            <FadeIn key={index} className="flex">
              <Card className="hover:border-primary/50 transition-all duration-300 flex flex-col w-full bg-background hover:-translate-y-2">
                <CardHeader>
                  <CardTitle>{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
