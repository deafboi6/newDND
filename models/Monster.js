const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// JS file to create Category Model
class Monster extends Model{}

Category.init({

    monster_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    monster_description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    monster_life:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
        unique:true,
        validate:{
            isDecimal:true
        }
    },
    monster_strength:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
        unique:true,
        validate:{
            isDecimal:true
        }
    },
    monster_dexterity:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
        unique:true,
        validate:{
            isDecimal:true
        }
    },
    monster_intelligence:{
        type:DataTypes.DECIMAL(8,2),
        allowNull:false,
        unique:true,
        validate:{
            isDecimal:true
        }
    },
},
{
    sequelize,
});

module.exports=Monster