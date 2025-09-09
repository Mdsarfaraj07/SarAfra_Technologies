'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
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
  role: 'user' | 'bot';
  text: string;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm a virtual assistant for SarAfra Technologies. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      setTimeout(() => {
        viewport.scrollTop = viewport.scrollHeight;
      }, 0);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const playAudio = useCallback((audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(audioDataUri);
    audioRef.current = audio;
    audio.play().catch(err => {
      console.error("Audio playback failed:", err)
      // Autoplay might be blocked.
    });
  }, []);

  const handleSend = useCallback(async (text?: string) => {
    const messageText = text || input;
    if (messageText.trim() === '' || isSending) return;

    setIsSending(true);
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: messageText }]);

    try {
      const response = await intelligentChatResponses({ userPrompt: messageText });
      const botMessage: Message = { role: 'bot', text: response.response };
      setMessages((prev) => [...prev, botMessage]);

      const ttsResponse = await textToSpeech({ text: response.response });
      if (ttsResponse.audioDataUri) {
        playAudio(ttsResponse.audioDataUri);
      }

    } catch (error) {
      console.error('Error getting response from AI:', error);
      const errorMessage: Message = { role: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsSending(false);
    }
  }, [input, isSending, playAudio]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
            console.error('Speech recognition error:', event.error);
            toast({
                variant: 'destructive',
                title: 'Speech Recognition Error',
                description: 'An error occurred. Please check your microphone permissions.',
            });
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      }

      recognitionRef.current = recognition;
    }
  }, [toast, handleSend]);

  const handleToggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow mb-4 border rounded-lg" ref={scrollAreaRef}>
        <div className="p-4" ref={viewportRef}>
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
             {isSending && (
                <div className="p-3 rounded-lg max-w-[80%] break-words bg-muted text-muted-foreground self-start">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
            )}
            </div>
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center">
        <Input
          type="text"
          id="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending || isListening}
          className="flex-grow focus-visible:ring-offset-0 focus-visible:ring-1"
        />
        {recognitionRef.current && (
          <Button
            type="button"
            onClick={handleToggleListening}
            className={cn('p-3', isListening ? 'btn-primary' : '')}
            variant={isListening ? "default" : "ghost"}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
            disabled={isSending}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
        <Button
          id="chat-send-btn"
          type="submit"
          className="rounded-l-none btn-primary p-3"
          aria-label="Send message"
          disabled={isSending || input.trim() === ''}
        >
          {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
