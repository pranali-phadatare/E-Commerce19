import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly snackBar = inject(MatSnackBar);
  private readonly defaultDuration = 2500;

  success(message: string): void {
    this.show(message, 'toast-success');
  }

  error(message: string): void {
    this.show(message, 'toast-error');
  }

  info(message: string): void {
    this.show(message, 'toast-info');
  }

  private show(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.defaultDuration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}
