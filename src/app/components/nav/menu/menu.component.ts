import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

   // Estado por id de cada collapse
    isOpen: Record<string, boolean> = {
      // Si quieres alguno abierto por defecto, pon true y añade la clase 'show' al div.collapse correspondiente
      // submenu1: true,
      // submenu1m: true
    };
  
    // Se dispara cuando un collapse termina de abrirse
    @HostListener('document:shown.bs.collapse', ['$event'])
    onShown(e: any) {
      const id = e?.target?.id;
      if (id) this.isOpen[id] = true;
    }
  
    // Se dispara cuando un collapse termina de cerrarse
    @HostListener('document:hidden.bs.collapse', ['$event'])
    onHidden(e: any) {
      const id = e?.target?.id;
      if (id) this.isOpen[id] = false;
    }
}
