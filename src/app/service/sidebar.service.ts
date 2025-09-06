import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarItem } from '../models/sidebar-item.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  http = inject(HttpClient);

  getSidebarItems(): Observable<SidebarItem[]> {
    return this.http.get<SidebarItem[]>('http://localhost:5052/api/Menu?rolId=1').pipe();
  }
  
}







