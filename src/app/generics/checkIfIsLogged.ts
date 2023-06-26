export function CheckIfIsLogged() {
    let logged = JSON.parse(sessionStorage.getItem("UsuarioLogueado") ?? "");
    
    if (logged != "")
        return true;
    else
        return false;
}