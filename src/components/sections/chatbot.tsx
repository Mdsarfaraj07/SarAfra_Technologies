'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { intelligentChatResponses } from '@/ai/flows/intelligent-chat-responses';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Message = {
  role: 'user' | 'bot' | 'loading';
  text: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm a virtual assistant for SarAfra Technologies. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          toast({
            variant: 'destructive',
            title: 'No speech detected',
            description: 'Please make sure your microphone is working and try again.',
          });
        } else {
          console.error('Speech recognition error:', event.error);
          toast({
            variant: 'destructive',
            title: 'Speech Recognition Error',
            description: 'An error occurred with speech recognition.',
          });
        }
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      }

      recognitionRef.current = recognition;
    }
  }, [toast]);

  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };
  
  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(audioDataUri);
    audioRef.current = audio;
    audio.play();
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (messageText.trim() === '') return;

    const userMessage: Message = { role: 'user', text: messageText };
    const loadingMessage: Message = { role: 'loading', text: '...' };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    if(!text) setInput('');
    
    try {
      const response = await intelligentChatResponses({ userPrompt: messageText });
      const botMessage: Message = { role: 'bot', text: response.response };
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);

      const ttsResponse = await textToSpeech({ text: response.response });
      playAudio(ttsResponse.audioDataUri);

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
          placeholder="Type your message or use the mic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow focus-visible:ring-offset-0 focus-visible:ring-1"
        />
        {recognitionRef.current && (
          <Button
            onClick={handleToggleListening}
            className={cn('p-3', isListening ? 'btn-primary' : '')}
            variant={isListening ? "default" : "ghost"}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
        <Button
          id="chat-send-btn"
          onClick={() => handleSend()}
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
