import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

let FavBtn = document.getElementById('FavBtn')
let FavBtn2 = document.getElementById('FavBtn2')
let FavOver = document.getElementById('FavOver')

let searchInput = document.getElementById('searchInput')
let GoBtn = document.getElementById('GoBtn')

let PokeImg = document.getElementById('PokeImg')
let PokeImg2 = document.getElementById('PokeImg2')
let PokeNum = document.getElementById('PokeNum')
let LocationTxt = document.getElementById('LocationTxt')

let AddFavBtn = document.getElementById('AddFavBtn')
let AddFavBtn2 = document.getElementById('AddFavBtn2')
let RandomBtn = document.getElementById('RandomBtn')
let RandomBtn2 = document.getElementById('RandomBtn2')

let PokeName = document.getElementById('PokeName')
let TypeImg = document.getElementById('TypeImg')
let TypeImg2 = document.getElementById('TypeImg2')
let AbilityTxt = document.getElementById('AbilityTxt')
let MoveTxt = document.getElementById('MoveTxt')

let PokeNametab = document.getElementById('PokeNametab')
let TypeImgtab = document.getElementById('TypeImgtab')
let TypeImg2tab = document.getElementById('TypeImg2tab')
let AbilityTxttab = document.getElementById('AbilityTxttab')
let MoveTxttab = document.getElementById('MoveTxttab')

let Evo1 = document.getElementById('Evo1')
let Evo2 = document.getElementById('Evo2')
let Evo3 = document.getElementById('Evo3')
let Evo1m = document.getElementById('Evo1m')
let Evo2m = document.getElementById('Evo2m')
let Evo3m = document.getElementById('Evo3m')

let Pokemon;
let PokemonName = "pikachu"
let name;

GoBtn.addEventListener('click', async () => {
    PokemonName = searchInput.value.toLowerCase();
    Pokemon = await PokemonApi(PokemonName);
    PokemonApi(Pokemon);
    Pokemon = await PokemonLoaction(PokemonName);
    PokemonLoaction(Pokemon)
})

searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        PokemonName = searchInput.value.toLowerCase();
        Pokemon = await PokemonApi(PokemonName);
        PokemonApi(Pokemon);
    }
})

AddFavBtn.addEventListener("click", async () => {
    saveToLocalStorage(name);
})
AddFavBtn2.addEventListener("click", async () => {
    saveToLocalStorage(name);
})

FavBtn.addEventListener('click', () => {

    if(FavOver.classList.contains("invisible")){
        FavOver.classList.remove("invisible")
    }else{
        FavOver.classList.add("invisible");
    }

    //This retrieves our data from local storage and stores it into favorites variable.
    let favorites = getlocalStorage();

    // Clears getFAvoritesDiv so the Array display will not constantly repeat.
    getFavoritesDiv.textContent = "";

    //map through each element in our array 
    favorites.map(digiName => {
        let div = document.createElement('div')

        div.className = "grid grid-cols-3"
        //Creating a P-tag Dynamically
        let p = document.createElement('p');

        //Setting its text content to digiName
        p.textContent = digiName;

        // className replaces all classes with out new classes
        p.className = "text-white text-end text-[40px] col-span-2";
        p.id = "favpokename";

        //Creating a button dynamically
        let button = document.createElement('button');

        button.type = "button"
        button.textContent = "X";

        //classList allows us to be a little more concise it doesn't replace all classes.
        button.classList.add(
            "text-white",
            "text-center",
            "text-[40px]"
        );

        //creating an addEventListner for our button which removes digiName from our favorites
        button.addEventListener('click', () => {

            removeFromLocalStorage(digiName);

            div.remove();
        })
        // appending our button to our p-tag
        div.append(p);
        div.append(button);
        //appending our p-tag to our FavoritesDiv
        getFavoritesDiv.append(div);
    })


})

FavBtn2.addEventListener('click', () => {

    if(FavOver.classList.contains("invisible")){
        FavOver.classList.remove("invisible")
    }else{
        FavOver.classList.add("invisible");
    }

    //This retrieves our data from local storage and stores it into favorites variable.
    let favorites = getlocalStorage();

    // Clears getFAvoritesDiv so the Array display will not constantly repeat.
    getFavoritesDiv.textContent = "";

    //map through each element in our array 
    favorites.map(digiName => {
        let div = document.createElement('div')

        div.className = "grid grid-cols-3"
        //Creating a P-tag Dynamically
        let p = document.createElement('p');

        //Setting its text content to digiName
        p.textContent = digiName;

        // className replaces all classes with out new classes
        p.className = "text-white text-end text-[40px] col-span-2";
        p.id = "favpokename";

        //Creating a button dynamically
        let button = document.createElement('button');

        button.type = "button"
        button.textContent = "X";

        //classList allows us to be a little more concise it doesn't replace all classes.
        button.classList.add(
            "text-white",
            "text-center",
            "text-[40px]"
        );

        //creating an addEventListner for our button which removes digiName from our favorites
        button.addEventListener('click', () => {

            removeFromLocalStorage(digiName);

            div.remove();
        })
        // appending our button to our p-tag
        div.append(p);
        div.append(button);
        //appending our p-tag to our FavoritesDiv
        getFavoritesDiv.append(div);
    })


})

