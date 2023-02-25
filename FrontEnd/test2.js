//Appel API pour les travaux
const fetchWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      dataWork(data[i]);
    }
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

//Appel API pour les catégories
const fetchCategory = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      dataCategory(data[i]);
    }
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

//Construction du DOM pour les travaux
const dataWork = (work) => {
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


//Récupération de la class gallery dans une constante
const galleryContainer = document.querySelector(".gallery");

//Suppression des données de la class gallery du fichier HTML
document.querySelector(".gallery").innerHTML = "";


//Création de la div qui englobe les boutons
const divButton = document.createElement("div");
divButton.classList.add("bouton");

//Placement des boutons avant les travaux
const parentGallery = galleryContainer.parentNode;
parentGallery.insertBefore(divButton, galleryContainer);



const defaultCategory = {id:0, name:"Tous"}
const allCategoriesList = new Set();
allCategoriesList.add(defaultCategory);


//Filtres 

const filteredProject = (categoryId, projets) => {
  //1- Je nettoie la div gallery
  document.querySelector(".gallery").innerHTML = "";
  //2 Je filtre les projets par rapport à leur catégorie
  const projectsFiltered = projets.filter(projet => {
      if (categoryId === 0) {
        return projet;
      }
      return projet.category === categoryId
      });
  //3 Je construit chaque projet en JS
  projectsFiltered.forEach(work => dataWork(work));
};



const dataCategory = () => {
    const categoriesData = fetchCategory();
    categoriesData.forEach(category => { //m'expliquer ?
        allCategoriesList.add(category); //m'expliquer ?
    })


    allCategoriesList.forEach(category => {
        const buttonElement = document.createElement("button");
        buttonElement.innerText = category.name;
        buttonElement.classList.add("btn");
        buttonElement.id = category.id;
        divButton.appendChild(buttonElement);
        buttonElement.addEventListener("click", function () {
            filteredProject(category.id, dataWork());
        });
    })
};


//Appel des fonctions pour les boutons et les projets

fetchCategory();
fetchWorks();





//Construction du bouton TOUS
//const buttonTous = document.createElement("button");
//buttonTous.innerText = "Tous";
//buttonTous.classList.add("btn");
//divButton.appendChild(buttonTous);
//const mesProjets = document.querySelector("#portfolio");
