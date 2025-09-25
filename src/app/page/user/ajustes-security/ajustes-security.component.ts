import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { AuthMainService } from '../../../service/auth/auth-main.service';

@Component({
  selector: 'app-ajustes-security',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajustes-security.component.html',
  styleUrls: ['./ajustes-security.component.css']
})
export class AjustesSecurityComponent {
  passwordForm: FormGroup;
  emailForm: FormGroup;
  loadingPassword = false;
  loadingEmail = false;

  // Modal
  showResultModal = false;
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private auth: AuthMainService,
    private userService: UserService
  ) {
    this.passwordForm = this.fb.group({
      passwordNew: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
        ]
      ],
      passwordConfirm: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  private passwordsMatch(group: FormGroup) {
    const pass = group.get('passwordNew')?.value;
    const confirm = group.get('passwordConfirm')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  // Mostrar modal
  private openResultModal(message: string, type: 'success' | 'error') {
    this.modalMessage = message;
    this.modalType = type;
    this.showResultModal = true;
  }

  closeResultModal() {
    this.showResultModal = false;
  }

  // Cambiar contraseña
  submitPassword(): void {
    if (!this.auth.isAuthenticated()) return;
    if (this.passwordForm.invalid) {
      this.openResultModal('Por favor completa correctamente los campos de contraseña', 'error');
      return;
    }

    const idUser = this.auth.getCurrentUserId();
    if (!idUser) {
      this.openResultModal('No se encontró el usuario autenticado', 'error');
      return;
    }

    const { passwordNew, passwordConfirm } = this.passwordForm.value;

    this.loadingPassword = true;
    this.userService.changePassword(idUser, passwordNew, passwordConfirm).subscribe({
      next: ok => {
        if (ok) {
          this.passwordForm.reset();
          this.openResultModal('✅ Contraseña actualizada correctamente', 'success');
        } else {
          this.openResultModal('❌ Error al cambiar la contraseña', 'error');
        }
        this.loadingPassword = false;
      },
      error: err => {
        console.error(err);
        this.openResultModal('❌ Error al cambiar la contraseña', 'error');
        this.loadingPassword = false;
      }
    });
  }

  // Cambiar correo
  submitEmail(): void {
    if (!this.auth.isAuthenticated()) return;
    if (this.emailForm.invalid) {
      this.openResultModal('Por favor ingresa un correo válido', 'error');
      return;
    }

    const idUser = this.auth.getCurrentUserId();
    const personId = this.auth.getCurrentPersonId();
    if (!idUser || !personId) {
      this.openResultModal('No se encontró el usuario o persona autenticada', 'error');
      return;
    }

    const email = this.emailForm.value.email;

    this.loadingEmail = true;
    this.userService.updateUserEmail(idUser, email, personId, 1).subscribe({
      next: updated => {
        this.openResultModal('✅ Correo actualizado correctamente', 'success');
        this.loadingEmail = false;
      },
      error: err => {
        console.error(err);
        this.openResultModal('❌ Error al actualizar el correo', 'error');
        this.loadingEmail = false;
      }
    });
  }
}
