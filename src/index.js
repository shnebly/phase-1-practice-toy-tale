let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//Fetch Andy's Toys
function getToys(){
  fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(data => {
        for(let i = 0; i < data.length; i++){
          showToy(data[i])
        }
      })
      
}
getToys()
// design the card for each toy
function showToy(toy){
  const collection = document.getElementById('toy-collection');
  const card = document.createElement('div');
  card.className = 'card';
  const name = document.createElement('h2');
  name.innerText = toy.name;
  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';
  const likes = document.createElement('p');
  likes.innerText = toy.likes;
  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy.id;
  btn.innerText = 'Like';
  card.append(name, img, likes, btn);
  collection.append(card);
}

const form = document.querySelector(".add-toy-form")
form.addEventListener('submit', createNewToy)

function createNewToy(e){
  e.preventDefault(e)
  let newToy = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0,
  }
  
  const url = "http://localhost:3000/toys"
  fetch(url, {
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}




console.log("Last Load")
});
