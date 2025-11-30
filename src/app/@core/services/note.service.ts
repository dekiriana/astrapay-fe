import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { DUMMY_NOTES, incrementMockId } from '../constants/dummy.data';
import { environment } from '../../../environments/environment.development';
import { Note, NoteRequest } from '../../@features/models/note.model';
import { API_ENDPOINTS } from '../constants/api.constant';

let mockNotesData: Note[] = [...DUMMY_NOTES];
const MOCK_DELAY = 500;

const mockApi = {
    getNotes: (): Observable<Note[]> => {
        return of(mockNotesData).pipe(delay(MOCK_DELAY));
    },
    createNote: (request: NoteRequest): Observable<Note> => {
        const newNote: Note = {
            id: incrementMockId(),
            title: request.title,
            content: request.content,
            category: request.category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    
        if (request.title.length < 5) {
             return throwError(() => ({ 
                 status: 400, 
                 error: { message: "Judul harus memiliki minimal 5 karakter (Mock Error)." } 
             })).pipe(delay(MOCK_DELAY));
        }

        mockNotesData.push(newNote);
        return of(newNote).pipe(delay(MOCK_DELAY));
    },
    updateNote: (id: number, request: NoteRequest): Observable<Note> => {
        const index = mockNotesData.findIndex(n => n.id === id);
        
        if (index === -1) {
            return throwError(() => ({ 
                status: 404, 
                error: { message: `Catatan dengan ID ${id} tidak ditemukan untuk diupdate. (Mock 404)` } 
            })).pipe(delay(MOCK_DELAY));
        }
        
        if (request.content.length < 10) {
             return throwError(() => ({ 
                 status: 400, 
                 error: { message: "Konten harus memiliki minimal 10 karakter saat diupdate (Mock Error)." } 
             })).pipe(delay(MOCK_DELAY));
        }
        
        const updatedNote: Note = {
            ...mockNotesData[index], 
            title: request.title,
            content: request.content,
            category: request.category, 
            updatedAt: new Date().toISOString()
        };

        mockNotesData[index] = updatedNote;
        
        return of(updatedNote).pipe(delay(MOCK_DELAY));
    },
    deleteNote: (id: number): Observable<void> => {
        const initialLength = mockNotesData.length;
        mockNotesData = mockNotesData.filter(n => n.id !== id);
        
    
        if (mockNotesData.length === initialLength) {
            return throwError(() => ({ 
                status: 404, 
                error: { message: "Catatan tidak ditemukan (Mock Error)." } 
            })).pipe(delay(MOCK_DELAY));
        }

        return of(undefined).pipe(delay(MOCK_DELAY));
    }
};


@Injectable({
    providedIn: 'root'
})
export class NoteService {
    private http = inject(HttpClient);

    private useMockData = environment.useMockData;

    getNotes(): Observable<Note[]> {
        if (this.useMockData) {
            return mockApi.getNotes();
        }
        return this.http.get<Note[]>(API_ENDPOINTS.NOTES);
    }

    updateNote(id: number, note: NoteRequest): Observable<Note> {
        if (this.useMockData) {
            return mockApi.updateNote(id, note);
        }
        return this.http.put<Note>(API_ENDPOINTS.NOTES_BY_ID(id), note);
    }

    createNote(note: NoteRequest): Observable<Note> {
        if (this.useMockData) {
            return mockApi.createNote(note);
        }
        return this.http.post<Note>(API_ENDPOINTS.NOTES, note);
    }

    deleteNote(id: number): Observable<void> {
        if (this.useMockData) {
            return mockApi.deleteNote(id);
        }
        return this.http.delete<void>(API_ENDPOINTS.NOTES_BY_ID(id));
    }
}