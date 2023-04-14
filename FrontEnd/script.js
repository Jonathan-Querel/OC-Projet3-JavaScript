



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
    console.log(allCategoriesList)
    allCategoriesList.forEach(async (category) => {
        await buildDOMCategory(category);
    })
  } catch (error) {
    console.error("Il y a eu un problème : " + error);
  }
};

const fetchAndBuildWorks = async () => {
    const listProjects = await fetchAndReturnWorks();
    for (let i = 0; i < listProjects.length; i++) {
     buildDOMWork(listProjects[i]);
     buildModalWork(listProjects[i]);
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

const buildModalWork = (work) => {
  const figureElement = document.createElement("figure");
  figureElement.classList.add("modalfigure")
  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;
  imgElement.classList.add("modalimage")
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = "éditer";
  //Rattachement des balises au DOM
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  const modalContainer = document.getElementById("modalcontainer")
  modalContainer.appendChild(figureElement)
  modalContainer.classList.add("modalcontainer")
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


const authenticationFromLocalStorage = localStorage.getItem("user");
const loginLink = document.querySelector("#login")
const logoutLink = document.querySelector("#logout")
const modeEdition = document.querySelector(".edition")
const modeEdition1 = document.querySelectorAll(".edition1")
const modeEditionTest = document.querySelector ("#modifierprojets") //changement fait pour qu'il soit à coter de Mes projets

if (authenticationFromLocalStorage) {
  loginLink.style.display = "none"
  logoutLink.style.display = "block"
  modeEdition.style.display = "block"
  divButton.style.display="none"
  modeEdition1.forEach(element => {
      element.style.display = "flex"
    })
    modeEditionTest.style.display = "inline-flex" //changement fait pour qu'il soit à coter de Mes projets

} else {
  loginLink.style.display = "block"
  logoutLink.style.display = "none"
  modeEdition.style.display = "none"
  divButton.style.display="flex"
  modeEdition1.forEach(element => {
      element.style.display = "none"
    })
}

logoutLink.addEventListener("click", function() { //a t'on besoin de le rajouter sur la page login vu que je reste sur la page projet quand je Logout
  authenticationFromLocalStorage = localStorage.removeItem("user");
  //loginLink.style.display ="block" Comme le token est supprimé cela reprend la condition du dessus
  //logoutLink.style.display = "none" Donc pas besoin de rajouter ces lignes ?
})

let modal = null

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute("href"))
  target.style.display = null
  target.removeAttribute ('aria-hidden')
  target.setAttribute ('aria-modal', 'true')
  modal = target
  modal.addEventListener ('click', closeModal)
  modal.querySelector ('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector ('.js-modal-stop').addEventListener('click', stopPropagation)

}

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display= "none"
  modal.setAttribute ('aria-hidden', 'true')
  modal.removeAttribute ('aria-modal')
  modal.removeEventListener ('click', closeModal)
  modal.querySelector ('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector ('.js-modal-stop').removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function(e) {
  e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal)
})