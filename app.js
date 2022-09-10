const root = document.getElementById('root');
const mujer = document.getElementById('mujer');
const hombre = document.getElementById('hombre');

//paginador
let pagina = 1;

const getData = () => {
  const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  // fetch(url)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     printData(json.results) // []
  //     data = json;
  //   })
  //   .catch(err => console.error(err))
  const resp = await fetch(url)
  const json = await resp.json()
  printData(json.results)
}

let data = [];

const printData = json => {
  console.log(json) //  []
  const arr = json;
  let card = '';
  arr.forEach(personaje => {
    const {name, gender, species, status, origin, location, image} = personaje;
    card +=`  
      <div class="col s12 m6 l3">
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
console.log(printData)


mujer.addEventListener('click', e => {
  const female = data.results.filter(personaje => personaje.gender === 'Female');
  printData(female); // []
  console.log(data)
})











$( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
    getData();
  })