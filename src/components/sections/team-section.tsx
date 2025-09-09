import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '../fade-in';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const otherTeamMembers = [
  { name: 'Frank L.', role: 'Lead Software Architect', image: { src: 'https://picsum.photos/128/128', hint: 'man portrait' } },
  { name: 'Jane Doe', role: 'Head of Digital Marketing', image: { src: 'https://picsum.photos/128/128', hint: 'woman portrait professional' } },
  { name: 'Mike R.', role: 'Senior UI/UX Designer', image: { src: 'https://picsum.photos/128/128', hint: 'man portrait professional' } },
];

const founderImages = [
  { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722864775/sarafraj_a_founder_ceo_portrait_image_z1gy3n.png', alt: 'Portrait of Sarfaraj A. 1' },
  { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722864878/sarafraj_a_founder_ceo_portrait_image_2_r4yqja.png', alt: 'Portrait of Sarfaraj A. 2' },
  { src: 'https://res.cloudinary.com/dazw9kv1l/image/upload/v1722864930/sarafraj_a_founder_ceo_portrait_image_3_pcec2j.png', alt: 'Portrait of Sarfaraj A. 3' },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Our dedicated professionals are passionate about bringing your ideas to life.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hardcoded Founder & CEO Card with Carousel */}
          <FadeIn>
            <Card className="p-6 flex flex-col">
              <CardContent className="p-0 flex-grow flex flex-col">
                 <Carousel className="w-full max-w-xs mx-auto mb-4">
                    <CarouselContent>
                      {founderImages.map((image, index) => (
                        <CarouselItem key={index}>
                           <Image
                              src={image.src}
                              alt={image.alt}
                              width={128}
                              height={128}
                              className="rounded-full w-32 h-32 mx-auto object-cover"
                            />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                <h3 className="text-xl font-semibold text-foreground">Sarfaraj A.</h3>
                <p className="text-muted-foreground">Founder &amp; CEO</p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Other Team Members */}
          {otherTeamMembers.map((member, index) => (
            <FadeIn key={index}>
              <Card className="p-6">
                <CardContent className="p-0">
                  <Image
                    src={member.image.src}
                    alt={`Portrait of ${member.name}`}
                    data-ai-hint={member.image.hint}
                    width={128}
                    height={128}
                    className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
