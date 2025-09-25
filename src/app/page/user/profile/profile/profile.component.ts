import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PersonData } from '../../../../models/security/person.model';
import { PersonService } from '../../../../service/person.service';
import { User, UserService } from '../../../../service/user.service';
import { AuthMainService } from '../../../../service/auth/auth-main.service';
import { environment } from '../../../../../environments/environment.development';
import { GenderType } from '../../../../global/model/enumGenero';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


interface UserProfile {
  user: User;
  person: PersonData;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private personService = inject(PersonService);
  private authService = inject(AuthMainService);
  private destroy$ = new Subject<void>();

  isLoading = true;
  hasError = false;
  errorMessage = '';
  isUploadingImage = false;

  userProfile: UserProfile | null = null;
  profileImageUrl = './icons/default.png';

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.hasError = true;
      this.errorMessage = 'Usuario no autenticado. Por favor inicia sesión.';
      this.isLoading = false;
      return;
    }

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user && this.authService.isAuthenticated()) {
          this.loadUserProfile();
        } else if (this.authService.isAuthenticated()) {
          this.authService.refreshUserFromToken();
        }
      });

    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // HAZ ESTE MÉTODO PÚBLICO: lo usas en el botón "Reintentar" del HTML
  loadUserProfile(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    const currentUserId = this.authService.getCurrentUserId();
    if (!currentUserId) {
      this.hasError = true;
      this.errorMessage = 'Usuario no autenticado.';
      this.isLoading = false;
      return;
    }

    this.userService.obtenerPorId(currentUserId).subscribe({
      next: (user: User) => {

        //carga de informacion
        this.personService.obtenerPersonData(user.personId).subscribe({
          next: (personData: PersonData) => {
            this.userProfile = { user, person: personData };
            this.loadProfileImage(user);
            this.isLoading = false;
          },
          error: () => {
            this.hasError = true;
            this.errorMessage = 'No se pudo cargar la información personal.';
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.hasError = true;
        this.errorMessage = 'No se pudo cargar el perfil del usuario.';
        this.isLoading = false;
      }
    });
  }

  // HAZ ESTE MÉTODO PÚBLICO: lo llamas desde el template en (error)
  resolveProfileImage(user: User | undefined): string {
    const photo = (user as any)?.photo as string | undefined;

    if (photo) {
      return user!.photo;
    }
    return `./icons/default.png`;
  }

  private loadProfileImage(user: User): void {
    this.profileImageUrl = this.resolveProfileImage(user);
  }

  // Subir imagen de perfil
  async onImageUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0] && this.userProfile) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.showErrorMessage('Por favor selecciona un archivo de imagen válido.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.showErrorMessage('La imagen debe ser menor a 5MB.');
        return;
      }

      this.isUploadingImage = true;

      // Preview inmediato
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Subir al backend con FormData { Id, Photo }
      try {
        const result = await (this.userService as any).uploadUserPhoto(this.userProfile.user.id, file);
        this.isUploadingImage = false;

        if (result?.ok) {
          if (result.photo) {
            this.userProfile.user.photo = result.photo;
          }

          this.profileImageUrl = this.resolveProfileImage(this.userProfile.user);
          this.showSuccessMessage('Imagen de perfil actualizada correctamente');
          this.loadUserProfile();
        } else {
          this.showErrorMessage('Error al subir la imagen. Intenta nuevamente.');
          this.loadProfileImage(this.userProfile.user);
        }
      } catch (err) {
        console.error('Error subiendo imagen:', err);
        this.isUploadingImage = false;
        this.loadProfileImage(this.userProfile.user);
        this.showErrorMessage('Error al subir la imagen. Intenta nuevamente.');
      }
    }
  }

  // Event handler para fallback de imagen rota
  onImageError(): void {
    this.profileImageUrl = this.resolveProfileImage(this.userProfile?.user);
  }

  // Helpers
  private showSuccessMessage(message: string): void {
     Swal.fire("Exitoso", message, "success");
  }
  private showErrorMessage(message: string): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message
    });
  }

  // Computed
  get fullName(): string {
    if (!this.userProfile?.person) return 'Usuario';
    const p = this.userProfile.person;
    const names = [p.fisrtName, p.secondName].filter(Boolean).join(' ');
    const lastNames = [p.lastName, p.secondLastName].filter(Boolean).join(' ');
    return `${names} ${lastNames}`.trim() || 'Usuario';
  }

  get statusText(): string {
    return this.userProfile?.user.status === 1 ? 'En línea' : 'Desconectado';
  }

  get statusClass(): 'online' | 'offline' {
    return this.userProfile?.user.status === 1 ? 'online' : 'offline';
  }

  get genderText(): string {
    const g = this.userProfile?.person.gender;
    if (g === null || g === undefined) return 'No especificado';
    const gender = GenderType.find(item => item.id === g);
    return gender ? gender.name : 'No especificado';
  }

  get infoList() {



    if (!this.userProfile) return [];
    const { user, person } = this.userProfile;

    return [
      { icon: 'bi-envelope-fill', label: 'Correo', value: user.email || 'No especificado', type: 'email' },
      { icon: 'bi-credit-card-fill', label: person.acronymDocument || 'Documento', value: person.identification?.toString() || 'No especificado' },
      { icon: 'bi-gender-ambiguous', label: 'Género', value: this.genderText },
      { icon: 'bi-telephone-fill', label: 'Teléfono', value: person.phone?.toString() || 'No especificado', type: 'phone' }
    ];
  }
}
