var userPlayer = "Ravi"

var characterBasic = {
    name:"unknown",
    hp:0,
    strength:0,
    dexterity:0,
    intelligece:0,
}

function createCharacter () {  
}

createCharacter.prototype = characterBasic;

userCreated = new createCharacter();
userCreated.name = userPlayer; // pulled from user input
userCreated.hp = 120; //pulled from user input
userCreated.strength = 20; // pulled from user input
userCreated.dexterity = 20; // pulled from user input
userCreated.intelligence = 20; // pulled from user input

rndEnemy = new createCharacter();
rndEnemy.name = "unknown"; // pulled from API
rndEnemy.hp = 120; //pulled from API
rndEnemy.strength = 20; // pulled from API
rndEnemy.dexterity = 20; // pulled from API
rndEnemy.intelligence = 20; // pulled from API

// var displayHP = function () {
//     var playerUpdateHP = ;// way to display to handlebars

//     var enemyUpdateHP = ;//way to display to handlebars
// }

var userAttck = function(){
    remainHp=rndEnemy.hp-userCreated.strength;
    rndEnemy.hp=remainHp;
    if(rndEnemy.hp<1){
        alert("Great Job!, You have vanquished the Enemy!")
        // add step to restart
    }
    // displayHP();
}

var enemyAttck = function(){
    remainHp=userCreated.hp-rndEnemy.strength;
    userCreated.hp=remainHp;
    if(userCreated.hp<1){
        alert("You have been Slain!, Please begin your Adventure Again!")
        // add step to restart
    }
    // displayHP();
}