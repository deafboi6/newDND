const router = require("express").Router();
const { Monster } = require("../../models");
// const {fetch} = require("node-fetch");

// import router from "./index.js"
// import {Monster} from "../../models"
// import fetch from 'node-fetch'

router.post("/", async (req, res) => {
    try {
      const MonsterData = await Monster.create({
        monster_name: req.body.name,
        monster_description: req.body.desc,
        monster_life: req.body.hitpoints,
        monster_strength: req.body.strength,
        monster_dexterity: req.body.dexterity,
        monster_intelligence: req.body.intelligence,
      });
      console.log(MonsterData);
      req.session.save(() => {
        res.status(200).json(MonsterData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//   const Challenge = [5,10,15]
//   const x = Math.floor(Math.random() * 3);
//   var singleAPI = ""
//   var monsterName = ""
//   var monsterLife = ""
//   var monsterStrength = ""
//   var monsterDexterity = ""
//   var monsterIntelligemce = ""
  
  
//   function getAPI() {
//       var API = "https://www.dnd5eapi.co/api/monsters/?challenge_rating="+Challenge[x];
  
//      fetch(API)
//           .then(async function (response) {
  
//           return response.json();
//           })
  
//       .then(function (data) {
//           console.log(data)
//           var numMonster = data.count
//           var monsterIndex = [];
//           for (let i=0; i < numMonster; i++){
//               var newMonster = data.results[i].index
//               monsterIndex.push(newMonster)
//           }
//              var y = Math.floor(Math.random()*data.count)
//              singleAPI = "https://www.dnd5eapi.co/api/monsters/"+monsterIndex[y];
//              fetch(singleAPI)
//               .then(async function (response) {
//               return response.json();
//           })
//           .then(function (data){
//               monsterName = data.name;
//               monsterLife = data.hit_points;
//               monsterStrength = data.strength;
//               monsterDexterity = data.dexterity;
//               monsterIntelligemce = data.intelligence
//               console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);
//           })
//           console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);   
          
        //   router.post("/", async (data, res) => {
        //       try {
        //         const dbMonsterData = await Monster.create({
        //           monster_name: data.name,
        //           monster_description: data.desc,
        //           monster_life: data.hit_points,
        //           monster_strength: data.strength,
        //           monster_dexterity: data.dexterity,
        //           monster_intelligence: data.intelligence,
        //         });
        //         console.log(dbMonsterData);
        //         req.session.save(() => {
        //           res.status(200).json(dbMonsterData);
        //         });
        //       } catch (err) {
        //         console.log(err);
        //         res.status(500).json(err);
        //       }
        //     });
//           })
//   }
  
  
//   getAPI();
  
  
//   console.log(monsterName,monsterLife,monsterStrength,monsterDexterity,monsterIntelligemce);

module.exports = router;