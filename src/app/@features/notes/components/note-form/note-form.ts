import { 
    ChangeDetectionStrategy, 
    Component, 
    inject, 
    effect,
    OnInit, 
    computed,
    Injector,
    runInInjectionContext
} from '@angular/core';

import { 
    FormBuilder, 
    FormsModule, 
    ReactiveFormsModule, 
    Validators,
    AbstractControl,
    FormControl
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { RAW_CATEGORIES } from '../../../../@core/constants/dummy.data';
import { TranslationService } from '../../../../@core/i18n/translation.service';
import { NotesStore } from '../../../../@core/stores/note.store';
import { TranslatePipe } from '../../../../@shared/pipes/translate.pipes';
import { shouldDisplayError } from '../../../../@shared/utilities/form-helpers';

import { CategoryOption, NoteRequest } from '../../../models/note.model';


@Component({
    selector: 'app-note-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        MessageModule,
        SelectModule,
        TranslatePipe
    ],
    templateUrl: './note-form.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteForm implements OnInit {

    private fb = inject(FormBuilder);
    protected translationService = inject(TranslationService);
    protected noteStore = inject(NotesStore);

    protected errorMessage = this.noteStore.error;
    protected isLoading = this.noteStore.isLoading;
    protected noteToEdit = this.noteStore.setNoteToEdit; 

    protected noteToEditSignal = this.noteStore.noteToEdit;

    private injector = inject(Injector);

    
    noteForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(50)]],
        content: ['', [Validators.required, Validators.maxLength(255)]],
        category: ['general', Validators.required]
    });

    
    protected categories = computed<CategoryOption[]>(() => {
        this.translationService.activeLang();
        return RAW_CATEGORIES.map(cat => ({
            label: this.translationService.translate(cat.label),
            value: cat.value
        }));
    });

    constructor() {
        this.setupEditModeListener();
    }

    ngOnInit(): void {}

    /** LISTENER: Ketika user klik EDIT */
    private setupEditModeListener() {
        runInInjectionContext(this.injector, () => {
            effect(() => {
                const note = this.noteStore.noteToEdit();   

                if (note) {
                    
                    this.noteForm.patchValue({
                        title: note.title,
                        content: note.content,
                        category: note.category
                    });
                } else {
                    
                    this.noteForm.reset({ category: 'general' });
                }
            },
            { allowSignalWrites: true });
        });
    }

    protected shouldError(name: string): boolean {
        const c = this.noteForm.get(name);
        return c ? shouldDisplayError(c as AbstractControl) : false;
    }

    protected get formTitle(): FormControl {
        return this.noteForm.get('title') as FormControl;
    }

    protected get formCategory(): FormControl {
        return this.noteForm.get('category') as FormControl;
    }
    onSubmit(): void {
        if (this.noteForm.invalid) {
            this.noteForm.markAllAsTouched();
            this.noteStore.setError(this.translationService.translate('MESSAGES.VALIDATION_FORM_FAILED'));
            return;
        }

        const request = this.noteForm.value as NoteRequest;
        const editing = this.noteStore.noteToEdit();

        if (editing) {
            this.noteStore.updateNote(editing.id, request);
        } else {
            this.noteStore.addNote(request);
        }

        this.noteStore.setError('');
        this.noteForm.reset({ category: 'general' });
        this.noteStore.setNoteToEdit(null);
    }

    cancelEdit() {
        this.noteStore.setNoteToEdit(null);
    }
}
