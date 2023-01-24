// Hooks to the UI
const answerButtonsEl = document.querySelector(".choiceButtons");
const combatButtonsEl = document.querySelector(".combatButtons");
const questionTextEl = document.querySelector("#question-text");
const answerOneEl = document.querySelector("#choice-one");
const answerTwoEl = document.querySelector("#choice-two");
const answerThreeEl = document.querySelector("#choice-three");
const answerFourEl = document.querySelector("#choice-four");
const combatOneEl = document.querySelector("#combat-one");
const combatTwoEl = document.querySelector("#combat-two");
const combatThreeEl = document.querySelector("#combat-three");
const combatFourEl = document.querySelector("#combat-four");
const mapEl = document.querySelector("#dungeon-map");
const heroHealthEl = document.querySelector("#hero-health");
const enemyHealthEl = document.querySelector("#enemy-health");

const Challenge = [5, 10, 15];

// const Challenge = [5];
const x = Math.floor(Math.random() * 3);

// Initialize hero stats before they are pulled from db fetch
let heroX = "";
// let heroAttack = 0;
// let heroHp = 0;
// let heroMana = 0;

let monsterX = "";
// var monsterLife = 0;
// var monsterStrength = 0;
// var monsterDexterity = 0;
// var monsterIntelligence = 0;

var monsterIndex = [];

//Quest state variable
let questProgress = 0;
let room1Complete = false;
let room2Complete = false;
let room3Complete = false;
let room4Complete = false;
let room5Complete = false;
let randomEncounter = 0;

// Basic adventure options
const questLog = [
  {
    // Dungeon start
    question: "You've entered a dungon... There's a monster ahead.",
    choiceOne: "Fight",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "dungeon-start",
  },
  {
    // Room 1 (first room) after monster is defeated
    question: "You won the fight! Which way do you want to go next?",
    choiceOne: "East",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-1-monster-defeated",
  },
  {
    // Room 1 already cleared
    question: "Room already cleared!",
    choiceOne: "Choose Another Route ",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-1-cleared",
  },
  {
    // First hall crossing
    question: "You continue down the hall. Which direction do you go next?",
    choiceOne: "West",
    choiceTwo: "North",
    choiceThree: "East",
    choiceFour: "-",
    search: "first-crossing",
  },
  {
    // Main path crossing in the middle
    question: "You stand at the middle of a hall with paths branching in all directions. Which direction do you go next?",
    choiceOne: "West",
    choiceTwo: "North",
    choiceThree: "East",
    choiceFour: "South",
    search: "main-crossing",
  },
  {
    // Last hall crossing next to final boss room
    question: "You continue down the hall. Which direction do you go next?",
    choiceOne: "West",
    choiceTwo: "South",
    choiceThree: "East",
    choiceFour: "-",
    search: "final-crossing",
  },
  {
    // Last hall crossing next to final boss room
    question: "You are not prepared to take on the horror that awaits. You need to explore the rest of the dungeon first.",
    choiceOne: "Choose Another Route",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "boss-room-not-ready",
  },
  {
    // Room 2 (western) if monster is encountered
    question: "You head down to the end of the western hall and enter the room. A monster appears!",
    choiceOne: "Fight",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-monster",
  },
  {
    // Room 2 (western) after monster is defeated
    question: "You won the fight! Which way do you go next?",
    choiceOne: "East",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-monster-defeated",
  },
  {
    // Room 2 (western) if treasure is found
    question: "You head down to the end of the western hall and enter the room. The room is clear of danger. You find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-treasure",
  },
  {
    // Room 2 (western) after treasure is collected
    question: "You finished collecting your treasure and gained 20 hit points, which way do you go next?",
    choiceOne: "East",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-treasure-collected",
  },
  {
    // Room 2 already cleared
    question: "Room already cleared!",
    choiceOne: "Choose Another Route",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-2-cleared",
  },
  {
    // Room 3 (northern) if monster is encountered
    question: "You head down to the end of the northern hall and enter the room. A monster appears!",
    choiceOne: "Fight",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-monster",
  },
  {
    // Room 3 (northern) after monster is defeated
    question: "You won the fight! Which way do you go next?",
    choiceOne: "South",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-monster-defeated",
  },
  {
    // Room 3 (northern) if treasure is found
    question: "You head to the end of the northern hallway and enter the room. The room is clear of danger. You find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-treasure",
  },
  {
    // Room 3 (northern) after treasure is collected
    question: "You finished collecting your treasure and gained 20 hit points, which way do you go next?",
    choiceOne: "South",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-treasure-collected",
  },
  {
    // Room 3 already cleared
    question: "Room already cleared!",
    choiceOne: "Choose Another Route ",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-3-cleared",
  },
  {
    // Room 4 (bottom right corner) if monster is encountered
    question: "You continue down the hall and enter the room. A monster appears!",
    choiceOne: "Fight",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-monster",
  },
  {
    // Room 4 (bottom right corner) after monster is defeated
    question: "You won the fight! Which way do you go next?",
    choiceOne: "West",
    choiceTwo: "North",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-monster-defeated",
  },
  {
    // Room 4 (bottom right corner) if treasure is found
    question: "You continue down the hall and enter the room. This room is clear of danger. You find treasure!",
    choiceOne: "Collect Treasure",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-treasure",
  },
  {
    // Room 4 (bottom right corner) after treasure is collected
    question: "You finished collecting your treasure and gained 20 hit points, which way do you go next?",
    choiceOne: "West",
    choiceTwo: "North",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-treasure-collected",
  },
  {
    // Room 4 already cleared, checking from first crossing
    question: "Room already cleared!",
    choiceOne: "Choose Another Route ",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-cleared-first",
  },
  {
    // Room 4 already cleared, checking from final crossing
    question: "Room already cleared!",
    choiceOne: "Choose Another Route ",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-4-cleared-final",
  },
  {
    // Room 5 (final room) monster
    question: "You continue down the hall and enter the room. A monster appears!",
    choiceOne: "Fight",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-5-monster",
  },
  {
    // Room 5 (final room) after monster is defeated
    question: "You win! Please refresh the game to play again.",
    choiceOne: "-",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "room-5-monster-defeated",
  },
  {
    // If Defeated
    question: "You Died! Please refresh the game to try again.",
    choiceOne: "-",
    choiceTwo: "-",
    choiceThree: "-",
    choiceFour: "-",
    search: "hero-defeated",
  },
];

