'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { intelligentChatResponses } from '@/ai/flows/intelligent-chat-responses';

type Message = {
  role: 'user' | 'bot' | 'loading';
  text: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm a virtual assistant for SarAfra Technologies. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', text: input };
    const loadingMessage: Message = { role: 'loading', text: '...' };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput('');
    
    try {
      const response = await intelligentChatResponses({ userPrompt: input });
      const botMessage: Message = { role: 'bot', text: response.response };
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
    } catch (error) {
      console.error('Error getting response from AI:', error);
      const errorMessage: Message = { role: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow mb-4 border rounded-lg p-4 h-[400px]" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'p-3 rounded-lg max-w-[80%] break-words',
                message.role === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-muted text-muted-foreground self-start'
              )}
            >
              {message.text}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center">
        <Input
          type="text"
          id="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow rounded-r-none focus-visible:ring-offset-0 focus-visible:ring-1"
        />
        <Button
          id="chat-send-btn"
          onClick={handleSend}
          className="rounded-l-none btn-primary p-3"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
