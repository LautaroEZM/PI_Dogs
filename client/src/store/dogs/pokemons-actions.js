import pokemonsSlice from './pokemons-slice';
import PokemonService from '../../service/dogService';

export const pokemonsActions = pokemonsSlice.actions;

export const reset = () => {
  return (dispatch, getState) => {
    dispatch(pokemonsActions.reset());
  };
};

export const searchPokemon = (searchParams) => {
  return async (dispatch, getState) => {
    dispatch(pokemonsActions.setLoading(true));
    const response = await PokemonService.searchPokemon(searchParams);
    dispatch(pokemonsActions.setPokemons(response));
    dispatch(pokemonsActions.setLoading(false));
  };
};

export const getPokemon = (pokemonId) => {
  return async (dispatch, getState) => {
    if (getState().pokemons?.pokemon?.id !== pokemonId) {
      dispatch(pokemonsActions.setLoading(true));
      const response = await PokemonService.getPokemon(pokemonId);
      dispatch(pokemonsActions.setPokemon(response));
      dispatch(pokemonsActions.setLoading(false));
    }
  };
};

export const getPokemons = (pokemonIds) => {
  return async (dispatch, getState) => {
    dispatch(pokemonsActions.setLoading(true));
    const promises = pokemonIds.map((pokemonId) => PokemonService.getPokemon(pokemonId));
    const responses = await Promise.all(promises);
    dispatch(pokemonsActions.setPokemons(responses));
    dispatch(pokemonsActions.setLoading(false));
  };
};
