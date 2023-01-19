
const Challenge = [5,10,15]
const x = Math.floor(Math.random() * 3);
var singleAPI = ""
var monsterName = ""
var monsterLife = ""
var monsterStrength = ""
var monsterDexterity = ""
var monsterIntelligemce = ""


function getAPI() {
    var API = "https://www.dnd5eapi.co/api/monsters/?challenge_rating="+Challenge[x];

   fetch(API)
        .then(async function (response) {

        return response.json();
        })

    .then(function (data) {
        console.log(data)
        var numMonster = data.count
        var monsterIndex = [];
        for (let i=0; i < numMonster; i++){
            var newMonster = data.results[i].index
            monsterIndex.push(newMonster)
        }
           var y = Math.floor(Math.random()*data.count)
           console.log(monsterIndex[y])
           singleAPI = "https://www.dnd5eapi.co/api/monsters/"+monsterIndex[y];
           fetch(singleAPI)
            .then(async function (response) {
            return response.json();
        })
        .then(function (data){
            monsterName = data.name;
            monsterLife = data.hit_points;
            monsterStrength = data.strength;
            monsterDexterity = data.dexterity;
            monsterIntelligemce = data.intelligence
            console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);
        })

        })
}


getAPI();


console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);


