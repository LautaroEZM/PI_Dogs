const { Dog } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAll = async (req, res) => {
  try {
    const temperament = req.query.temperament;
    const result = await getAllDogs();

    if (temperament) {
      const filtered = result.filter((dog) => {
        if (dog.temperament !== null) {
          return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
        } else {
          return false;
        }
      });

      res.json(filtered);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      error: 'No se puede obtener la información de la API de los perros',
      message: error.message,
    });
  }
};
const getAllDogs = async () => {
  try {
    const dogFromDb = await Dog.findAll();
    const { data } = await axios.get(
      'https://api.thedogapi.com/v1/breeds?api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv',
    );
    let response = [];
    for (const dog of dogFromDb) {
      response.push({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        lifeSpan: dog.lifeSpan,
        temperament: dog.temperament ?? null,
        source: 'internal',
      });
    }

    if (data?.length) {
      for (const dogDetail of data) {
        response.push({
          id: dogDetail.id,
          name: dogDetail.name,
          image: dogDetail.image.url,
          height: dogDetail.height.metric,
          weight: dogDetail.weight.metric,
          lifeSpan: dogDetail.life_span,
          temperament: dogDetail.temperament ?? null,
          source: 'external',
        });
      }
    }

    return response;
  } catch (error) {
    console.error('No puede accederse a los datos.');
    throw error;
  }
};

const getByBreedId = async (req, res) => {
  try {
    console.log('getByBreedId', req.params);
    const breedId = Number(req.params.breedId);
    const isLocal = isNaN(breedId);
    console.log({ breedId, isLocal });
    if (isLocal) {
      // Si existe en la base, retornar el de la base
      const dogFromDb = await Dog.findOne({
        where: {
          id: breedId,
        },
      });
      if (!dogFromDb) return res.status(404).json({ message: 'El perro ingresado no se ha encontrado.' });
      res.json(dogFromDb);
    } else {
      // Sino buscar en la api externa
      try {
        const { data } = await axios.get(
          `https://api.thedogapi.com/v1/breeds/${breedId}?api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv`,
        );

        if (!data) {
          res.status(404).json({ message: 'El perro con el id enviado no existe 1.' });
        }

        res.json({
          id: data.id,
          name: data.name,
          image: data.image.url,
          height: data.height.metric,
          weight: data.weight.metric,
          lifeSpan: data.lifeSpan,
          temperament: data.temperament,
          source: 'external',
        });
      } catch (error) {
        res.status(404).json({ message: 'El perro con el id enviado no existe 2.' });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: 'No se puede obtener la información de la API de los perros.',
      message: error.message,
    });
  }
};

const getByName = async (req, res) => {
  try {
    const name = req.query.name;
    const temperament = req.query.temperament;
    if (!name) {
      const result = await getAllDogs();
      if (temperament) {
        const filtered = result.filter((dog) => {
          if (dog.temperament !== null) {
            return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
          } else {
            return false;
          }
        });

        res.json(filtered);
      } else {
        res.json(result);
      }
    } else {
      try {
        const response = [];
        // Si existe en la base, retornar el de la base
        const dogs = await Dog.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        console.log(dogs);

        for (const dog of dogs) {
          response.push({
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            lifeSpan: dog.lifeSpan,
            temperament: dog.temperament ?? null,
            source: 'internal',
          });
        }
        // Sino buscar en la api externa

        const url = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv`;

        console.log('test 1', url);
        const { data } = await axios.get(url);
        console.log('test 2', data);
        if (data?.length) {
          for (const dogDetail of data) {
            response.push({
              id: dogDetail.id,
              name: dogDetail.name,
              image: dogDetail.image?.url,
              height: dogDetail.height.metric,
              weight: dogDetail.weight.metric,
              lifeSpan: dogDetail.life_span,
              temperament: dogDetail.temperament,
              source: 'external',
            });
          }
        }
        console.log(response);
        if (temperament) {
          const filtered = response.filter((dog) => {
            if (dog.temperament !== null) {
              return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
            } else {
              return false;
            }
          });

          res.json(filtered);
        } else {
          res.json(response);
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'El perro con el id enviado no existe.' });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: 'No se puede obtener la información de la API de los perros.',
      message: error.message,
    });
  }
};

const createDog = async (req, res) => {
  try {
    const data = req.body;
    const record = await Dog.create({
      id: uuidv4(),
      ...data,
    });

    if (record) {
      res.json(record);
    }
  } catch (error) {
    console.error('Hubo un error al crear el perro');
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

module.exports = {
  getAll,
  getByBreedId,
  getByName,
  createDog,
};
