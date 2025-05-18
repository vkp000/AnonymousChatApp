import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// create an OpenAI API client ( that's adge friendly!)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request){
    try {
        const prompt = "Create a l ist of three open-ended and engaging questions formatted as asingle string. Each quetion should be separated by '||'. These questions are foe an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'what's a hobby you've recently started? || If you coould have dinner with any historical figure, who would it b? || what's a simpple thing that make you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational enviornment."
    
        // Ask OpenAI for a streaming chat completion given the prompt 
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-2024-11-20',
            max_tokens: 400,
            stream: true,
            prompt,
        
        });
    
        // Convert the respopnse into a friendly text-stream 
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);
    } catch (error) {
        if(error instanceof OpenAI.APIError){
             const {name, status, headers, message} = errorreturn 
             return NextResponse.json({
                name, status, headers, message
             }, { status})
        }else{
            console.error("An unexpected error occured", error)
            throw error 
            
        }
    }
}