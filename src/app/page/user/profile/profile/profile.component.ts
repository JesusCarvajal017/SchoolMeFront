import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person, PersonOrigin } from '../../../../models/security/person.model';
import { PersonService } from '../../../../service/person.service';
import { User, UserService } from '../../../../service/user.service';



interface UserProfile {
  user: User;
  person: PersonOrigin;
}

interface InfoItem {
  icon: string;
  label: string;
  value: string;
  type?: 'text' | 'email' | 'phone' | 'date';
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private personService = inject(PersonService);

  // Estado
  isLoading = true;
  hasError = false;
  errorMessage = '';

  // Datos
  userProfile: UserProfile | null = null;
  profileImageUrl = './icons/default.png';

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Carga de perfil (User -> Person)
  private loadUserProfile(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    const currentUserId = 1; // TODO: reemplazar por ID real desde tu AuthService

    this.userService.obtenerPorId(currentUserId).subscribe({
      next: (user: User) => {
        const personId = this.getPersonIdForUser(user);

        if (!personId && personId !== 0) {
          this.hasError = true;
          this.errorMessage = 'El usuario no tiene persona asociada (ajusta el mapeo).';
          this.isLoading = false;
          return;
        }

        this.personService.obtenerPorId(personId).subscribe({
          next: (person: PersonOrigin) => {
            this.userProfile = { user, person };
            // Si tu backend guarda el nombre del archivo de la foto en User, ajusta aquí:
            // if ((user as any).photo) this.profileImageUrl = `assets/images/profiles/${(user as any).photo}`;
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

  // Mapeo de User -> personId
  // Ajusta esta función según tu backend:
  // - Si User trae personId, úsalo: return (user as any).personId;
  // - Si User y Person comparten el mismo id, usa user.id;
  private getPersonIdForUser(user: User): number {
    const maybePersonId = (user as any).personId;
    return typeof maybePersonId === 'number' ? maybePersonId : user.id;
  }

  // Acciones
  reloadProfile(): void {
    this.loadUserProfile();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.profileImageUrl = e.target?.result as string);
      reader.readAsDataURL(file);
      // TODO: Subir al backend (FormData) si lo necesitas
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard?.writeText(text).then(() => {
      console.log('Copiado al portapapeles');
    });
  }

  // Computed
  get fullName(): string {
    if (!this.userProfile?.person) return 'Usuario';
    const p = this.userProfile.person;
    const names = [p.fisrtName, p.secondName].filter(Boolean).join(' ');
    const lastNames = [p.lastName, p.secondLastName].filter(Boolean).join(' ');
    const full = `${names} ${lastNames}`.trim();
    return full || 'Usuario';
  }

  get statusText(): string {
    return this.userProfile?.user.status === 1 ? 'En línea' : 'Desconectado';
  }

  get statusClass(): 'online' | 'offline' {
    return this.userProfile?.user.status === 1 ? 'online' : 'offline';
  }

  get memberSince(): string {
    // Si no tienes createdAt, usa la fecha actual como placeholder
    return new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get lastSeenText(): string {
    return this.userProfile?.user.status === 1 ? 'Ahora' : 'Desconocido';
  }

  get infoList(): InfoItem[] {
    if (!this.userProfile) return [];
    const { user, person } = this.userProfile;

    const items: InfoItem[] = [
      { icon: 'bi-envelope-fill', label: 'Correo electrónico', value: user.email, type: 'email' },
      { icon: 'bi-credit-card-fill', label: person.acronymDocument, value: person.identification },
      { icon: 'bi-gender-ambiguous', label: 'Género', value: person.gender === 1 ? 'Masculino' : person.gender === 2 ? 'Femenino' : 'Otro' }
    ];

    if (person.phone) {
      items.push({ icon: 'bi-telephone-fill', label: 'Teléfono', value: person.phone, type: 'phone' });
    }

    // Añade aquí más campos cuando existan en tu modelo/endpoint:
    // EPS, Municipio, RH, etc., si tu Person actual los expone.

    return items;
  }
}
