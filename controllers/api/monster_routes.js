 const Choice = "death-dog"

 var monsterName = ""
 var monsterDesc = ""
 var monsterLife = ""
 var monsterDamage = ""

function getAPI() {
    var API = "https://www.dnd5eapi.co/api/monsters/"+Choice;

   fetch(API)
        .then(async function (response) {

        return response.json();
        })

    .then(function (data) {
        console.log(data)
            monsterName = data.name;
            monsterDesc = data.desc;
            monsterLife = data.hit_points;
            monsterDamage = data.strength;

            console.log(monsterName, monsterLife, monsterDamage, monsterDesc);

            // var dropDown2 = document.getElementById("dropdown2");
            // var newli = document.createElement("li");
            // newli.textContent = parkNameList;
            // dropDown2.append(newli);
            // var h2El = document.createElement('h2');
            // h2El.textContent=parkNameList;
            // parksHashMap[parkNameList] = data.data[i];
            
        //     for (let i =0; i < data.id.value; i++){
        // }

    })
}

console.log("test22",monsterName, monsterLife, monsterDamage, monsterDesc);
getAPI();