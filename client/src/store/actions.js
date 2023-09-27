import axios from 'axios';
export const GET_DOGS = 'GET_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const SAVE_DOG = 'SAVE_DOG';
export const SET_DOG = 'SET_DOG';

export const ORDER_TOGGLE = 'ORDER_TOGGLE';
export const saveDog = (data) => {
  const endpoint = 'http://localhost:3001/dogs';
  return (dispatch) => {
    axios.post(endpoint, data).then(({ data }) => {
      return dispatch({
        type: 'GET_DOGS',
        payload: data,
      });
    }).catch(error => {
      console.error(error);
      alert('No se pudo agregar el elemento');
    });
  };
};
export const getDogs = () => {
  const endpoint = 'http://localhost:3001/dogs';
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: 'GET_DOGS',
        payload: data,
      });
    });
  };
};

export const searchDogs = (name, temperament, source) => {
  const endpoint = `http://localhost:3001/dogs?name=${name}&temperament=${temperament}&source=${source}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: 'SEARCH_DOGS',
        payload: data,
      });
    });
  };
};

export const getDogByBreedId = (id) => {
  const endpoint = `http://localhost:3001/dogs/${id}`;
  return (dispatch) => {
    axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: 'SET_DOG',
        payload: data,
      });
    });
  };
}

export const setCurrentPage = (pageNumber) => {
  return (dispatch) => {
    return dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: pageNumber,
    });
  };
};

export const toggleForm = () => {
  return (dispatch) => {
    return dispatch({
      type: 'TOGGLE_FORM',
    });
  };
};

export const orderToggle = () => {
  return (dispatch) => {
    return dispatch({
      type: 'ORDER_TOGGLE',
    });
  };
};