// used in get request to look up the hero's initial stats
const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
// Gets the Hero's data from our db
async function getHero() {
  await fetch(`/api/heroes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((heroData) => {
      heroX = new Character(heroData.name, heroData.attack, heroData.hitPoints, heroData.mana);
      // heroName = heroData.name;
      // heroAttack = heroData.attack;
      // heroHp = heroData.hitPoints;
      // heroMana = heroData.mana;
      console.log("Hero has been defined");

      heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getEnemy() {
  var API = "https://www.dnd5eapi.co/api/monsters/?challenge_rating=" + Challenge[x];

  await fetch(API)
    .then(async function (response) {
      return response.json();
    })
    .then(async function (data) {
      console.log(data);
      var numMonster = data.count;
      // var monsterIndex = [];
      for (let i = 0; i < numMonster; i++) {
        var newMonster = data.results[i].index;
        monsterIndex.push(newMonster);
      }
      var y = Math.floor(Math.random() * data.count);
      singleAPI = "https://www.dnd5eapi.co/api/monsters/" + monsterIndex[y];
      await fetch(singleAPI)
        .then(async function (response) {
          return response.json();
        })
        .then(function (data) {
          monsterX = new Character(data.name, data.hit_points, data.strength, data.intelligence);
          enemyHealthEl.textContent = "Enemy Health: " + monsterX.hitpoints;
          enemyHealthEl.style.display = "block";
          // monsterLife = data.hit_points;
          // monsterStrength = data.strength;
          // monsterDexterity = data.dexterity;
          // monsterIntelligence = data.intelligence;
          // console.log(monsterName, monsterLife, monsterStrength, monsterDexterity, monsterIntelligence);
        });
      // console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);
      // updateQuestLog();
      renderAdventure();
    });
}

// Update question text with monsters from API
// function updateQuestLog() {
//   questLog[findIndex("dungeon-start")].question = `You've entered a dungon... There's a ${monsterIndex[0]} ahead!`;
//   questLog[findIndex("room-2-monster")].question = `You head to the end of the western hall and enter the room. A ${monsterIndex[1]} appears!`;
//   questLog[findIndex("room-3-monster")].question = `You head to the end of the northern hall and enter the room. A ${monsterIndex[2]} appears!`;
//   questLog[findIndex("room-4-monster")].question = `You continue down the hall and enter the room. A ${monsterIndex[3]} appears!`;
// }

// This is our init function to start the game and call the function to get the Hero's initial stats.
// Check the web browsers console log to see the stats printed.
const startGame = async () => {
  getHero();
  // this will load the answer options
  renderAdventure();

  // getEnemy();

  combatButtonsEl.addEventListener("click", function (event) {
    var buttonClicked = event.target;
    if (buttonClicked.matches("button")) {
      selectedChoice = buttonClicked.id;
      getEnemy();
      beginFight();
    }
  });
};

// renders the question and button text on the front end based on the array and quest progress value
function renderAdventure() {
  //set background images
  if (questProgress === findIndex("first-crossing")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674191722/newDND/hero_in_bottom_hallway_ta05ye.jpg";
  } else if (questProgress === findIndex("room-4-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_monster_te1lur.jpg";
  } else if (questProgress === findIndex("room-4-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Blue_route_chest_jmvkdy.jpg";
  } else if (questProgress === findIndex("main-crossing")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674191722/newDND/hero_in_hallway_votxhf.jpg";
  } else if (questProgress === findIndex("room-2-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_monster_kesar5.jpg";
  } else if (questProgress === findIndex("room-2-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_red_route_chest_qxaunm.jpg";
  } else if (questProgress === findIndex("room-3-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_monster_wt4bwq.jpg";
  } else if (questProgress === findIndex("room-3-treasure")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013840/newDND/2nd_blue_route_chest_yncfwd.jpg";
  } else if (questProgress === findIndex("final-crossing")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674191722/newDND/hero_in_right_hallway_dxe5g4.jpg";
  } else if (questProgress === findIndex("room-5-monster")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Final_Boss_flhtev.jpg";
  } else if (questProgress === findIndex("room-5-monster-defeated")) {
    mapEl.src = "https://res.cloudinary.com/dfyvcni4b/image/upload/v1674013842/newDND/Congratulations_rdyfgl.jpg";
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

function handleChoice() {
  /////////////////////////////////////////////////////
  // DUNGEON START
  /////////////////////////////////////////////////////
  // first enemy encounter at the start of the dungeon
  if (questProgress === 0) {
    questProgress = findIndex("room-1-monster-defeated");
    room1Complete = true;
    renderAdventure();
  } // Room 2 after fight with monster
  else if (questProgress === findIndex("room-1-monster-defeated")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("first-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // FIRST CROSSING
  /////////////////////////////////////////////////////
  else if (questProgress === findIndex("first-crossing")) {
    // player chooses west
    if (selectedChoice === "choice-one" && room1Complete === true) {
      questProgress = findIndex("room-1-cleared");
      renderAdventure();
      // player chooses east and has 50/50 chance of treasure vs monster
    }
    // player chooses north
    else if (selectedChoice === "choice-two") {
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
    // player chooses east and has 50/50 chance of treasure vs monster
    else if (selectedChoice === "choice-three") {
      if (room4Complete) {
        questProgress = findIndex("room-4-cleared-first");
        renderAdventure();
      } else {
        randomEncounter = getRandomInt(2);
        if (randomEncounter === 0) {
          //Encounter monster
          questProgress = findIndex("room-4-monster");
          renderAdventure();
          answerButtonsEl.style.display = "none";
          combatButtonsEl.style.display = "block";
        } else {
          //Find treasure
          questProgress = findIndex("room-4-treasure");
          renderAdventure();
        }
      }
    }
  }
  // If room 1 is cleared, return back to first crossing screen
  else if (questProgress === findIndex("room-1-cleared")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("first-crossing");
      renderAdventure();
    }
  }
  // If room 4 is cleared, return back to first crossing screen
  else if (questProgress === findIndex("room-4-cleared-first")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("first-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // MAIN CROSSING
  /////////////////////////////////////////////////////
  else if (questProgress === findIndex("main-crossing")) {
    // player chooses west
    if (selectedChoice === "choice-one") {
      // checks if room has been completed already
      if (room2Complete === true) {
        questProgress = findIndex("room-2-cleared");
        renderAdventure();
      } else {
        randomEncounter = getRandomInt(2);
        if (randomEncounter === 0) {
          //Encounter monster
          questProgress = findIndex("room-2-monster");
          renderAdventure();
          answerButtonsEl.style.display = "none";
          combatButtonsEl.style.display = "block";
        } else {
          //Find treasure
          questProgress = findIndex("room-2-treasure");
          renderAdventure();
        }
      }
    }
    // player chooses north and has 50/50 chance of treasure vs monster
    else if (selectedChoice === "choice-two") {
      // checks if room is already cleared
      if (room3Complete) {
        questProgress = findIndex("room-3-cleared");
        renderAdventure();
      }
      // if room is not cleared
      else {
        randomEncounter = getRandomInt(2);
        if (randomEncounter === 0) {
          //Encounter monster
          questProgress = findIndex("room-3-monster");
          renderAdventure();
          answerButtonsEl.style.display = "none";
          combatButtonsEl.style.display = "block";
        } else {
          //Find treasure
          questProgress = findIndex("room-3-treasure");
          renderAdventure();
        }
      }
    }
    // player chooses east
    else if (selectedChoice === "choice-three") {
      questProgress = findIndex("final-crossing");
      renderAdventure();
    }
    // player chooses south
    else if (selectedChoice === "choice-four") {
      questProgress = findIndex("first-crossing");
      renderAdventure();
    }
  } // If room 2 is cleared, return back to main crossing screen
  else if (questProgress === findIndex("room-2-cleared")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  } // If room 3 is cleared, return back to main crossing screen
  else if (questProgress === findIndex("room-3-cleared")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // FINAL CROSSING
  /////////////////////////////////////////////////////
  else if (questProgress === findIndex("final-crossing")) {
    // player chooses west
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("main-crossing");
      renderAdventure();
      // player chooses east and has 50/50 chance of treasure vs monster
    }
    // player chooses south
    else if (selectedChoice === "choice-two") {
      if (room4Complete) {
        questProgress = findIndex("room-4-cleared-final");
        renderAdventure();
      } else {
        randomEncounter = getRandomInt(2);
        if (randomEncounter === 0) {
          //Encounter monster
          questProgress = findIndex("room-4-monster");
          renderAdventure();
          answerButtonsEl.style.display = "none";
          combatButtonsEl.style.display = "block";
        } else {
          //Find treasure
          questProgress = findIndex("room-4-treasure");
          renderAdventure();
        }
      }
    }
    // player chooses east
    else if (selectedChoice === "choice-three") {
      // require all rooms being complete before entering the final boss room
      if (room1Complete && room2Complete && room3Complete && room4Complete) {
        questProgress = findIndex("room-5-monster");
        renderAdventure();
        answerButtonsEl.style.display = "none";
        combatButtonsEl.style.display = "block";
      } else {
        questProgress = findIndex("boss-room-not-ready");
        renderAdventure();
      }
    }
  }
  // If room 4 is cleared, return back to final crossing screen
  else if (questProgress === findIndex("room-4-cleared-final")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("final-crossing");
      renderAdventure();
    }
  }
  // If player tries to enter the boss room when they haven't cleared all other rooms yet
  else if (questProgress === findIndex("boss-room-not-ready")) {
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("final-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // ROOM 2
  /////////////////////////////////////////////////////
  // Room 2 fight with monster
  else if (questProgress === findIndex("room-2-monster")) {
    if (selectedChoice === "combat-one") {
      questProgress = findIndex("room-2-monster-defeated");
      renderAdventure();
    }
  }
  // Room 2 after fight with monster
  else if (questProgress === findIndex("room-2-monster-defeated")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room2Complete = true;
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  }
  // Room 2 treasure collected
  else if (questProgress === findIndex("room-2-treasure")) {
    heroX.hitpoints = heroX.hitpoints + 20;
    heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("room-2-treasure-collected");
      renderAdventure();
    }
  }
  // Room 2 after treasure collected
  else if (questProgress === findIndex("room-2-treasure-collected")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room2Complete = true;
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // ROOM 3
  /////////////////////////////////////////////////////
  // Room 3 fight with monster
  else if (questProgress === findIndex("room-3-monster")) {
    if (selectedChoice === "combat-one") {
      questProgress = findIndex("room-3-monster-defeated");
      renderAdventure();
    }
  } // Room 3 after fight with monster
  else if (questProgress === findIndex("room-3-monster-defeated")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room3Complete = true;
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  }
  // Room 3  treasure collected
  else if (questProgress === findIndex("room-3-treasure")) {
    heroX.hitpoints = heroX.hitpoints + 20;
    heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("room-3-treasure-collected");
      renderAdventure();
    }
  }
  // Room 3 after treasure collected
  else if (questProgress === findIndex("room-3-treasure-collected")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room3Complete = true;
      questProgress = findIndex("main-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // ROOM 4
  /////////////////////////////////////////////////////
  // Room 4 if fight with monster
  else if (questProgress === findIndex("room-4-monster")) {
    if (selectedChoice === "combat-one") {
      questProgress = findIndex("room-4-monster-defeated");
      renderAdventure();
    }
  }
  // Room 4 after fight with monster
  else if (questProgress === findIndex("room-4-monster-defeated")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room4Complete = true;
      questProgress = findIndex("first-crossing");
      renderAdventure();
    } else {
      // will prevent the player from returning to this room
      room4Complete = true;
      questProgress = findIndex("final-crossing");
      renderAdventure();
    }
  }
  // Room 4 collect treasure
  else if (questProgress === findIndex("room-4-treasure")) {
    heroX.hitpoints = heroX.hitpoints + 20;
    heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
    if (selectedChoice === "choice-one") {
      questProgress = findIndex("room-4-treasure-collected");
      renderAdventure();
    }
  } // Room 4 after treasure collected
  else if (questProgress === findIndex("room-4-treasure-collected")) {
    if (selectedChoice === "choice-one") {
      // will prevent the player from returning to this room
      room4Complete = true;
      questProgress = findIndex("first-crossing");
      renderAdventure();
    } else {
      // will prevent the player from returning to this room
      room4Complete = true;
      questProgress = findIndex("final-crossing");
      renderAdventure();
    }
  }
  /////////////////////////////////////////////////////
  // ROOM 5
  /////////////////////////////////////////////////////
  // Room 5 fight with monster
  else if (questProgress === findIndex("room-5-monster")) {
    if (selectedChoice === "combat-one") {
      questProgress = findIndex("room-5-monster-defeated");
      answerButtonsEl.style.display = "none";
      renderAdventure();
    }
  }
}

class Character {
  constructor(name, hitpoints, strength, intelligence) {
    this.name = name;
    this.hitpoints = hitpoints;
    this.strength = strength;
    this.intelligence = intelligence;
  }
  displayHealth() {
    console.log(`${this.name} has ${this.hitpoints} health left`);
  }

  hasDied() {
    if (this.hitpoints <= 0) {
      console.log(`${this.name} has lost all health and has died!`);
      return true;
    }
    return false;
  }

  attack(opponent) {
    opponent.hitpoints -= this.strength;
  }
}

// var newHero = new Character(heroName, heroHp, heroAttack, heroMana);
// var newMonster = new Character(monsterName, monsterLife, monsterStrength, monsterIntelligence);
let heroTurn = true;

function beginFight() {
  const fight = setInterval(() => {
    console.log(heroX, monsterX);
    if (heroX.hasDied() || monsterX.hasDied()) {
      if (heroX.hasDied()) {
        combatButtonsEl.style.display = "none";
        heroHealthEl.textContent = "Hero Health: Died";
        questProgress = findIndex("hero-defeated");
        renderAdventure();
      } else if (monsterX.hasDied()) {
        enemyHealthEl.textContent = "Enemy Health: Died";
        answerButtonsEl.style.display = "block";
        combatButtonsEl.style.display = "none";
        enemyHealthEl.style.display = "none";
        handleChoice();
      }
      clearInterval(fight);
    } else if (heroTurn) {
      heroX.attack(monsterX);
      monsterX.displayHealth();
      heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
      enemyHealthEl.textContent = "Enemy Health: " + monsterX.hitpoints;
    } else {
      monsterX.attack(heroX);
      heroX.displayHealth();
      heroHealthEl.textContent = "Hero Health: " + heroX.hitpoints;
      enemyHealthEl.textContent = "Enemy Health: " + monsterX.hitpoints;
    }
    heroTurn = !heroTurn;
  }, 2000);
}

// // Event Listeners
answerButtonsEl.addEventListener("click", function (event) {
  var buttonClicked = event.target;

  if (buttonClicked.matches("button")) {
    selectedChoice = buttonClicked.id;
    handleChoice();
  }
});

// Calls the init function
startGame();
