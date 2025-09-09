import AppointmentForm from './appointment-form';
import Chatbot from './chatbot';
import { FadeIn } from '../fade-in';
import { Card } from '@/components/ui/card';

const AppointmentChatbotSection = () => {
  return (
    <section id="appointment" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book an Appointment or Chat with Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Let's discuss your project. We're here to help you get started.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn>
            <Card className="p-8 text-left h-full">
              <h3 className="text-xl font-semibold text-foreground mb-4">Book a Consultation</h3>
              <AppointmentForm />
            </Card>
          </FadeIn>
          <FadeIn>
            <Card className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-foreground mb-4 text-left">Chat with Us</h3>
              <Chatbot />
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AppointmentChatbotSection;
