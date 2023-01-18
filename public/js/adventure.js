let heroName = "";
let heroAttack = 0;
let heroHp = 0;
let heroMana = 0;

// used in get request to look up the hero's initial stats
const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

// Gets the Hero's data from our db
const getHero = () =>
  fetch(`/api/heroes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((heroData) => {
      heroName = heroData.name;
      heroAttack = heroData.attack;
      heroHp = heroData.hitPoints;
      heroMana = heroData.mana;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

// This is our init function to start the game and call the function to get the Hero's initial stats.
// Check the web browsers console log to see the stats printed.
// TODO: Within here, we can nest the functions to start the gameplay loop
const startGame = () =>
  getHero().then(() => {
    console.log("heroName: ", heroName);
    console.log("heroAttack: ", heroAttack);
    console.log("heroHp: ", heroHp);
    console.log("heroMana: ", heroMana);
  });

// Calls the init function
startGame();
