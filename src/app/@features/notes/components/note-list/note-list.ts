import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NotesStore } from '../../../../@core/stores/note.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../@shared/pipes/translate.pipes';
import { Note, NoteRequest } from '../../../models/note.model';
import { CardModule } from 'primeng/card';
import { NoteForm } from '../note-form/note-form';
import { TranslationService } from '../../../../@core/i18n/translation.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    TranslatePipe,
    CardModule
  ],
  templateUrl: './note-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteList implements OnInit {

  private store = inject(NotesStore);
  protected translationService = inject(TranslationService)

  protected notes = this.store.notes;
  protected isLoading = this.store.isLoading;
  protected errorMessage = this.store.error;

  private confirm = inject(ConfirmationService);
  private notesStore = inject(NotesStore);

  confirmDelete(note: Note) {
    this.confirm.confirm({
      message: this.translationService.translate('DIALOG.CONFIRM_DELETE_MESSAGE'),
      header: this.translationService.translate('DIALOG.CONFIRM_DELETE_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translationService.translate('BUTTON.DELETE'), 
      rejectLabel: this.translationService.translate('BUTTON.CANCEL'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.notesStore.deleteNote(note.id);
      }
    });
  }

  ngOnInit(): void {
    this.store.loadNotes();
  }

  editNote(note: Note) {
      this.store.setNoteToEdit(note);
  }

  deleteNote(id: number) {
    this.store.deleteNote(id);
  }
}
