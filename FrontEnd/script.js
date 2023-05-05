document.getElementById("modal1").style.display = "none";
document.getElementById("modal2").style.display = "none";

const fetchRemoveWorks = async (id) => {
  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(authenticationFromLocalStorage).token,
    },
  })
    .then((data) => alert("le projet a bien été supprimé."))
    .catch((error) => console.log("Il y a eu un problème : " + error));
};

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
  const defaultCategory = { id: 0, name: "Tous" };
  const allCategoriesList = new Set();
  allCategoriesList.add(defaultCategory);

  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      allCategoriesList.add(data[i]);
    }
    allCategoriesList.forEach(async (category) => {
      await buildDOMCategory(category);
    });
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
};
//Construction du DOM pour les travaux
const buildDOMWork = (work) => {
  const figureElement = document.createElement("figure");
  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;
  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerText = work.title;
  figureElement.id = "work-" + work.id;
  //Rattachement des balises au DOM
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  galleryContainer.appendChild(figureElement);
};

const buildModalWork = (work) => {
  const figureElement = document.createElement("figure");
  figureElement.classList.add("modalfigure");
  const divArrow = document.createElement("div");
  divArrow.classList.add("iconearrow");
  figureElement.appendChild(divArrow);
  const divTrash = document.createElement("div");
  divTrash.classList.add("iconetrash");
  figureElement.appendChild(divTrash);
  const iconeArrow = document.createElement("i");
  iconeArrow.classList.add("fa-solid", "fa-arrows-up-down-left-right");
  divArrow.appendChild(iconeArrow);
  const iconeTrash = document.createElement("i");
  iconeTrash.classList.add("fa-solid", "fa-trash-can");
  divTrash.appendChild(iconeTrash);
  const imgElement = document.createElement("img");
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;
  imgElement.classList.add("modalimage");

  const figcaptionElement = document.createElement("figcaption");
  figcaptionElement.innerHTML = "éditer";
  //Rattachement des balises au DOM
  figureElement.appendChild(imgElement);
  figureElement.appendChild(figcaptionElement);

  const modalContainer = document.getElementById("modalcontainer");
  modalContainer.appendChild(figureElement);
  modalContainer.classList.add("modalcontainer");
  divTrash.dataset.id = work.id;
  divTrash.addEventListener("click", (event) => {
    event.preventDefault();
    divTrash.parentElement.remove(); // Suppression du projet dans la modal
    document.getElementById("work-" + divTrash.dataset.id).remove(); // Suppression du projet dans la gallery
    fetchRemoveWorks(divTrash.dataset.id);
  });
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
  const projectsFiltered = projets.filter((projet) => {
    if (categoryId === 0) {
      return projet;
    }
    return projet.category.id === categoryId;
  });
  //3 Je construit chaque projet en JS
  projectsFiltered.forEach((work) => buildDOMWork(work));
};

const buildDOMCategory = async (category) => {
  const listProjects = await fetchAndReturnWorks();
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
    allButtons.forEach((bt) => bt.classList.remove("btnclique"));
    buttonElement.classList.add("btnclique");
    filteredProject(category.id, listProjects);
  });
  if (category.id !== 0) {
    // Tous = 0
    const selectCategories = document.getElementById("categorie"); // partie modale (menu déroulant)
    const option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.name;
    selectCategories.appendChild(option);
  }
};

//Appel des fonctions pour les boutons et les projets

fetchCategory();
fetchAndBuildWorks();

const authenticationFromLocalStorage = localStorage.getItem("user");
const loginLink = document.querySelector("#login");
const logoutLink = document.querySelector("#logout");
const modeEdition = document.querySelector(".edition");
const modeEdition1 = document.querySelectorAll(".edition1");
const modeEditionTest = document.querySelector("#modifierprojets");

if (authenticationFromLocalStorage) {
  loginLink.style.display = "none";
  logoutLink.style.display = "block";
  modeEdition.style.display = "block";
  divButton.style.display = "none";
  modeEdition1.forEach((element) => {
    element.style.display = "flex";
  });
  modeEditionTest.style.display = "inline-flex";
} else {
  loginLink.style.display = "block";
  logoutLink.style.display = "none";
  modeEdition.style.display = "none";
  divButton.style.display = "flex";
  modeEdition1.forEach((element) => {
    element.style.display = "none";
  });
}

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-modal2").forEach((a) => {
  a.addEventListener("click", openModal);
  a.addEventListener("click", () => {
    const modal1 = document.querySelector("#modal1");
    modal1.style.display = "none";
  });
});

document.getElementById("ajoutImg").addEventListener("click", () => {
  document.getElementById("imageFile").click();
});

document.querySelector(".js-modal-return").addEventListener("click", () => {
  const modal2 = document.querySelector("#modal2");
  modal2.style.display = "none";
  const modal1 = document.querySelector("#modal1");
  modal1.style.display = "flex";
  modal1.querySelector(".js-modal-close").addEventListener("click", () => {
    modal1.style.display = "none";
  });
});

//FormData
const uploadForm = document.getElementById("uploadForm");
const imageFile = document.getElementById("imageFile");
imageFile.onchange = (e) => {
  const [file] = imageFile.files;
  if (file) {
    votreImg.src = URL.createObjectURL(file);
    document.getElementById("ajoutImg").style.display = "none";
    document.getElementById("labelImg").style.display = "none";
    votreImg.style.width = "130px";
    votreImg.style.height = "168px";
    document.getElementById("boutonSubmit").style.backgroundColor = "#1D6154";
  }
};

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  const titre = document.getElementById("titre").value;
  const categorie = document.getElementById("categorie").value;
  formData.append("image", imageFile.files[0]);

  formData.append("title", titre);
  formData.append("category", categorie);
  if (titre == "" || categorie == "" || imageFile.files.length == 0) {
    alert("Tous les champs ne sont pas remplis");
  } else {
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer " + JSON.parse(authenticationFromLocalStorage).token,
      },
      body: formData,
    })
      .then(() => {
        document.querySelector(".gallery").innerHTML = "";
        document.getElementById("modalcontainer").innerHTML = "";
        fetchAndBuildWorks();
        alert("Projet rajouté avec succès");
        document.getElementById("modal2").style.display = "none";
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

logoutLink.addEventListener("click", function () {
  authenticationFromLocalStorage = localStorage.removeItem("user");
});
