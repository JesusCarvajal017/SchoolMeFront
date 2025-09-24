import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { RegistersServices } from '../../../service/helpers/registers.service';
import { RegisterCount } from '../../../models/helpers/registers.model';

@Component({
  selector: 'app-landing-home',
  imports: [MatIconModule],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.css'
})
export class LandingHomeComponent implements OnInit{

  countRegister!: RegisterCount;


  // ============== services ==============
  servicesRegister = inject(RegistersServices);

  ngOnInit(): void {
    this.cargarDataRegister()
  }


  cargarDataRegister() {
    this.servicesRegister.getCoutRegister().subscribe({
      next: (data)=>{
        this.countRegister = data;
      }

    });
  }


}
