const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    weight:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lifeSpan:{
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },{timestamps: false});
};
