import { AbstractControl, FormControl } from '@angular/forms';

export function shouldDisplayError(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}