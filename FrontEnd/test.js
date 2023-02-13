//Etape1 - Récupération de la section et création de la div qui englobe les boutons

const mesProjets = document.querySelector("#portfolio");
const divButton = document.createElement("div");
divButton.classList.add("bouton");
mesProjets.appendChild(divButton);
const buttonTous = document.createElement("button");
buttonTous.innerText = "Tous";
buttonTous.classList.add("btn");
divButton.appendChild(buttonTous);

//Création des boutons
const buildDomCategory = (category) => {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = category.name;
  buttonElement.classList.add("btn");
  divButton.appendChild(buttonElement);
};

//Appel API
const getCategory = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      buildDomCategory(data[i]);
    }
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

//Etape 1
//Récupération de la class gallery dans une constante
const galleryContainer = document.querySelector(".gallery");
console.log(galleryContainer);

//Suppression des données de la class gallery du fichier HTML
document.querySelector(".gallery").innerHTML = "";

//Construction du DOM
const buildDomWork = (work) => {
  const figureElement = document.createElement("figure");
  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = work.title;

  //Rattachement des balises au DOM
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  galleryContainer.appendChild(figureElement);
};

//Appel API
const getWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      buildDomWork(data[i]);
    }
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

//Appel des fonctions pour les boutons et les projets
getCategory();
getWorks();
