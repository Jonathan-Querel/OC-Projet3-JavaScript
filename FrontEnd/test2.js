//Appel API pour les travaux
const fetchAndReturnWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

//Appel API pour les catégories
const fetchCategory = async () => {
  const defaultCategory = {id:0, name:"Tous"}
  const allCategoriesList = new Set();
  allCategoriesList.add(defaultCategory);

  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      allCategoriesList.add(data[i])
    }
    allCategoriesList.forEach(category => {
        buildDOMCategory(category);
    })
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

const fetchAndBuildWorks = async () => {
    const listProjects = await fetchAndReturnWorks();
    for (let i = 0; i < listProjects.length; i++) {
     buildDOMWork(listProjects[i]);
    }
}
//Construction du DOM pour les travaux
const buildDOMWork = (work) => {
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



//Filtres 

const filteredProject = (categoryId, projets) => {
  //1- Je nettoie la div gallery
  document.querySelector(".gallery").innerHTML = "";
  //2 Je filtre les projets par rapport à leur catégorie
  const projectsFiltered = projets.filter(projet => {
      if (categoryId === 0) {
        return projet;
      }
      return projet.category.id === categoryId
      });
  //3 Je construit chaque projet en JS
  projectsFiltered.forEach(work => buildDOMWork(work));
};



const buildDOMCategory = async (category) => {
    const listProjects = await fetchAndReturnWorks();
    //const categoriesData = fetchCategory();
    //categoriesData.forEach(category => { //m'expliquer ?
    //    allCategoriesList.add(category); //m'expliquer ?
    //})
    //allCategoriesList.forEach(category => {
        const buttonElement = document.createElement("button");
        buttonElement.innerText = category.name;
        buttonElement.classList.add("btn");
        buttonElement.id = category.id;
        if (category.id === 0) {
            buttonElement.classList.add("btnclique");
        }
        divButton.appendChild(buttonElement);
        buttonElement.addEventListener("click", function () {
            const allButtons = document.querySelectorAll(".btn");
            allButtons.forEach(bt => bt.classList.remove("btnclique"))
            buttonElement.classList.add("btnclique")
            filteredProject(category.id, listProjects);
        });
    };



//Appel des fonctions pour les boutons et les projets

fetchCategory();
fetchAndBuildWorks();





//Construction du bouton TOUS
//const buttonTous = document.createElement("button");
//buttonTous.innerText = "Tous";
//buttonTous.classList.add("btn");
//divButton.appendChild(buttonTous);
//const mesProjets = document.querySelector("#portfolio");
