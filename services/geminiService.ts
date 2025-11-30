import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { BOOK_PAGES } from "../constants";

const API_KEY = process.env.REACT_APP_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

const initializeGenAI = () => {
  if (genAI) {
    return;
  }
  if (!API_KEY) {
    console.error("API_KEY not found. Please set the REACT_APP_API_KEY environment variable.");
    return;
  }
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
  } catch (error) {
    console.error("Failed to initialize GoogleGenerativeAI", error);
  }
};

initializeGenAI();

export const chatWithBook = async (userQuestion: string): Promise<string> => {
  if (!genAI) {
    initializeGenAI();
    if (!genAI) return "I'm sorry, I can't connect to the AI right now. Please check your API key configuration.";
  }

  // Construct context from the book content
  const bookContext = BOOK_PAGES.map(page => {
    return `Page ${page.id} (${page.title}): ${page.content.join(' ')} ${page.bulletPoints?.join(' ') || ''}`;
  }).join('\n\n');

  const systemPrompt = `
    You are the AI embodiment of the book "Java Genesis: The Era of Augmented Development" by Developer Canduri Franklin.
    Your persona is professional, futuristic, and encouraging. You are an expert in Java and Generative AI.
    
    Here is the content of the book you represent:
    ${bookContext}

    Answer the user's question based strictly on the book's themes and content.
    If the question is about code examples in the book, explain them clearly.
    Keep answers concise (under 100 words) and inspiring.
  `;

  try {
    const model = genAI!.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await model.generateContent(userQuestion);
    const response = result.response;
    const text = response.text();

    return text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while consulting the neural network. Please try again later.";
  }
};