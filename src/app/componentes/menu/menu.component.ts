import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardGuard } from 'src/app/Guard/auth-guard.guard';
import { LoggedUser } from 'src/app/entidades/logged-user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public showLogin = true;

  constructor(private router: Router, public authGuard: AuthGuardGuard) {
  }

  ngOnInit() {
    this.checkIfIsLogged()
  }
  public checkIfIsLogged() {
    let logged = JSON.parse(sessionStorage.getItem("UsuarioLogueado") ?? "");
    if (logged != "") {
      this.authGuard.salida = true;
    }
  }

  public logOut() {
    this.authGuard.salida = false;
    sessionStorage.setItem("UsuarioLogueado", JSON.stringify(""));
    this.router.navigate(["login"]);
  }
}
