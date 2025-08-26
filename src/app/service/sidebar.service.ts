import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarItem } from '../models/sidebar-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SidebarService {
    http = inject(HttpClient);

  // constructor(private http: HttpClient) {}

  getSidebarItems(): Observable<SidebarItem[]> {
    return this.http.get<any[]>('http://localhost:5052/api/Menu?rolId=1').pipe(

      map(items => items.map(item => ({
        label: item.name,
        icon: item.icon,
        route: item.path || undefined,
        children: item.formularios?.length
          ? item.formularios.map((f: any) => ({
              label: f.name,
              icon: item.permission, 
              route: f.path || undefined 
            }))
          : undefined
      })))
    );
  }
  
}







