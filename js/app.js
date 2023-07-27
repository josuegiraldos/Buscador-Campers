console.log(campers);

/* 1. Llenar dinámicamente los campers */
campers.forEach(optionCamper => {
    const opcion = document.createElement('option');
    opcion.value = optionCamper.nombre;
    opcion.textContent = optionCamper.nombre;
    document.querySelector('#nombre').appendChild(opcion);
});

/*  2. Llenar el select con edades */
for (let n = 15; n < 45; n++) {
    const opcion = document.createElement('option');
    opcion.value = n;
    opcion.textContent = n;
    document.querySelector('#edad').appendChild(opcion);
}

/* 3. Event listener */
document.addEventListener('DOMContentLoaded', ()=>{
    showCampers(campers);
    console.log(parametros);
    selectCamper();
})

/* 4. Función para inyectar dinámicamente HTML */
function showCampers(campers){
    const contenedorTarjetas = document.querySelector('#tarjetas');
    // limpiar
    limpiar();
    campers.forEach((camper)=>{
        //Destructuring
        const {nombre} = camper;
        const {imagen} = camper;
        const {detalle} = camper;
        const {promedio} = camper;
        const {especialidad} = camper;
        const {expertoTecnologia} = camper;
        const {direccion} = camper;
        const {telefono} = camper;
        const {id} = camper;

        const camperHTML = document.createElement('p');
        camperHTML.innerHTML = `
        <div class="card" style="width: 20rem;">
            <img src="../img/${imagen}" class="card-img-top" alt="..." id:"img-card">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text detalle">${detalle}</p>
            </div>
            <ul class="list-group list-group-flush">
                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" imagen="${imagen}" promedio="${promedio}" especialidad="${especialidad}" experto="${expertoTecnologia}" nombre="${nombre}" direccion="${direccion}" telefono="${telefono}">Details</a>
                <a href="#" class="btn btn-primary boton" id="${id}">Hire</a>
            </ul>
        </div>       
        `;
        contenedorTarjetas.appendChild(camperHTML);
    })
}

// 5. Objeto con parámetros para la búsqueda
const parametros = {
    nombre: "",
    edad: "",
    minPromedio: "",
    maxPromedio: "",
    nivelCampus: "",
    nivelIngles: "",
    especialidad: "",
    expertoTecnologia: "",
    search: "",
    direccion: "",
    telefono: "",
}

// 6. Selectors
const nombreCamper = document.querySelector('#nombre');
const edadCamper = document.querySelector('#edad');
const minCamper = document.querySelector('#minimo');
const maxCamper = document.querySelector('#maximo');
const nivelCampusCamper = document.querySelector('#nivelCampus');
const nivelInglesCamper = document.querySelector('#nivelIngles');
const especialidadCamper = document.querySelector('#especialidad');
const expertoTecnologiaCamper = document.querySelector('#expertoTecnologia');

/* 7. Event listeners filtros */
nombreCamper.addEventListener('input', (e)=>{
    parametros.nombre = e.target.value;
    // console.log(parametros);

    /* 8. Llamado función de alto nivel */
    filtrarCamper();
});

edadCamper.addEventListener('input', (e)=>{
    parametros.edad = Number(e.target.value);
    // console.log(parametros);
    filtrarCamper();
});

minCamper.addEventListener('input', (e)=>{
    parametros.minPromedio = parseFloat(e.target.value);
    // console.log(parametros);
    filtrarCamper();
});

maxCamper.addEventListener('input', (e)=>{
    parametros.maxPromedio = parseFloat(e.target.value);
    // console.log(parametros);
    filtrarCamper();
});

nivelCampusCamper.addEventListener('input', (e)=>{
    parametros.nivelCampus = e.target.value;
    // console.log(parametros);
    filtrarCamper();
});

nivelInglesCamper.addEventListener('input', (e)=>{
    parametros.nivelIngles = e.target.value;
    // console.log(parametros);
    filtrarCamper();
});

especialidadCamper.addEventListener('input', (e)=>{
    parametros.especialidad = e.target.value;
    // console.log(parametros);
    filtrarCamper();
});

expertoTecnologiaCamper.addEventListener('input', (e)=>{
    parametros.expertoTecnologia = e.target.value;
    // console.log(parametros);
    filtrarCamper();
});

/* 8.1 Declaración de función filtrar de alto nivel */
function filtrarCamper(){
    const resultado = campers
    .filter(filtrarNombre)
    .filter(filtrarEdad)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarNivelCampus)
    .filter(filtrarNivelIngles)
    .filter(filtrarEspecialidad)
    .filter(filtrarExpertoTecnologia)
    .filter(filtrarSearch);
    console.log(resultado);
    if (resultado.length) {
        showCampers(resultado);    
    }
    else{
        notResult();
    }
}

function notResult(camper){
    limpiar();
    const notResult = document.createElement('p');
    notResult.classList.add('alert');
    notResult.appendChild(document.createTextNode("Results Not Found"));
    document.querySelector('#tarjetas').appendChild(notResult);
}

function filtrarNombre(camper){
    if (parametros.nombre) {
        return camper.nombre === parametros.nombre;
    }
    return camper;
}

function filtrarEdad(camper){
    if (parametros.edad) {
        return camper.edad === parametros.edad;
    }
    return camper;
}

function filtrarMin(camper){
    if (parametros.minPromedio) {
        return camper.promedio >= parametros.minPromedio;
    }
    return camper;
}

