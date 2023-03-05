const baliseForm = document.querySelector("form");

async function connexion () {
        const responseLogin = await fetch ("http://localhost:5678/api/users/login", {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'},
            body: JSON.stringify(champEmail, champPassword),
        });
        if (responseLogin.status != 200){
        return alert("Erreur dans l'identifiant ou le mot de passe");
        } else {
            window.localStorage.setItem("champEmail", "ChampPassword")
            window.location.replace("/index.html")
        }
    }
