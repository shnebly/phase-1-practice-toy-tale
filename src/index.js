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
    card.id = toy.id;
    const name = document.createElement('h2');
    name.innerText = toy.name;
    const img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';
    const likes = document.createElement('p');
    likes.innerText = toy.likes;
    const btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.innerText = 'Like';
    card.append(name, img, likes, btn);
    collection.append(card);

    const form = document.querySelector(".add-toy-form")
    form.addEventListener('submit', createNewToy)

    //adding listener for the like button
    card.querySelector('.like-btn').addEventListener('click', (e) => {
      e.preventDefault();
      // likes.innerText++
      updateLike(toy, likes)
    })
    //adding listener to delete additions
    card.querySelector('h2').addEventListener('click', () => {
      card.remove()
      deleteCard(card)
    })
  }

  

  //Add a new toy function
  function createNewToy(e){
    e.preventDefault()
    let newToy = {
      name: e.target[0].value,
      image: e.target[1].value,
      likes: 0,
    }
    const url = "http://localhost:3000/toys"
    fetch(url, {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(data => showToy(data))
    e.target.reset() 
  }

  //Add likes to a toy
  // this function needed outside assistance, parameters were adjusted from 'card' to 'toy' to grab the (toy object) versus the (HTML Div)
  // with the object grabbed I could then grab the likes value pair and update it on the backend
  // I also needed to parseInt the value so it wouldn't string it together
  function updateLike(toy, likes){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'likes':parseInt(likes.textContent)+1})
    })
    .then(resp => resp.json())
    .then(data => likes.textContent = data.likes)
  }

  //Delete a toy (added this for myself to clean up the page while I practice)
  function deleteCard(card){
    fetch(`http://localhost:3000/toys/${card.id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
  }
})
