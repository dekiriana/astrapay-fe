import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesStore } from '../../../../@core/stores/note.store';
import { RAW_CATEGORIES } from '../../../../@core/constants/dummy.data';
import { TranslatePipe } from '../../../../@shared/pipes/translate.pipes';
import { CategoryOption } from '../../../models/note.model';
import { TranslationService } from '../../../../@core/i18n/translation.service';

@Component({
  selector: 'app-note-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './note-sidebar.html',
  styleUrl: './note-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteSidebar {
  private store = inject(NotesStore);
  private translationService = inject(TranslationService)
  onCategoryClick(category: string) {
      this.store.filterNotesByCategory(category);
  }
  search = '';
  selectedCategory = 'all';

  protected categories = computed<CategoryOption[]>(() => {
    this.translationService.activeLang(); 
    
    return RAW_CATEGORIES.map(cat => ({
          label: this.translationService.translate(cat.label),
          value: cat.value
      }));
  });

}
