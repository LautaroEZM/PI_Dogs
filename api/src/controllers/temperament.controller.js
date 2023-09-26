const { Temperament } = require("../db");
const axios = require("axios");

const getAll = async (req, res) => {
  try {
    const result = await Temperament.findAll();
    if (result.length) {
      res.json(result);
    } else {
     res.json([]);
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener tipos",
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
};
