'use server';

/**
 * @fileOverview A Genkit flow for converting text to speech.
 *
 * This file exports:
 * - `textToSpeech`: An async function that takes text and returns an audio data URI.
 * - `TextToSpeechInput`: The input type for the textTospeech function.
 * - `TextToSpeechOutput`: The output type for the textToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().nullable().describe("The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'. Can be null if TTS fails."),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}

async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({ text }) => {
    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: text,
      });

      if (!media) {
         console.warn('No audio was generated from the text.');
         return { audioDataUri: null };
      }

      const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
      const wavBase64 = await toWav(audioBuffer);

      return {
        audioDataUri: `data:audio/wav;base64,${wavBase64}`,
      };
    } catch(error: any) {
        // This is likely a rate-limiting error. We can fail gracefully.
        console.error("Text-to-speech service failed:", error.message);
        return { audioDataUri: null };
    }
  }
);
