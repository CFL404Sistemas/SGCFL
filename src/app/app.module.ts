import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Material Imports */
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import {CrearUsuarioComponent} from './pages/crear-usuario/crear-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { CrearherramientaComponent } from './pages/crearherramienta/crearherramienta.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { ObtenerInventarioComponent } from './pages/obtener-inventario/obtener-inventario.component';

import { ObtenerHistorialComponent } from './pages/obtener-historial/obtener-historial.component';


const materialModules = [
  MatSlideToggleModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatRippleModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule,
  MatBadgeModule,
  MatGridListModule,
  MatTooltipModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatSnackBarModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatRadioModule,
  HttpClientModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearherramientaComponent,
    HomeAdminComponent,
    NavbarComponent,
    ObtenerInventarioComponent,

    ObtenerHistorialComponent,
    CrearUsuarioComponent,

  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule
  ]
})
export class AppModule { }
