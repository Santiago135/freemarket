export function CheckIfIsLogged() {
    let logged = ""
    try {
        logged = JSON.parse(sessionStorage.getItem("UsuarioLogueado") ?? "");
    } catch (error) {

        return false;
    }

    return true;
}