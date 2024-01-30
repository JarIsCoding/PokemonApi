let FavBtn = document.getElementById('FavBtn')
let FavOver = document.getElementById('FavOver')

let searchInput = document.getElementById('searchInput')
let GoBtn = document.getElementById('GoBtn')

let PokeImg = document.getElementById('PokeImg')
let PokeNum = document.getElementById('PokeNum')
let LocationTxt = document.getElementById('LocationTxt')

let AddFavBtn = document.getElementById('AddFavBtn')
let EvolutionBtn = document.getElementById('EvolutionBtn')
let RandomBtn = document.getElementById('RandomBtn')

let PokeName = document.getElementById('PokeName')
let TypeImg = document.getElementById('TypeImg')
let TypeImg2 = document.getElementById('TypeImg2')
let AbilityTxt = document.getElementById('AbilityTxt')
let MoveTxt = document.getElementById('MoveTxt')

let Pokemon = "";

FavBtn.addEventListener('click', () => {
    if (FavOver.classList.contains('invisible')) {
        FavOver.classList.remove('invisible')
    } else {
        FavOver.classList.add('invisible')
    }
})

function runstuff() {
    Pokemon = searchInput.value.toLowerCase();
    PokemonApi(Pokemon);
}

GoBtn.addEventListener('click', () => {
    runstuff();
})

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        runstuff();
    }
})

const PokemonApi = async (Pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);
    const data = await promise.json();
    console.log(data);
    fillstuff(data);
}

function fillstuff(data) {

    //Pokemon Name Text

    let name = data.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    PokeName.innerText = name;


    //Image changer/show

    let img = data.sprites.front_default;
    PokeImg.addEventListener('click', () => {
        if (PokeImg.src === data.sprites.front_shiny) {
            img = data.sprites.front_default;
            PokeImg.classList.add('border-white')
            PokeImg.classList.remove('border-x-yellow-400')
        } else {
            img = data.sprites.front_shiny;
            PokeImg.classList.remove('border-white')
            PokeImg.classList.add('border-x-yellow-400')
        }
        PokeImg.src = img;
    });
    PokeImg.src = img;


    //Abilities text

    let abilityNames = [];
    for (let i = 0; i < data.abilities.length; i++) {
        let ability = data.abilities[i].ability;
        let abilityName = ability.name;
        abilityNames.push(abilityName.charAt(0).toUpperCase() + abilityName.slice(1));
    }
    AbilityTxt.innerText = abilityNames.join(", ");



    //Id Text

    PokeNum.innerText = "#" + data.id


    //Moves Text

    let moveNames = [];
    for (let i = 0; i < data.moves.length; i++) {
        let move = data.moves[i].move.name;
        moveNames.push(move.charAt(0).toUpperCase() + move.slice(1));
    }
    MoveTxt.innerText = moveNames.join(", ");


    //Type Src

    let firstTypeName;
    for (let i = 0; i < data.types.length; i++) {
        let type = data.types[i].type.name
        console.log(type)
    }

    let type2 = data.types[1].type.name
    console.log(type2)
}
