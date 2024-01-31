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

    let img = data.sprites.other.home.front_default;
    console.log(img)
    PokeImg.addEventListener('click', () => {
        if (PokeImg.src === data.sprites.other.home.front_shiny) {
            img = data.sprites.other.home.front_default;
            PokeImg.classList.add('border-white')
            PokeImg.classList.remove('border-x-yellow-400')
        } else {
            img = data.sprites.other.home.front_shiny;
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

    let TypeNames = [];
    for (let i = 0; i < data.types.length; i++) {
        TypeNames.push(data.types[i].type.name);
    }
    console.log(TypeNames);
    
    switch (TypeNames[0]) {
        case "fire":
            TypeImg.src = 'assets/Fire.png';
            break;
        case "water":
            TypeImg.src = "assets/Water.png";
            break;
        case "grass":
            TypeImg.src = "assets/Grass.png";
            break;
        case "ground":
            TypeImg.src = "assets/Ground.png";
            break;
        case "rock":
            TypeImg.src = "assets/Rock.png";
            break;
        case "normal":
            TypeImg.src = "assets/Normal.png";
            break;
        case "steel":
            TypeImg.src = "assets/Steel.png";
            break;
        case "flying":
            TypeImg.src = "assets/Fly.png";
            break;
        case "ghost":
            TypeImg.src = "assets/Ghost.png";
            break;
        case "poison":
            TypeImg.src = "assets/Posion.png";
            break;
        case "electric":
            TypeImg.src = "assets/Eletric.png";
            break;
        case "ice":
            TypeImg.src = "assets/Ice.png";
            break;
        case "fairy":
            TypeImg.src = "assets/Fairy.png";
            break;
        case "psychic":
            TypeImg.src = "assets/Psy.png";
            break;
        case "bug":
            TypeImg.src = "assets/Bug.png";
            break;
        case "dark":
            TypeImg.src = "assets/Dark.png";
            break;
        case "fighting":
            TypeImg.src = "assets/Fight.png";
            break;
        case "dragon":
            TypeImg.src = "assets/Dragon.png";
            break;
        default:
            TypeImg.src = "";
            console.log("No Pokemon Found");
            break;
    }
    switch (TypeNames[1]) {
        case "fire":
            TypeImg2.src = 'assets/Fire.png';
            break;
        case "water":
            TypeImg2.src = "assets/Water.png";
            break;
        case "grass":
            TypeImg2.src = "assets/Grass.png";
            break;
        case "ground":
            TypeImg2.src = "assets/Ground.png";
            break;
        case "rock":
            TypeImg2.src = "assets/Rock.png";
            break;
        case "normal":
            TypeImg2.src = "assets/Normal.png";
            break;
        case "steel":
            TypeImg2.src = "assets/Steel.png";
            break;
        case "flying":
            TypeImg2.src = "assets/Fly.png";
            break;
        case "ghost":
            TypeImg2.src = "assets/Ghost.png";
            break;
        case "poison":
            TypeImg2.src = "assets/Posion.png";
            break;
        case "electric":
            TypeImg2.src = "assets/Eletric.png";
            break;
        case "ice":
            TypeImg2.src = "assets/Ice.png";
            break;
        case "fairy":
            TypeImg2.src = "assets/Fairy.png";
            break;
        case "psychic":
            TypeImg2.src = "assets/Psy.png";
            break;
        case "bug":
            TypeImg2.src = "assets/Bug.png";
            break;
        case "dark":
            TypeImg2.src = "assets/Dark.png";
            break;
        case "fighting":
            TypeImg2.src = "assets/Fight.png";
            break;
        case "dragon":
            TypeImg2.src = "assets/Dragon.png";
            break;
        default:
            TypeImg2.src = "";
            console.log("No Second Type");
            break;
    }
}
