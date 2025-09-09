'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AppointmentForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Appointment request:', formState);

    toast({
      title: "Appointment Requested",
      description: "Your request has been sent! We will contact you shortly.",
    });

    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <Input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your Message / Project Details</Label>
        <Textarea id="message" name="message" rows={4} value={formState.message} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full btn-primary font-medium rounded-full">
        Request Appointment
      </Button>
    </form>
  );
};

export default AppointmentForm;
