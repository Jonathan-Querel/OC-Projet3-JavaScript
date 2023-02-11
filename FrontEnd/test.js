//const fetchCategory = fetch("http://localhost:5678/api/categories")
//.then((response) => response.json())
//.then((data) => dataCategory(data))
//.catch((error) => {
//  console.error("Il y a eu un problème : " + error);
// });

//console.log(fetchCategory);

//function dataCategory = for (ind = 0 ; ind<dataCategory.length ; ind++) {}
const mesProjets = document.querySelector("#portfolio");
const divButton = document.createElement("divbutton");
divButton.classList.add("bouton");
mesProjets.appendChild(divButton);
const buttonElement1 = document.createElement("button");
buttonElement1.innerText = "Tous";
buttonElement1.classList.add("btn");
divButton.appendChild(buttonElement1);
const buttonElement2 = document.createElement("button");
buttonElement2.innerText = "Objets";
buttonElement2.classList.add("btn");
divButton.appendChild(buttonElement2);
const buttonElement3 = document.createElement("button");
buttonElement3.innerText = "Appartements";
buttonElement3.classList.add("btn");
divButton.appendChild(buttonElement3);
const buttonElement4 = document.createElement("button");
buttonElement4.innerText = "Hôtels & restaurants";
buttonElement4.classList.add("btn");
divButton.appendChild(buttonElement4);

//Récupération de la class gallery dans une constante
const galleryContainer = document.querySelector(".gallery");
console.log(galleryContainer);
const galleryFigures = Array.from(galleryContainer.children);
console.log(galleryFigures);

//Suppression des données de la class gallery du fichier HTML
document.querySelector(".gallery").innerHTML = "";

const fetchWorks = fetch("http://localhost:5678/api/works");

fetchWorks
  .then((response) => response.json())
  .then((data) => {
    dataWorks(data);
  })
  .catch((error) => {
    console.error("Il y a eu un problème : " + error);
  });

console.log(fetchWorks);

function dataWorks(works) {
  let indice = 0;
  galleryFigures.forEach(() => {
    const work = works[indice];
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    //Rattachement des balises au DOM
    galleryContainer.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    indice++;
  });
}
