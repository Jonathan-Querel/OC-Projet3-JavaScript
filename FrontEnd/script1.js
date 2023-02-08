const img = document.getElementById('img');
const node = document.querySelector('figure');
node.removeChild(node)

fetch('http://localhost:5678/api/works')
    .then (response => response.json())
    .then (data => img.src = data[1].imageUrl)