const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
