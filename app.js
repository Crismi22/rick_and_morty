const root = document.getElementById('root');
const mujer = document.getElementById('mujer');
const hombre = document.getElementById('hombre');
const todos = document.getElementById('todos');

// paginador

const paginaActual = document.querySelector('#pagina-actual')
const totalPaginas = document.querySelector('#total-paginas')
const firstPage = document.querySelector('#first-page')
const previusPage = document.querySelector('#previus-page')
const nextPage = document.querySelector('#next-page')
const lastPage = document.querySelector('#last-page')

// loader
const loader = document.getElementById('contenedor')


let pagina = 1;
let total = 0;

const getData = async () => {
  loader.classList.remove('esconder')
  root.classList.add('esconder')
  const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  // const json = []
  // fetch(url)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     printData(json.results) // []
  //     data = json;
  //   })
  //   .catch(err => console.error(err))
  const resp = await fetch(url)  //con el await lo que hacemos al igual que el .then es esperar la url que retorna el fetch y lo guarda en una const
  const json = await resp.json() //nos trae la data
  printData(json.results) 
  total = json.info.pages
  paginaActual.innerHTML = pagina
  totalPaginas.innerHTML = total
  data = json
  updatePagination(); 
  setTimeout(() => { //nos da un poco mas de tiempo en cargar la pagina para visualizar el loader.
    loader.classList.add('esconder')
    root.classList.remove('esconder')
  },1000)
  return json;
}

let data = [];

const printData = json => {
  // console.log(json) //  []
  const arr = json;
  let card = '';
  arr.forEach(personaje => {
    const {name, gender, species, status, origin, location, image} = personaje;
    card +=`  
      <div class="col s6 m6 l3">
        <div class="card">
          <div class="card-image">
            <img src=${image} alt=${name}>
          </div>
          <div class="card-content">
            <p>Nombre: ${name}</p>
            <p>Genero: ${gender}</p>
            <p>Species: ${species}</p>
            <p>Status: ${status}</p>
            <p>Origin: ${origin.name}</p>
            <p>Location: ${location.name}</p>
          </div>
          <div class="card-action">
            <a href="#">ver mas...</a>
          </div>
        </div>
      </div>
    `
  });
  root.innerHTML = card;
}


mujer.addEventListener('click', e => {
  const female = data.results.filter(personaje => personaje.gender === 'Female');
  printData(female); // []
  
})
hombre.addEventListener('click', e => {
  const male = data.results.filter(personaje => personaje.gender === 'Male');
  printData(male); // []
  
})
todos.addEventListener('click', e => {
  const todosResultados = data.results
  printData(todosResultados); // []
  
})

// pagination
//falta una linea de codigo por posible error como con el cath 
const pagination = async (promesa) => {
  const result = await promesa
  // console.log(result)
  nextPage.addEventListener('click', () => {
    pagina += 1;
    getData()
  })
  previusPage.addEventListener('click', () => {
    pagina -= 1;
    getData();
  })
  lastPage.addEventListener('click', () => {
    if(pagina <= result.info.pages){
      pagina = result.info.pages
      getData();
    }
  })
  firstPage.addEventListener('click', () => {
    if(pagina >= 2){
      pagina = 1
      getData();
    }
  })
}
//funcion para desabilitar botones de paginador al llegar a la ultima o primera pagina. detecta el cambio de pagina y sabe que boton habilitar o deshabilitar
const updatePagination = () =>{
  if(pagina <= 1){
    previusPage.disabled = true;
    firstPage.disabled = true;
  } else {
    previusPage.disabled = false;
    firstPage.disabled = false;
  }
  if(pagina == total ){
    nextPage.disabled = true;
    lastPage.disabled = true;
  } else {
    nextPage.disabled = false;
    lastPage.disabled = false;
  }
}


$( document ).ready(function(){
  $(".dropdown-trigger").dropdown();
  pagination(getData());
  pagination()
  getData()
})