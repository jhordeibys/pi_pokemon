const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    life:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    stroke:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    defending:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    speed:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    height:{
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {freezeTableName:true, timestamps:false});
}