import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {TuiCardLarge,} from '@taiga-ui/layout';
import { RouterOutlet } from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import { SlidebarComponent } from '../../components/slidebar/slidebar.component';
import { TolbarComponent } from '../../components/tolbar/tolbar.component';
import { AutorizadoComponent } from '../../auth/autorizado/autorizado.component';

@Component({
  selector: 'app-dashboard',
  imports: [TuiCardLarge, SlidebarComponent, MatSidenavModule, TolbarComponent, MatCardModule, RouterOutlet, TuiRoot, AutorizadoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
