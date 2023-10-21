import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './componentes/error/error.component';
import { FormsModule } from '@angular/forms';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { LengthcheckerDirective } from './directivas/lengthchecker.directive';
import { TestDirective } from './directivas/test.directive'
import { CommonModule } from '@angular/common';
import { ValidateSamePasswordsDirective } from './directivas/validate-same-passwords.directive';
import { LogbuttonDirective } from './directivas/logbutton.directive';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { CrearproductoComponent } from './componentes/crearproducto/crearproducto.component';
import { ShowPricePipe } from './pipes/show-price.pipe';
import { CategoryToStringPipe } from './pipes/category-to-string.pipe';
import { ModifyProductComponent } from './componentes/modify-product/modify-product.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { AboutmeComponent } from './componentes/aboutme/aboutme.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    BienvenidoComponent,
    RegistrarComponent,
    MenuComponent,
    UsuariosComponent,
    UsuarioComponent,
    LoginComponent,
    LengthcheckerDirective,
    TestDirective,
    ValidateSamePasswordsDirective,
    LogbuttonDirective,
    ProductoComponent,
    ProductosComponent,
    CrearproductoComponent,
    ShowPricePipe,
    CategoryToStringPipe,
    ModifyProductComponent,
    CarritoComponent,
    AboutmeComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
