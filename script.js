let father = document.querySelector("main")

async function fetchData(){
    try{
        let response = await fetch(`data.json`);
        return  response.json()
    }catch(err){
        console.error(err)
    }
}

const addTag = () => {
  let newTag = document.createElement("li"),
  newBtn = document.createElement("button"),
  tagsHeader = document.querySelector(".selected--tags")

  return function(x){
    newTag.classList.add("tag")
    newBtn.classList.add("btn")
    newTag.textContent = x
    newBtn.textContent = 'X'
    newTag.appendChild(newBtn)
    
    tagsHeader.appendChild(newTag)
  }
   
}

const removeContent = (x,y,z) => {
  for(let i = 0; i < y; i++){
    (document.querySelectorAll(x)[i].innerHTML == "false")? document.querySelectorAll(x)[i].style.display = 'none' : document.querySelectorAll(x)[i].innerHTML = z
  }
  
};


let data = fetchData().then( a => {
    a.forEach(element => {
       // console.log(element.company)
       let newSection = document.createElement("section")
       

       newSection.classList.add("jobitem--card")
       newSection.innerHTML = `
       <article>
          <figure>
            <img src= "${element.logo}"  alt="" />
          </figure>
          <div class="details">
            <small class="name">${element.company}</small><span class="new">${element.new}</span>
            <span class="featured">${element.featured}</span>
          </div>
          <h1 class="role">${element.position}"</h1>
          <dl class="requirements">
            <dt class="time">${element.postedAt}</dt>
            <dt class="role-time">${element.contract}</dt>
            <dt class="location">${element.location}</dt>
          </dl>
        </article>
        <menu class="tags">
          <li class="tag">${element.role}</li>
          <li class="tag">${element.level}</li>

        </menu>
       `
       
      father.appendChild(newSection)
      element.languages.map(language => {
        let newEntry = document.createElement("li"),
        tagsSection = document.querySelectorAll(".tags")
        newEntry.classList.add("tag")
        newEntry.textContent = language
        tagsSection[element.id-1].appendChild(newEntry)
        })
    });
    removeContent(".new",father.children.length,"New")
    removeContent(".featured",father.children.length,"Featured")

})


setTimeout(function(){
  document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click",function(){
      let sons = document.querySelectorAll(".jobitem--card")
      addTag()(tag.textContent)
      
      for(let i = 0; i<father.children.length;i++){
        if(sons[i].innerText.includes(tag.textContent) === true){
          console.log(sons[i].innerText.includes(tag.textContent))
          sons[i].style.display = "flex"
        }else{
          sons[i].style.display = "none"
        }
      }
    })
  })

},1000)
//usar margin para posicionar la barra de tags