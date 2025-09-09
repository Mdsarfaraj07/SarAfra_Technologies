'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleAppointment } from '@/ai/flows/appointment-flow';
import { Loader2 } from 'lucide-react';

const AppointmentForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await handleAppointment(formState);
      
      if (result.success) {
        toast({
          title: "Appointment Requested",
          description: "Your request has been sent! We will contact you shortly.",
        });
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        variant: 'destructive',
        title: "Submission Failed",
        description: "There was a problem submitting your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required disabled={isLoading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <Input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required disabled={isLoading} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your Message / Project Details</Label>
        <Textarea id="message" name="message" rows={4} value={formState.message} onChange={handleChange} required disabled={isLoading} />
      </div>
      <Button type="submit" className="w-full btn-primary font-medium rounded-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? 'Submitting...' : 'Request Appointment'}
      </Button>
    </form>
  );
};

export default AppointmentForm;