function filtrarMax(camper){
    if (parametros.maxPromedio) {
        return camper.promedio <= parametros.maxPromedio;
    }
    return camper;
}

function filtrarNivelCampus(camper){
    if (parametros.nivelCampus) {
        return camper.nivelCampus === parametros.nivelCampus;
    }
    return camper;
}

function filtrarNivelIngles(camper){
    if (parametros.nivelIngles) {
        return camper.nivelIngles === parametros.nivelIngles;
    }
    return camper;
}

function filtrarEspecialidad(camper){
    if (parametros.especialidad) {
        return camper.especialidad === parametros.especialidad;
    }
    return camper;
}

function filtrarExpertoTecnologia(camper){
    if (parametros.expertoTecnologia) {
        return camper.expertoTecnologia === parametros.expertoTecnologia;
    }
    return camper;
}

function filtrarSearch(camper){
    if (parametros.search) {
        return camper.nombre === parametros.search;
    }
    return camper;
}

function limpiar(){
    let m = document.querySelectorAll('p');
    for (let a = 0; a < m.length; a++) {
        m[a].remove();
    }
}

const tbody = document.querySelector('tbody');
const rowModal = document.createElement('tr');


function selectCamper(camper){
    const camperDetails = document.querySelector('#tarjetas');
    camperDetails.addEventListener('click', loadDetail)
}

let color;
let reporte;
function loadDetail(e){
    const nombre = e.target.getAttribute("nombre");
    const titulo = document.querySelector('#exampleModalLabel');
    titulo.textContent = `${nombre}`;

    const imagen = e.target.getAttribute('imagen');
    const promedio = e.target.getAttribute('promedio');
    const especialidad = e.target.getAttribute('especialidad');
    const experto = e.target.getAttribute('experto');
    const direccion = e.target.getAttribute('direccion');
    const telefono = e.target.getAttribute('telefono');

    if (promedio >= 4.5) {
        color = "green";
        reporte = "Apto para contratar.";
    }
    else{
        color = "red";
        reporte = "No está apto para contratar. Debe estudiar más.";
    }
    rowModal.innerHTML = 
    `
        <td>
            <img src = "img/${imagen}" width="150px">
        </td>
        <td>
            <p>Promedio: ${promedio}</p>
            <p style="color: ${color}">${reporte}</p>
        </td>
        <td>
            <p>${especialidad}</p>
        </td>
        <td>
            <p>${experto}</p>
        </td>
        <td>
            <p>${direccion}</p>
        </td>
        <td>
            <p>${telefono}</p>
        </td>
    `;
    tbody.appendChild(rowModal);
}

/* Versión 2 - taller simulacro */
let search = document.querySelector('#search');

/* Add eventListener */
search.addEventListener('input', (e) =>{
    parametros.search = e.target.value;
    filtrarCamper();
})

/* Hire Cart */
const cards = document.querySelector('#tarjetas');
let arrayCards = [];
const tbodie = document.querySelector('#tbodie');
const deleteListCards = document.querySelector('#deleteListCards');
const cleanCart = document.querySelector('#cleanCart');

/* Listeners */
cards.addEventListener('click', selectCards);
deleteListCards.addEventListener('click', deleteCards);
cleanCart.addEventListener('click', trashCart);
// trashCart.addEventListener('click', arrayCards = []);

//localStorage
document.addEventListener('DOMContentLoaded', ()=>{
    arrayCards = JSON.parse(localStorage.getItem('jobCart')) || [];
    injectingCampersHtml();
    deleteContent();
})

function deleteContent(){
    
}

function selectCards(e){
    e.preventDefault();
    if (e.target.classList.contains('boton')) {
        const selectedCamper = e.target.parentElement.parentElement;
        console.log(selectedCamper);        
        detail(selectedCamper);
    }
}

function detail(selectedCamper){
    const camperDetail = {
        imagen: selectedCamper.querySelector('img').src,
        nombre: selectedCamper.querySelector('h5').textContent,
        detalle: selectedCamper.querySelector('.detalle').textContent,
        id: selectedCamper.querySelector('.boton').getAttribute('id'),
    }
    arrayCards = [...arrayCards, camperDetail];
    console.log(arrayCards);
    injectingCampersHtml();
}

function deleteCards(e){
    if (e.target.classList.contains('deleteCard')) {
        const cardToDelete = e.target.getAttribute('id');
        console.log(cardToDelete);
        arrayCards = arrayCards.filter((cd)=> cd.id !== cardToDelete);
        injectingCampersHtml();
    }
}

function injectingCampersHtml(){
    cleanHtml();
    arrayCards.forEach((arrayCard)=>{
        const {imagen, nombre, detalle, id} = arrayCard;
        const row = document.createElement('tr');
        row.innerHTML = 
        `
        <td>
            <img src="${imagen}" width="160px">
        </td>
        <td>
            ${nombre}
        </td>
        <td>
            ${detalle}
        </td>
        <td>
            <a href="#" class="deleteCard btn btn-danger" id="${id}">X</a>
        </td>
        `;
        tbodie.appendChild(row);
    });
    addStorage();
}

function addStorage(){
    localStorage.setItem('jobCart', JSON.stringify(arrayCards));
}

function trashCart(){
    arrayCards = [];
    cleanHtml();
}

function cleanHtml(){
    tbodie.innerHTML = "";
}