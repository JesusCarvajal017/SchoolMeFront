import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';

import { RouterOutlet } from '@angular/router';
import { TuiRoot, TuiDataListComponent, TuiOptGroup, TuiDropdown } from '@taiga-ui/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MenuComponent } from "../../components/nav/menu/menu.component";
import { SidebarItem } from '../../models/sidebar-item.model';
import { TuiAvatar } from "@taiga-ui/kit";
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatCardModule, TuiRoot, MatIconModule, MenuComponent, TuiAvatar, TuiDataListComponent,TuiDropdown, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  sidebarItems: SidebarItem[] = [];

  sidebarService = Inject(SidebarService);

  // constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchSidebarItems();
  }

  fetchSidebarItems(): void {
    this.sidebarService.getSidebarItems().subscribe((items: SidebarItem[]) => {
      this.sidebarItems = items;
      // this.cdr.detectChanges();
    });
  }

}
