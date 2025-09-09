import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '../fade-in';

const otherTeamMembers = [
  { name: 'Frank L.', role: 'Lead Software Architect', image: { src: 'https://picsum.photos/128/128', hint: 'man portrait' } },
  { name: 'Jane Doe', role: 'Head of Digital Marketing', image: { src: 'https://picsum.photos/128/128', hint: 'woman portrait professional' } },
  { name: 'Mike R.', role: 'Senior UI/UX Designer', image: { src: 'https://picsum.photos/128/128', hint: 'man portrait professional' } },
];

const ceoImage = {
  src: 'data:image/png;base64,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',
};

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
          <FadeIn>
            <Card className="p-6">
              <CardContent className="p-0">
                <img
                  src={ceoImage.src}
                  alt="Portrait of Sarfaraj A."
                  width={128}
                  height={128}
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground">Sarfaraj A.</h3>
                <p className="text-muted-foreground">Founder &amp; CEO</p>
              </CardContent>
            </Card>
          </FadeIn>

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
