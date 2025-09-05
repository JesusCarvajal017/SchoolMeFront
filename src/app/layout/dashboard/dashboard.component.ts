import { Component, HostListener, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {TuiCardLarge,} from '@taiga-ui/layout';
import { RouterOutlet } from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TolbarComponent } from '../../components/tolbar/tolbar.component';
import { AutorizadoComponent } from '../../auth/autorizado/autorizado.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from "../../components/nav/menu/menu.component";

@Component({
  selector: 'app-dashboard',
  imports: [TuiCardLarge, SidebarComponent, MatSidenavModule,  MatCardModule, RouterOutlet, TuiRoot, MatIconModule, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
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
