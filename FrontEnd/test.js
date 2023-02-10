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
