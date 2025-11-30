import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotesStore } from '../../../../@core/stores/note.store';
import { shouldDisplayError } from '../../../../@shared/utilities/form-helpers';
import { NoteList } from '../note-list/note-list';
import { NoteForm } from '../note-form/note-form';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule,NoteList,ReactiveFormsModule],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditor {
  store = inject(NotesStore);
  fb = inject(FormBuilder);

  expanded = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    category: ['all']
  });

  shouldDisplayError = shouldDisplayError;

  add() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.addNote(this.form.value);
    this.form.reset({ category: 'all' });
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
