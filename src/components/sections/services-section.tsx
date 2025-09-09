import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SoftwareDevelopmentIcon, DigitalMarketingIcon, UiUxDesignIcon, CloudSolutionsIcon, AiIntegrationIcon, SeoOptimizationIcon, VoiceAssistantIcon } from '../icons';
import { FadeIn } from '../fade-in';

const services = [
  {
    icon: SoftwareDevelopmentIcon,
    title: 'Software Development',
    description: 'Custom web and mobile application development tailored to your business needs.',
  },
  {
    icon: DigitalMarketingIcon,
    title: 'Digital Marketing',
    description: 'SEO, social media, PPC, and content marketing to boost your online presence.',
  },
  {
    icon: UiUxDesignIcon,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful interfaces that engage your users.',
  },
  {
    icon: CloudSolutionsIcon,
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure setup and management on AWS, GCP, or Azure.',
  },
  {
    icon: AiIntegrationIcon,
    title: 'AI Integration',
    description: 'Leverage the power of AI by integrating smart features into your applications.',
  },
  {
    icon: SeoOptimizationIcon,
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and drive organic traffic to your website.',
  },
   {
    icon: VoiceAssistantIcon,
    title: 'AI Voice Assistants',
    description: 'Build and deploy intelligent voice assistants and chatbots for your business.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            From concept to launch, we provide end-to-end solutions to grow your business.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} className="flex">
              <Card className="p-8 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col w-full">
                <CardHeader className="items-center p-0">
                  <service.icon />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
