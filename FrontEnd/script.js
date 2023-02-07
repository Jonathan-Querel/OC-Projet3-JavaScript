fetch('http://localhost:5678/api/works')
    .then (response => response.json())
    .then (data => {
            console.log(data);
            //createFigure(data);
    })
    .catch (error => {
        console.error('Il y a eu un problème : ' + error.message);
    });

function createNode(figure){
    return document.createElement('figure');
}
const div = document.getElementById('.gallery');
const url = 'http://localhost:5678/api/works';

fetch(url)
    .then((response) => response.json())
    .then (function(data){
        let img = createNode('img');
        let alt = createNode('alt');
        let figcaption = createNode('figcaption');
        img.src=work.imageUrl;
        alt.src=work.title;

    })

/*function createFigure () {
const divGallery = document.createElement("galery");
const imgElement = document.createElement("img")
divGallery.appendChild(imgElement);

const currentDiv = document.getElementById('div1')
document.body.insertBefore (divGallery, imgElement);
img.src = work.imageUrl;
img.alt = work.title;
//figureElement.appendChild(img);
imgElement.innerHTML = img;
}*/