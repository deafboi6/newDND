// Hooks to the UI
var answerButtonsEl = document.querySelector(".choiceButtons");
var questionTextEl = document.querySelector("#question-text");
var answerOneEl = document.querySelector("#choice-one");
var answerTwoEl = document.querySelector("#choice-two");
var answerThreeEl = document.querySelector("#choice-three");
var answerFourEl = document.querySelector("#choice-four");
var mapEl = document.querySelector("#dungeon-map");

// Initialize hero stats before they are pulled from db fetch
let heroName = "";
let heroAttack = 0;
let heroHp = 0;
let heroMana = 0;

//Quest state variable
var questProgress = 0;
var randomEncounter = 0;

// Basic adventure options
var questLog = [
  {
    //questLog[0]
    question: "You've entered a dungon... There's a [monster] ahead.",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[1]
    question: "You survived the fight. You can now head down a hall and come to a fork. You can proceed turn left or go straight. What do you want to do?",
    choiceOne: "Left",
    choiceTwo: "Straight",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[2] - if encounter monster
    question: "You go straight. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[3] - if find treasure
    question: "You go straight. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[4] - if left at questLog[1]
    question: "You turned left. You can go left or straight. What do you do?",
    choiceOne: "Left",
    choiceTwo: "Straight",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[5] - If left at questLog[4] and encounter monster
    question: "You go left. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[6] - If left at questLog[4] and find treasure
    question: "You go left. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[7] - If straight at questLog[4] and encounter monster
    question: "You go straight. A [monster] appears. What do you do?",
    choiceOne: "Fight",
    choiceTwo: "Heal",
    choiceThree: "-",
    choiceFour: "-",
  },
  {
    //questLog[8] - If straight at questLog[4] and find treasure
    question: "You go straight. The room is clear for danger, but you find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
  },
];

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
const startGame = () =>
  getHero()
    .then(() => {
      console.log("heroName: ", heroName);
      console.log("heroAttack: ", heroAttack);
      console.log("heroHp: ", heroHp);
      console.log("heroMana: ", heroMana);
    })
    .then(renderAdventure);

// renders the question and button text on the front end based on the array and quest progress value
function renderAdventure() {
  //set background images
  if (questProgress === 1) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013845/newDND/First_room_selection_option_gqd5aw.jpg";
  } else if (questProgress === 2) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_monster_te1lur.jpg";
  } else if (questProgress === 3) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_chest_jmvkdy.jpg";
  } else if (questProgress === 4) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/1st_red_route_--room_selection_aqa3uj.jpg";
  } else if (questProgress === 5) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_monster_kesar5.jpg";
  } else if (questProgress === 6) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_chest_qxaunm.jpg";
  } else if (questProgress === 7) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_monster_wt4bwq.jpg";
  } else if (questProgress === 8) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_chest_yncfwd.jpg";
  }

  // set the question and button text
  questionTextEl.textContent = questLog[questProgress].question;
  answerOneEl.textContent = questLog[questProgress].choiceOne;
  answerTwoEl.textContent = questLog[questProgress].choiceTwo;
  answerThreeEl.textContent = questLog[questProgress].choiceThree;
  answerFourEl.textContent = questLog[questProgress].choiceFour;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//TODO: Need to build this out more. So far takes any value and progresses the quest without fighting, but navigation is working for a few turns
function handleChoice() {
  console.log(selectedChoice);
  // first enemy encounter at the start of the dungeon
  if (questProgress === 0) {
    questProgress = 1;
    renderAdventure();
    // first hallway after the boss
  } else if (questProgress === 1) {
    // player chooses left
    if (selectedChoice === "choice-one") {
      questProgress = 4;
      renderAdventure();
      // player chooses right and has 50/50 chance of treasure vs monster
    } else {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = 2;
        renderAdventure();
      } else {
        //Find treasure
        questProgress = 3;
        renderAdventure();
      }
    }
  } else if (questProgress === 4) {
    // player chooses left
    if (selectedChoice === "choice-one") {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = 5;
        renderAdventure();
      } else {
        //Find treasure
        questProgress = 6;
        renderAdventure();
      }
      // player chooses straight and has 50/50 chance of treasure vs monster
    } else {
      randomEncounter = getRandomInt(2);
      if (randomEncounter === 0) {
        //Encounter monster
        questProgress = 7;
        renderAdventure();
      } else {
        //Find treasure
        questProgress = 8;
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
