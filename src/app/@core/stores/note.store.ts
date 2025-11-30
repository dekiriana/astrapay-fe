import { inject, signal, computed } from '@angular/core';
import { NoteService } from '../services/note.service';
import { catchError, finalize, of } from 'rxjs';
import { Note, NoteRequest } from '../../@features/models/note.model';



interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null; 
  noteToEdit: Note | null;
}

const initialState: NotesState = {
  notes: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
  noteToEdit: null
};


export function NotesStore() {
  const noteService = inject(NoteService);
  const state = signal(initialState);

  const allNotes = computed(() => state().notes);
  const isLoading = computed(() => state().isLoading);
  const error = computed(() => state().error);
  const selectedCategory = computed(() => state().selectedCategory);
  const noteToEdit = computed(() => state().noteToEdit);
  const filteredNotes = computed(() => {
    const currentCategory = state().selectedCategory;
    const notes = state().notes;

    if (!currentCategory || currentCategory === 'all') {
      return notes;
    }

    return notes.filter(note => note.category === currentCategory);
  });
  
  const setNoteToEdit = (note: Note | null) => {
      state.update(s => ({ ...s, noteToEdit: note }));
  };

  const setError = (message: string | null) => {
      state.update(s => ({ ...s, error: message }));
  };


  const updateNote = (id: number, request: NoteRequest) => {
      state.update(s => ({ ...s, isLoading: true, error: null }));

      noteService.updateNote(id, request).pipe(
          catchError(error => {
              console.error('Store: Failed to update note', error);
              state.update(s => ({ 
                  ...s, 
                  error: `Gagal memperbarui catatan: ${error.error?.message || error.statusText}`
              }));
              return of(null);
          }),
          finalize(() => state.update(s => ({ ...s, isLoading: false })))
      ).subscribe(updatedNote => {
          if (updatedNote) {
              state.update(s => ({ 
                  ...s, 
                  notes: s.notes.map(n => n.id === updatedNote.id ? updatedNote : n),
                  noteToEdit: null
              }));
          }
      });
  };

  const filterNotesByCategory = (category: string | null) => {
    let newCategory = category;

    if (newCategory === 'general') {
      newCategory = 'all';
  }
    state.update(s => ({ 
        ...s, 
        selectedCategory: newCategory 
    }));
  };

  const loadNotes = () => {
    state.update(s => ({ ...s, isLoading: true, error: null }));

    noteService.getNotes().pipe(
      catchError(error => {
        console.error('Store: Failed to load notes', error);
        state.update(s => ({ 
            ...s, 
            error: error.message || 'Gagal memuat data.'
        }));
        return of([]);
      }),
      finalize(() => state.update(s => ({ ...s, isLoading: false })))
    ).subscribe(newNotes => {
      state.update(s => ({ ...s, notes: newNotes })); 
    });
  };

  const addNote = (request: NoteRequest) => {
    state.update(s => ({ ...s, isLoading: true, error: null }));

    noteService.createNote(request).pipe(
      catchError(error => {
        console.error('Store: Failed to create note', error);
        state.update(s => ({ 
            ...s, 
            error: `Gagal membuat catatan: ${error.error?.message || error.statusText}`
        }));
        return of(null);
      }),
      finalize(() => state.update(s => ({ ...s, isLoading: false })))
    ).subscribe(newNote => {
      if (newNote) {
        state.update(s => ({ 
          ...s, 
          notes: [...s.notes, newNote]
        }));
      }
    });
  };

  const deleteNote = (id: number) => {
    state.update(s => ({ ...s, isLoading: true, error: null }));

    noteService.deleteNote(id).pipe(
      catchError(error => {
        console.error('Store: Failed to delete note', error);
        state.update(s => ({ 
            ...s, 
            error: `Gagal menghapus catatan: ${error.error?.message || error.statusText}`
        }));
        return of(null);
      }),
      finalize(() => state.update(s => ({ ...s, isLoading: false })))
    ).subscribe(response => {
      if (response === null) {
        state.update(s => ({ 
          ...s, 
          notes: s.notes.filter(n => n.id !== id) 
        }));
      }
    });
  };


  return {
    notes: filteredNotes,
    isLoading,
    error,
    setError,
    selectedCategory,
    updateNote,
    noteToEdit,
    setNoteToEdit,
    loadNotes,
    addNote,
    deleteNote,
    filterNotesByCategory,
  };
}

export type NotesStore = ReturnType<typeof NotesStore>;