const getRandomPokemonName = () => {
    const randomId = Math.floor(Math.random() * 600) + 1;
    return PokemonApi(randomId);
};


RandomBtn.addEventListener('click', async () => {
    PokemonName = await getRandomPokemonName();
    Pokemon = await PokemonApi(PokemonName);
    PokemonApi(Pokemon);
});

RandomBtn2.addEventListener('click', async () => {
    PokemonName = await getRandomPokemonName();
    Pokemon = await PokemonApi(PokemonName);
    PokemonApi(Pokemon);
});

const PokemonApi = async (Pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);
    const data = await promise.json();
    let Location = data.location_area_encounters;
    let id =  data.id;
    console.log(data)
    PokemonLoaction(Location)
    fillstuff(data);
    PokemonEvo(id)
}

const PokemonLoaction = async (Location) => {
    const promise = await fetch(Location)
    const LocationData = await promise.json();
    console.log(LocationData)

    let fridge = LocationData[0].location_area.name
    fridge = fridge.charAt(0).toUpperCase() + fridge.slice(1);
    LocationTxt.innerText = "Location: " + fridge
}

const PokemonEvo = async (id) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    const data = await promise.json();
    console.log(data.chain.evolves_to[0].species.name)
}

function fillstuff(data) {

    //Pokemon Name Text

    name = data.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    PokeName.innerText = name;
    PokeNametab.innerText = name;

    //Image changer/show

    let img = data.sprites.other.home.front_default;
    PokeImg.addEventListener('click', () => {
        if (PokeImg.src !== data.sprites.other.home.front_shiny) {
            img = data.sprites.other.home.front_shiny;
            PokeImg.classList.add('border-white')
            PokeImg.classList.remove('border-x-yellow-400')
        } else {
            img = data.sprites.other.home.front_default;
            PokeImg.classList.remove('border-white')
            PokeImg.classList.add('border-x-yellow-400')
        }
        PokeImg.src = img;
        PokeImg2.src = img;
    });
    PokeImg.src = img;
    PokeImg2.src = img;


    //Abilities text

    let abilityNames = [];
    for (let i = 0; i < data.abilities.length; i++) {
        let ability = data.abilities[i].ability;
        let abilityName = ability.name;
        abilityNames.push(abilityName.charAt(0).toUpperCase() + abilityName.slice(1));
    }
    AbilityTxt.innerText = abilityNames.join(", ");
    AbilityTxttab.innerText = abilityNames.join(", ");



    //Id Text

    PokeNum.innerText = "#" + data.id


    //Moves Text

    let moveNames = [];
    for (let i = 0; i < data.moves.length; i++) {
        let move = data.moves[i].move.name;
        moveNames.push(move.charAt(0).toUpperCase() + move.slice(1));
    }
    MoveTxt.innerText = moveNames.join(", ");
    MoveTxttab.innerText = moveNames.join(", ");


    //Type Src

    let TypeNames = [];
    for (let i = 0; i < data.types.length; i++) {
        TypeNames.push(data.types[i].type.name);
    }
    console.log(TypeNames);

    switch (TypeNames[0]) {
        case "fire":
            TypeImg.src = 'assets/Fire.png';
            TypeImgtab.src = 'assets/Fire.png';
            break;
        case "water":
            TypeImg.src = "assets/Water.png";
            TypeImgtab.src = "assets/Water.png";
            break;
        case "grass":
            TypeImg.src = "assets/Grass.png";
            TypeImgtab.src = "assets/Grass.png";
            break;
        case "ground":
            TypeImg.src = "assets/Ground.png";
            TypeImgtab.src = "assets/Ground.png";
            break;
        case "rock":
            TypeImg.src = "assets/Rock.png";
            TypeImgtab.src = "assets/Rock.png";
            break;
        case "normal":
            TypeImg.src = "assets/Normal.png";
            TypeImgtab.src = "assets/Normal.png";
            break;
        case "steel":
            TypeImg.src = "assets/Steel.png";
            TypeImgtab.src = "assets/Steel.png";
            break;
        case "flying":
            TypeImg.src = "assets/Fly.png";
            TypeImgtab.src = "assets/Fly.png";
            break;
        case "ghost":
            TypeImg.src = "assets/Ghost.png";
            TypeImgtab.src = "assets/Ghost.png";
            break;
        case "poison":
            TypeImg.src = "assets/Posion.png";
            TypeImgtab.src = "assets/Posion.png";
            break;
        case "electric":
            TypeImg.src = "assets/Eletric.png";
            TypeImgtab.src = "assets/Eletric.png";
            break;
        case "ice":
            TypeImg.src = "assets/Ice.png";
            TypeImgtab.src = "assets/Ice.png";
            break;
        case "fairy":
            TypeImg.src = "assets/Fairy.png";
            TypeImgtab.src = "assets/Fairy.png";
            break;
        case "psychic":
            TypeImg.src = "assets/Psy.png";
            TypeImgtab.src = "assets/Psy.png";
            break;
        case "bug":
            TypeImg.src = "assets/Bug.png";
            TypeImgtab.src = "assets/Bug.png";
            break;
        case "dark":
            TypeImg.src = "assets/Dark.png";
            TypeImgtab.src = "assets/Dark.png";
            break;
        case "fighting":
            TypeImg.src = "assets/Fight.png";
            TypeImgtab.src = "assets/Fight.png";
            break;
        case "dragon":
            TypeImg.src = "assets/Dragon.png";
            TypeImgtab.src = "assets/Dragon.png";
            break;
        default:
            TypeImg.src = "";
            TypeImgtab.src = "";
            console.log("No Pokemon Found");
            break;
    }
    switch (TypeNames[1]) {
        case "fire":
            TypeImg2.src = 'assets/Fire.png';
            TypeImg2tab.src = 'assets/Fire.png';
            break;
        case "water":
            TypeImg2.src = "assets/Water.png";
            TypeImg2tab.src = "assets/Water.png";
            break;
        case "grass":
            TypeImg2.src = "assets/Grass.png";
            TypeImg2tab.src = "assets/Grass.png";
            break;
        case "ground":
            TypeImg2.src = "assets/Ground.png";
            TypeImg2tab.src = "assets/Ground.png";
            break;
        case "rock":
            TypeImg2.src = "assets/Rock.png";
            TypeImg2tab.src = "assets/Rock.png";
            break;
        case "normal":
            TypeImg2.src = "assets/Normal.png";
            TypeImg2tab.src = "assets/Normal.png";
            break;
        case "steel":
            TypeImg2.src = "assets/Steel.png";
            TypeImg2tab.src = "assets/Steel.png";
            break;
        case "flying":
            TypeImg2.src = "assets/Fly.png";
            TypeImg2tab.src = "assets/Fly.png";
            break;
        case "ghost":
            TypeImg2.src = "assets/Ghost.png";
            TypeImg2tab.src = "assets/Ghost.png";
            break;
        case "poison":
            TypeImg2.src = "assets/Posion.png";
            TypeImg2tab.src = "assets/Posion.png";
            break;
        case "electric":
            TypeImg2.src = "assets/Eletric.png";
            TypeImg2tab.src = "assets/Eletric.png";
            break;
        case "ice":
            TypeImg2.src = "assets/Ice.png";
            TypeImg2tab.src = "assets/Ice.png";
            break;
        case "fairy":
            TypeImg2.src = "assets/Fairy.png";
            TypeImg2tab.src = "assets/Fairy.png";
            break;
        case "psychic":
            TypeImg2.src = "assets/Psy.png";
            TypeImg2tab.src = "assets/Psy.png";
            break;
        case "bug":
            TypeImg2.src = "assets/Bug.png";
            TypeImg2tab.src = "assets/Bug.png";
            break;
        case "dark":
            TypeImg2.src = "assets/Dark.png";
            TypeImg2tab.src = "assets/Dark.png";
            break;
        case "fighting":
            TypeImg2.src = "assets/Fight.png";
            TypeImg2tab.src = "assets/Fight.png";
            break;
        case "dragon":
            TypeImg2.src = "assets/Dragon.png";
            TypeImg2tab.src = "assets/Dragon.png";
            break;
        default:
            TypeImg2.src = "";
            TypeImg2tab.src = "";
            console.log("No Second Type");
            break;
    }


    //Evolution Src



    //Location Text

}

Pokemon = await PokemonApi(PokemonName);