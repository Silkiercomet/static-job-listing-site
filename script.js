let father = document.querySelector("main"),
tagsHeader = document.querySelector(".selected--tags"),
clearQuery = document.querySelector(".clear")


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
  newBtn = document.createElement("button")
  
  return function(x){
    newTag.classList.add("tag")
    newBtn.classList.add("btn")
    newTag.textContent = x
    newBtn.textContent = 'X'
    newTag.appendChild(newBtn)
    tagsHeader.style.display = 'flex'
    tagsHeader.appendChild(newTag)
  }

}

const removeContent = (x,y,z) => {
  for(let i = 0; i < y; i++){
    (document.querySelectorAll(x)[i].innerHTML == "false")? document.querySelectorAll(x)[i].style.display = 'none' : document.querySelectorAll(x)[i].innerHTML = z
  }

};

//fetch the data from the JSON file and prints it in the users screen
let data = fetchData().then( a => {
    a.forEach(element => {
    
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
          <h1 class="role">${element.position}</h1>
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
      //adding the tags to the sections
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

//the sort function for the selected tags
setTimeout(function(){
  let query = []

  document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click",function(){

      let sons = document.querySelectorAll(".jobitem--card");
      
      if(query.includes(tag.textContent) == false){
        addTag()(tag.textContent)
        query.push(tag.textContent)
      }



      const filterElements = () => {
        
        for(let i = 0; i<father.children.length;i++){
          let k = 0;
          if(query.length == 0){
            sons[i].style.display = "flex"
            tagsHeader.style.display = 'none'
            
          }

          for(let j = 0; j < query.length; j++){
            if(sons[i].innerText.includes(query[j])== true){
              k++
              if( k == query.length){
                sons[i].style.display = "flex"
              }
              
            }else {
              sons[i].style.display = "none"
            }
          }
        }
      }




      filterElements()



      //actualiza los cambios efectuado al filtro de busqueda
      //update the search parameters
      document.querySelectorAll(".btn").forEach(btn => {

        let btnContent = btn.parentElement.textContent

        btn.addEventListener("click", function(){

          btn.parentElement.remove()
        
          query = [...query].filter(a => a !== btnContent.slice(0,btnContent.length-1))

        filterElements()
        })
      })

      clearQuery.addEventListener("click", function(){
        query = []
        document.querySelectorAll(".btn").forEach(btn => btn.parentElement.remove())
        filterElements()
      })


    })
  })

},1000)
