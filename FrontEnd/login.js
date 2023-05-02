const baliseForm = document.querySelector("form");
const loginLink = document.querySelector("#login")
const logoutLink = document.querySelector("#logout")
const authenticationFromLocalStorage = localStorage.getItem("user");


if (authenticationFromLocalStorage) {
    loginLink.style.display = "none"
    logoutLink.style.display = "block"
  } else {
    loginLink.style.display = "block"
    logoutLink.style.display = "none"
  }

baliseForm.addEventListener("submit", connexion)

async function connexion(e) {
        e.preventDefault();
        const champEmail = document.querySelector("#email").value;
        const champPassword = document.querySelector("#password").value;
        const champEmailPassword = {
            email: champEmail,
            password: champPassword
        }

        const responseLogin = await fetch(
                "http://localhost:5678/api/users/login", 
                {
                method:"POST",
                body: JSON.stringify(champEmailPassword),
                headers: {
                "Content-Type": "application/json"
                }
            }
        )

        if (!responseLogin.ok) {
            alert("Erreur dans l'identifiant ou le mot de passe");
        } else {
            const responseJson = await responseLogin.json();
            window.localStorage.setItem("user", JSON.stringify(responseJson));
            window.location.href = "index.html"
        }
    };


logoutLink.addEventListener("click", function() {
    authenticationFromLocalStorage = localStorage.removeItem("user");
})