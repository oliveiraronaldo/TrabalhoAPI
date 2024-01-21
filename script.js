let url = "https://restcountries.com/v3.1/all";
let select = document.querySelector(".select");
let container = document.querySelector(".container");
let listaPaises = [];


fetch(url)
    .then(resposta => resposta.json())  //esse then é do fetch
    .then(paises => exibePais(paises))    //esse then é do json()
    .catch(erro => console.error(erro)) 


select.addEventListener('change', selecionaPais);

function exibePais(paises){
    for (let pais of paises) {
        let html = `
            <option value="${pais.cca3}">${pais.name.common}</options>
        `
        select.insertAdjacentHTML("beforeend", html)
        listaPaises[pais.cca3] = pais;
    }
}

function selecionaPais(){
    let pais = listaPaises[select.value];
    if(pais != undefined){
        let html = `
            <div class="flag">
                <h2>${pais.name.official}</h2>
                <img src="${pais.flags.png}" >
            </div>
            <ul class="pais_data">
                <li>Capital: ${pegarCapital()}</li>
                <li>Continente: ${pais.region}</li>
                <li>População: ${pais.population}</li>
                <li>Área: ${pais.area} Km²</li>
                <li>Moedas: ${pegarMoeda()}</li>
                <li>Idiomas: ${pegarIdioma()}</li>
                <li>Países  que fazem fronteira: ${pegarPaisFronteira()}</li>
            </ul>
        `;
        container.innerHTML = `<br>` + html
    }else{
        container.innerHTML = "";
    }

};

function pegarCapital(){
    let capital = listaPaises[select.value];
    capital = capital.capital ?? "--"; 
    return capital;
}

function  pegarMoeda() {
    let pais = listaPaises[select.value];
    let curr = "";
    for (let moeda in pais.currencies) {
        curr = curr + " - " + pais.currencies[moeda].name;
    }
    return curr;
}

function pegarIdioma() {
    let pais = listaPaises[select.value];
    let lang = "";
    for (let idioma in pais.languages) {
        lang = lang + "    -     " + pais.languages[idioma];
    }
    return lang;
}

function pegarPaisFronteira(){
    let paisLista = listaPaises[select.value];
    let paisNome = '';
    if(paisLista.borders != undefined){
        for (let pais of paisLista.borders) {
            paisNome += '<a onclick="trocarPais(this)" id="'+ pais + '" href="#">  '+ pais +'<img class="bandeirasFronteiras" src="'+ listaPaises[pais].flags.png +'" alt="">      </a>'
        }
    }else{
        paisNome = "--";
    }
    return paisNome;
};

function trocarPais(a){
    select.value = a.id;
    selecionaPais();
}