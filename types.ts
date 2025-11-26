export enum PageType {
  COVER = 'COVER',
  CONTENT = 'CONTENT',
  CLOSING = 'CLOSING'
}

export interface CodeSnippet {
  language: string;
  code: string;
  caption?: string;
  highlightLines?: number[];
}

export interface LinkResource {
  title: string;
  url: string;
  type: 'DOCS' | 'TOOL' | 'ARTICLE';
}

export interface BookPage {
  id: number;
  type: PageType;
  title: string;
  subtitle?: string;
  content: string[]; // Paragraphs
  visualDescription?: string; // For placeholder generation
  imageUrl?: string; // New field for specific page images
  codeSnippets?: CodeSnippet[];
  bulletPoints?: string[];
  links?: LinkResource[]; // Official resources
  cta?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}