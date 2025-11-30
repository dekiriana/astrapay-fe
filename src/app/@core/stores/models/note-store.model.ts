import { Note } from "../../../@features/models/note.model";

export interface NotesState {
  notes: Note[]; 
  isLoading: boolean;
  error: string | null;
}

export const initialNotesState: NotesState = {
  notes: [],
  isLoading: false,
  error: null,
};