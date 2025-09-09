import Image from 'next/image';
import { FadeIn } from '../fade-in';

const technologies = [
  { name: 'JavaScript', src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
  { name: 'Python', src: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
  { name: 'React', src: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black' },
  { name: 'Angular', src: 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white' },
  { name: 'Vue.js', src: 'https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white' },
  { name: 'Node.js', src: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white' },
  { name: 'Tailwind CSS', src: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' },
  { name: 'MongoDB', src: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white' },
  { name: 'Firebase', src: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' },
  { name: 'AWS', src: 'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white' },
];

const TechStackSection = () => {
  const marqueeContent = [...technologies, ...technologies]; // Duplicate for seamless scroll

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Technology Stack</h2>
        </FadeIn>
        <div className="marquee">
          <div className="marquee-content">
            {marqueeContent.map((tech, index) => (
              <div key={index} className="marquee-item inline-block h-8">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={120}
                  height={32}
                  unoptimized // Shields.io are SVGs, next/image optimization might not be ideal
                  className="h-full w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
