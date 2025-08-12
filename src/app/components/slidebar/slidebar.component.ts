import { Component, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import {MatExpansionModule} from '@angular/material/expansion';
// import {TuiTitle} from '@taiga-ui/core';
// import { TuiHeader} from '@taiga-ui/layout';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-slidebar',
  imports: [MatListModule,
            MatTreeModule, 
            MatIconModule, 
            MatButtonModule,
            MatMenuModule, 
            RouterLink, 
            MatExpansionModule],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})

export class SlidebarComponent {
  readonly panelOpenState = signal(false);
}
