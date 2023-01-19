
const Choice = ["bandit-captain","archmage","assassin",];
const x = Math.floor(Math.random() * 3);





function getAPI() {
    var API = "https://www.dnd5eapi.co/api/monsters/"+Choice[x];

   fetch(API)
        .then(async function (response) {

        return response.json();
        })

    .then(function (data) {
    
        console.log(data)
            var monsterName = data.name;
            var monsterDesc = data.desc
            var monsterLife = data.hit_points;
            var monsterStrength = data.strength;
            var monsterDexterity = data.dexterity;
            var monsterIntelligemce = data.intelligence
            
            console.log(monsterName,monsterDesc,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);
        })
}

getAPI();