// character heals 50 points from the treasure

// Hooks to the UI
const answerButtonsEl = document.querySelector(".choiceButtons");
const questionTextEl = document.querySelector("#question-text");
const answerOneEl = document.querySelector("#choice-one");
const answerTwoEl = document.querySelector("#choice-two");
const answerThreeEl = document.querySelector("#choice-three");
const answerFourEl = document.querySelector("#choice-four");
const mapEl = document.querySelector("#dungeon-map");

// Hooks to the UI
const answerButtonsEl = document.querySelector(".choiceButtons");
const questionTextEl = document.querySelector("#question-text");
const answerOneEl = document.querySelector("#choice-one");
const answerTwoEl = document.querySelector("#choice-two");
const answerThreeEl = document.querySelector("#choice-three");
const answerFourEl = document.querySelector("#choice-four");
const mapEl = document.querySelector("#dungeon-map");

const Challenge = [5, 10, 15];
const x = Math.floor(Math.random() * 3);
var API = "https://www.dnd5eapi.co/api/monsters/?challenge_rating=" + Challenge[x];

// Initialize hero stats before they are pulled from db fetch
let heroName = "";
let heroAttack = 0;
let heroHp = 0;
let heroMana = 0;

var monsterName = "";
var monsterLife = 0;
var monsterStrength = 0;
var monsterDexterity = 0;
var monsterIntelligence = 0;

//Quest state variable
let questProgress = 0;
let randomEncounter = 0;

// Basic adventure options
const questLog = [
  {
    //questLog[0]
    question: "You've entered a dungon... There's a [monster] ahead.",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
    search: "dungeon-start",
  },
  {
    //questLog[1]
    question: "You survived the fight. You can now head down a hall and come to a fork. You can proceed turn left or go straight. What do you want to do?",
    choiceOne: "North",
    choiceTwo: "East",
    choiceThree: "-",
    choiceFour: "-",
    search: "boss-1-defeated",
  },
  {
    //questLog[2] - if encounter monster
    question: "You go straight. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-monster",
  },
  {
    //questLog[3] - if find treasure
    question: "You go straight. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-treasure",
  },
  {
    //questLog[4] - if left at questLog[1]
    question: "You turned left. You can go left or straight. What do you do?",
    choiceOne: "West",
    choiceTwo: "North",
    choiceThree: "East",
    choiceFour: "South",
    choiceOne: "Left",
    choiceTwo: "Straight",
    choiceThree: "-",
    choiceFour: "-",
    search: "main-crossing",
  },
  {
    //questLog[5] - If left at questLog[4] and encounter monster
    question: "You go left. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-monster",
  },
  {
    //questLog[6] - If left at questLog[4] and find treasure
    question: "You go left. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-treasure",
  },
  {
    //questLog[7] - If straight at questLog[4] and encounter monster
    question: "You go straight. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-monster",
  },
  {
    //questLog[8] - If straight at questLog[4] and find treasure
    question: "You go straight. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-treasure",
  },
];

///////////////////////////////////////////////////////////////////
function findIndex(x) {
  const index = questLog.map((i) => i.search).indexOf(x);
  return index;
}
console.log(findIndex("dungeon-start"));
////////////////////////////////////////////////////////////////////

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

function getEnemy() {
  var API = "https://www.dnd5eapi.co/api/monsters/?challenge_rating=" + Challenge[x];

  fetch(API)
    .then(async function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      var numMonster = data.count;
      var monsterIndex = [];
      for (let i = 0; i < numMonster; i++) {
        var newMonster = data.results[i].index;
        monsterIndex.push(newMonster);
      }
      var y = Math.floor(Math.random() * data.count);
      singleAPI = "https://www.dnd5eapi.co/api/monsters/" + monsterIndex[y];
      fetch(singleAPI)
        .then(async function (response) {
          return response.json();
        })
        .then(function (data) {
          monsterName = data.name;
          monsterLife = data.hit_points;
          monsterStrength = data.strength;
          monsterDexterity = data.dexterity;
          monsterIntelligemce = data.intelligence;
          console.log(monsterName, monsterLife, monsterStrength, monsterDexterity, monsterIntelligemce);
        });
      // console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);
      console.log("monsterIndex: ", monsterIndex[0]);
    });
}

