import { Routes } from '@angular/router';
import { LadingPageComponent } from './page/person/lading-page/lading-page.component';
import { NotFoundComponent } from './page/not-found/not-found/not-found.component';
import { CrearPersonComponent } from './page/person/crear-person/crear-person.component';
import { EditarPersonComponent } from './page/person/editar-person/editar-person.component';
import { LandingUserComponent } from './page/user/landing-user/landing-user.component';
import { CrearUserComponent } from './page/user/crear-user/crear-user.component';
import { EditarUserComponent } from './page/user/editar-user/editar-user.component';
import { LoginMainComponent } from './page/login/login-main/login-main.component';
import { UserCreateComponent } from './page/forms/user-create/user-create.component';
import { esAdminGuard } from './auth/guards/es-admin.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LandingRolComponent } from './page/rol/landing-rol/landing-rol.component';
import { LandingPermissionComponent } from './page/permission/landing-permission/landing-permission.component';
import { LandingModuleComponent } from './page/module/landing-module/landing-module.component';
import { LandingFormComponent } from './page/form/landing-form/landing-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginMainComponent
    },
    { path: 'register', component: UserCreateComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [esAdminGuard],
        children: [
            { path: 'todos', component: LadingPageComponent, canActivate: [esAdminGuard]  },
            { path: 'todos/crear', component: CrearPersonComponent },
            { path: 'todos/editar/:id', component: EditarPersonComponent, canActivate: [esAdminGuard]},
            { path: 'usuarios', component: LandingUserComponent , canActivate: [esAdminGuard]},
            { path: 'user/crear', component: CrearUserComponent},
            { path: 'user/editar/:id', component: EditarUserComponent},
            { path: 'roles', component: LandingRolComponent, canActivate: [esAdminGuard]},
            { path: 'permisos', component: LandingPermissionComponent, canActivate: [esAdminGuard]},
            { path: 'modulos', component: LandingModuleComponent, canActivate: [esAdminGuard]},
            { path: 'formularios', component: LandingFormComponent, canActivate: [esAdminGuard]},
        ]
    },
    {path: '**', component: NotFoundComponent} 
    
];
