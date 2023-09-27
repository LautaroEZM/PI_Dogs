const { Dog } = require('../db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAll = async (req, res) => {
  try {
    // Obtener parametros de busqueda
    const name = req.query.name;
    const temperament = req.query.temperament;
    const source = req.query.source;

    // Primero buscar en la base de datos
    let dogsFromDb = await Dog.findAll();

    let response = [];
    for (const dog of dogsFromDb) {
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

    // Filtrar por temperamento si el parametro no esta vacio
    if (temperament) {
      response = response.filter((dog) => {
        if (dog.temperament !== null) {
          return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Filtrar por nombre si el parametro no esta vacio
    if (name) {
      response = response.filter((dog) => {
        if (dog.name !== null) {
          return dog.name.toLowerCase().includes(name.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Si el filtro de origen es internal devolver los resultados de la base de datos
    if (source === 'internal') {
      return res.json(response.sort((a, b) => a.name.localeCompare(b.name)));
    }

    // Si el filtro esta vacio o es api, continuar buscando en la api externa
    const url = name ? `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv` : `https://api.thedogapi.com/v1/breeds?api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv`;

    try {
      const { data } = await axios.get(url);

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
    } catch (error) {
      // Solo loggear el error
      console.log(error);
    }

    // Filtrar resultados de la api por temperamento si el parametro no esta vacio
    if (temperament) {
      response = response.filter((dog) => {
        if (dog.temperament) {
          return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Filtrar resultados de la api por nombre si el parametro no esta vacio
    if (name) {
      response = response.filter((dog) => {
        if (dog.name !== null) {
          return dog.name.toLowerCase().includes(name.toLowerCase());
        } else {
          return false;
        }
      });
    }

    // Filtrar solo resultados de la api si source es external
    if (source === 'external') {
      response = response.filter((dog) => dog.source === 'external');
    }

    // Retornar los resultados ordenados alfabeticamente
    return res.json(response.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'No se puede obtener la información de la API de los perros.',
      message: error.message,
    });
  }
};

const getByName = async (req, res) => {
  try {
    // Obtener el parametro
    const name = req.query.name;

    // Validar que el parametro no este vacio
    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    // Primero obtener el item de la DB
    const dog = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        }
      }
    });

    // Si existe en la DB devolverlo
    if (dog) {
      return res.json({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        lifeSpan: dog.lifeSpan,
        temperament: dog.temperament ?? null,
        source: 'internal',
      })
    } else {
      // Si no existe en la DB buscar en la api
      const url = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv`;
      try {
        const { data } = await axios.get(url);

        if (data?.length) {
          const dog = data.find(d => d.name.toLowerCase() === name.toLowerCase())
          if (dog) {
            return res.json({
              id: dog.id,
              name: dog.name,
              image: dog.image?.url,
              height: dog.height.metric,
              weight: dog.weight.metric,
              lifeSpan: dog.life_span,
              temperament: dog.temperament,
              source: 'external',
            })
          }
        }
      } catch (error) {
        res.status(500).json({
          error: 'No se puede obtener la información de la API de los perros.',
          message: error.message,
        });
      }
    }

    res.status(404).json({ error: 'No se pudo encontrar ningun perro con ese nombre' });
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar por nombre',
      message: error.message,
    });
  }
};

const getByBreedId = async (req, res) => {
  try {
    // Obtener el parametro breedId
    const breedId = req.params.breedId;

    // Validar que el parametro no este vacio
    if (!breedId) {
      return res.status(400).json({ error: 'El id es requerido' });
    }

    const isLocal = isNaN(Number(breedId));

    if (isLocal) {
      // Primero obtener el item de la DB
      const dog = await Dog.findOne({
        where: {
          id: breedId
        }
      });

      // Si existe en la DB devolverlo
      return dog ? res.json({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        height: dog.height,
        weight: dog.weight,
        lifeSpan: dog.lifeSpan,
        temperament: dog.temperament ?? null,
        source: 'internal',
      }) : res.status(404).json({ error: 'No se pudo encontrar ningun perro con ese id' });
    } else {
      // Si el id es un numero buscar en la api
      const url = `https://api.thedogapi.com/v1/breeds/${breedId}&api_key=live_xCLelY58Rl0IVosZjI9PB2mJVwfSUT0cbiBr2Vui835GYBIOQ47T6qOmn6GVGjSv`;
      try {
        const { data } = await axios.get(url);

        if (data) {
            return res.json({
              id: data.id,
              name: data.name,
              image: data.reference_image_id ? `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg` : null,
              height: data.height.metric,
              weight: data.weight.metric,
              lifeSpan: data.life_span,
              temperament: data.temperament,
              source: 'external',
            })
          }
      } catch (error) {
        res.status(500).json({
          error: 'No se puede obtener la información de la API de los perros.',
          message: error.message,
        });
      }
    }

    res.status(404).json({ error: 'No se pudo encontrar ningun perro con ese id' });
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar por id',
      message: error.message,
    });
  }
};

const createDog = async (req, res) => {
  try {
    const data = req.body;
    await Dog.create({
      id: uuidv4(),
      ...data,
    });

    // Retornar todos los elementos actualizados
    return getAll(req, res);
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
