import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector: 'ui-btn',
    template: `
      <button class="px-4 py-2 rounded-lg font-medium
                     bg-blue-600 text-white hover:bg-blue-700
                     dark:bg-blue-500 dark:hover:bg-blue-600
                     transition">
        <ng-content></ng-content>
      </button>
    `
  })
  export class UiButtonComponent {}
  