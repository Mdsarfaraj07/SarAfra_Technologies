import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '../fade-in';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A robust e-commerce platform built for a retail brand, featuring a custom CMS and seamless payment integration.',
    image: { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722872366/ecommerce_website_vjiz89.png', alt: 'Screenshot of Project Alpha, an e-commerce website.', hint: 'ecommerce website' },
  },
  {
    title: 'Project Beta',
    description: 'A data visualization dashboard for a logistics company, providing real-time insights into their supply chain.',
    image: { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722872365/data_dashboard_pv9ute.png', alt: 'Dashboard view of Project Beta, a data visualization tool.', hint: 'data dashboard' },
  },
  {
    title: 'Project Gamma',
    description: 'A mobile-first progressive web app for a health and wellness startup, focused on user engagement and retention.',
    image: { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722872366/mobile_app_health_xzq0xw.png', alt: 'Mobile app screenshot of Project Gamma, a health and wellness app.', hint: 'mobile app health' },
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Showcasing a selection of our successful projects.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={index} className="flex">
              <Card className="hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col w-full">
                <CardHeader className="p-0">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    data-ai-hint={project.image.hint}
                    width={600}
                    height={400}
                    className="rounded-t-lg w-full h-auto"
                  />
                </CardHeader>
                <CardContent className="p-6 text-left flex-grow flex flex-col">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <p className="text-muted-foreground flex-grow">{project.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