// This is our init function to start the game and call the function to get the Hero's initial stats.
// Check the web browsers console log to see the stats printed.
const startGame = async () => {
  await getHero();
  console.log("heroName: ", heroName);
  console.log("heroAttack: ", heroAttack);
  console.log("heroHp: ", heroHp);
  console.log("heroMana: ", heroMana);
  await getEnemy();
  console.log("Enemy Name: ", monsterName);
  console.log("Enemy HitPoints: ", monsterLife);
  console.log("Enemy Strength: ", monsterStrength);
  console.log("Enemy Dexterity: ", monsterDexterity);
  console.log("Enemy Intelligence: ", monsterIntelligence);
  renderAdventure();
};

// renders the question and button text on the front end based on the array and quest progress value
function renderAdventure() {
  //set background images
  if (questProgress === findIndex("boss-1-defeated")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013845/newDND/First_room_selection_option_gqd5aw.jpg";
  } else if (questProgress === findIndex("room-4-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_monster_te1lur.jpg";
  } else if (questProgress === findIndex("room-4-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_chest_jmvkdy.jpg";
  } else if (questProgress === findIndex("main-crossing")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/1st_red_route_--room_selection_aqa3uj.jpg";
  } else if (questProgress === findIndex("room-2-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_monster_kesar5.jpg";
  } else if (questProgress === findIndex("room-2-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_chest_qxaunm.jpg";
  } else if (questProgress === findIndex("room-3-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_monster_wt4bwq.jpg";
  } else if (questProgress === findIndex("room-3-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_chest_yncfwd.jpg";
  }

  // set the question and button text
  questionTextEl.textContent = questLog[questProgress].question;
  answerOneEl.textContent = questLog[questProgress].choiceOne;
  answerTwoEl.textContent = questLog[questProgress].choiceTwo;
  answerThreeEl.textContent = questLog[questProgress].choiceThree;
  answerFourEl.textContent = questLog[questProgress].choiceFour;
}

// Helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function findIndex(x) {
  const index = questLog.map((i) => i.search).indexOf(x);
  return index;
}

//TODO: Need to build this out more. So far takes any value and progresses the quest without fighting, but navigation is working for a few turns
function handleChoice() {
  console.log(selectedChoice);
  // first enemy encounter at the start of the dungeon
  if (questProgress === 0) {
    questProgress = findIndex("boss-1-defeated");
    renderAdventure();
    // first hallway after the boss
  } else if (questProgress === findIndex("boss-1-defeated")) {
    // player chooses north
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("main-crossing");
      renderAdventure();
      // player chooses east and has 50/50 chance of treasure vs monster
    } else {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = findIndex("room-4-monster");
        renderAdventure();
      } else {
        //Find treasure
        questProgress = findIndex("room-4-treasure");
        renderAdventure();
      }
    }
  } else if (questProgress === findIndex("main-crossing")) {
    // player chooses west
    if (selectedChoice === "choice-one") {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = findIndex("room-2-monster");
        renderAdventure();
      } else {
        //Find treasure
        questProgress = findIndex("room-2-treasure");
        renderAdventure();
      }
      // player chooses north and has 50/50 chance of treasure vs monster
    } else {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = findIndex("room-3-monster");
        renderAdventure();
      } else {
        //Find treasure
        questProgress = findIndex("room-3-treasure");
        renderAdventure();
      }
    }
  }
}

// Event Listeners
answerButtonsEl.addEventListener("click", function (event) {
  var buttonClicked = event.target;

  if (buttonClicked.matches("button")) {
    selectedChoice = buttonClicked.id;
    handleChoice();
  }
});

// Calls the init function
startGame();
