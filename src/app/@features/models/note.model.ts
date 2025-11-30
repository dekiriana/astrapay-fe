export interface Note {
    id: number;
    title: string;
    content: string;
    category: string;
    createdAt: string; 
    updatedAt: string;
  }
export interface NoteRequest {
   title: string;
   content: string;
   category: string;
}

export interface CategoryOption {
    label: string;
    value: string;
}