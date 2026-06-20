import { Component, inject, signal } from '@angular/core'; 
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

  interface ContactFormValue {
    name: string;
    email: string;
    number: number;
    message: string;
  }

  type ContactForm = FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    number: FormControl<number>;
    message: FormControl<string>;
  }>;

@Component({ 
  selector: 'app-contactus', 
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule], 
  templateUrl: './contactus.component.html', 
  styleUrl: './contactus.component.scss' 
}) 
export class ContactusComponent { 
    private readonly fb = inject(FormBuilder);

    readonly contactForm: ContactForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      number: [0, [Validators.required, Validators.maxLength(10)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    readonly submitted = signal(false);

    onSubmit(): void {
      if (this.contactForm.invalid) {
        this.contactForm.markAllAsTouched();
        return;
      }

      const formValue: ContactFormValue = this.contactForm.getRawValue();
      console.log('Contact form submitted:', formValue);

      this.submitted.set(true);
      this.contactForm.reset();
    }
} 
