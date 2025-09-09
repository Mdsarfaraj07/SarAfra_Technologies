import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn } from '../fade-in';

const testimonials = [
  {
    quote: '"SarAfra Technologies transformed our online presence. Their team was professional, responsive, and truly understood our vision. The results have been phenomenal."',
    author: 'Alex P.',
    title: 'CEO, TechCorp',
    avatar: { initial: 'A', src: 'https://picsum.photos/40/40', hint: 'man face' },
  },
  {
    quote: '"The digital marketing strategy they implemented for us was a game-changer. We saw a significant increase in traffic and conversions within months."',
    author: 'Maria S.',
    title: 'Marketing Director, Innovate Ltd.',
    avatar: { initial: 'M', src: 'https://picsum.photos/40/40', hint: 'woman face' },
  },
  {
    quote: '"Their UI/UX design work is top-notch. Our users love the new app interface. It\'s intuitive, clean, and beautiful."',
    author: 'David L.',
    title: 'CTO, Creative Solutions',
    avatar: { initial: 'D', src: 'https://picsum.photos/40/40', hint: 'professional face' },
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            We are proud of the relationships we build and the results we deliver.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} className="flex">
              <Card className="p-6 flex flex-col justify-between bg-background">
                <CardContent className="p-0 flex-grow">
                  <p className="text-muted-foreground mb-4 italic">{testimonial.quote}</p>
                </CardContent>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar.src} alt={`Avatar of ${testimonial.author}`} data-ai-hint={testimonial.avatar.hint} />
                    <AvatarFallback>{testimonial.avatar.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
