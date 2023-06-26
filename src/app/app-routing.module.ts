import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { AuthGuardGuard } from './Guard/auth-guard.guard';
import { ProductosComponent } from './componentes/productos/productos.component';
import { CrearproductoComponent } from './componentes/crearproducto/crearproducto.component';
import { ModifyProductComponent } from './componentes/modify-product/modify-product.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { AboutmeComponent } from './componentes/aboutme/aboutme.component';

const routes: Routes = [
  {path: "home", component: BienvenidoComponent, canActivate: [AuthGuardGuard]},
  {path: "login", component: LoginComponent},
  {path: "registrar", component: RegistrarComponent},
  {path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuardGuard]},
  {path: "crearproducto", component: CrearproductoComponent, canActivate: [AuthGuardGuard]},
  {path: "modificarproducto/:idToModify", component: ModifyProductComponent, canActivate: [AuthGuardGuard]},
  {path: "productos", component: ProductosComponent, canActivate: [AuthGuardGuard]},
  {path: "carrito", component: CarritoComponent, canActivate: [AuthGuardGuard]},
  {path: "aboutme", component: AboutmeComponent, canActivate: [AuthGuardGuard]},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", pathMatch: "full", component: ErrorComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
