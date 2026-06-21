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
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

  interface ContactFormValue {
    name: string;
    email: string;
    number: string;
    message: string;
  }

  type ContactForm = FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    number: FormControl<string>;
    message: FormControl<string>;
  }>;

@Component({ 
  selector: 'app-contactus', 
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule], 
  templateUrl: './contactus.component.html', 
  styleUrl: './contactus.component.scss' 
}) 
export class ContactusComponent { 
    private readonly router = inject(Router);
    private readonly toastService = inject(ToastService);
    private readonly fb = inject(FormBuilder);

    readonly contactForm: ContactForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
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
      this.toastService.success('Message sent! We will get back to you soon.');
      this.router.navigate(['/product']);
      this.submitted.set(true);
      this.contactForm.reset();

    }
} 
