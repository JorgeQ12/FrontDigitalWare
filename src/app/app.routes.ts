import { Routes } from '@angular/router';
import { HomeDwComponent } from './components/homeDw/homeDw.component';
import { AdminDwComponent } from './components/adminDw/adminDw.component';
import { SessionDwComponent } from './components/sessionDw/sessionDw.component';
import { SessionGamblingComponent } from './components/sessionDw/sessionGambling/sessionGambling.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeDwComponent },
    { path: 'admin', component: AdminDwComponent },
    { path: 'sala/:id', component: SessionGamblingComponent },
    { path: 'gambling', component: SessionDwComponent },
    { path: 'gambling/:id', component: SessionDwComponent },
];
