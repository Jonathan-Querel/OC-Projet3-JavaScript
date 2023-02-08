//Récupération de la class gallery dans une constante
const galleryContainer = document.querySelector(".gallery");
console.log(galleryContainer);

//Suppression des données de la class gallery du fichier HTML
document.querySelector(".gallery").innerHTML = '';


fetch('http://localhost:5678/api/works')
    .then (response => response.json())
    .then (data => {
            console.log(data);
    })
    .catch (error => {
        console.error("Il y a eu un problème : " + error);
    });

//Création des éléments
const figureElement = document.createElement("figure");
const imgElement = document.createElement("img");
imgElement.src = 'http://localhost:5678/api/works/imageUrl';
const altElement = document.createElement("alt");
altElement.innerText = 'http://localhost:5678/api/works/title';
const figcaptionElement = document.createElement("figcaption");
figcaptionElement.innerText = 'http://localhost:5678/api/works/title';

//Rattachement des balises au DOM
galleryContainer.appendChild(figureElement);
figureElement.appendChild(imgElement);
imgElement.appendChild(altElement);
figureElement.appendChild(figcaptionElement);
