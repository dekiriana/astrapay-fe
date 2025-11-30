import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteSidebar } from '../note-sidebar/note-sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { NoteList } from '../note-list/note-list';
import { NoteForm } from '../note-form/note-form';

@Component({
  selector: 'app-note-shell',
  providers: [ConfirmationService],
  imports: [CommonModule, ConfirmDialogModule,NoteForm, NoteSidebar,NoteList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './note-shell.html',
  styleUrl: './note-shell.css'
})
export class NoteShell {}
