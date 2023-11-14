import { GET_POKEMONS, GET_DETAIL, GET_TYPE, POST_POKEMON, PAGINATE, GET_BY_NAME, FILTER, RESET, RESET_PAGE } from './ActionTypes';

export const getPokemons = () => {
  return function (dispatch) {
    fetch('http://localhost:3001/pokemons')
    .then(response => response.json())
    .then(data => dispatch({
      type: GET_POKEMONS,
      payload: data
    }))
  }
};

export const getDetail = (id) => {
  return function (dispatch) {
    fetch(`http://localhost:3001/pokemons/${id}`)
    .then(response => response.json())
    .then(data => dispatch({
      type: GET_DETAIL,
      payload: data
    }))
  }
};

export const getTypes = () => {
  return function (dispatch) {
    fetch('http://localhost:3001/types')
    .then(response => response.json())
    .then(data =>  dispatch({
      
      type: GET_TYPE,
      payload: data
    }))
  }
};

export const postPokemon = (newPokemon) => {
  return function (dispatch) {

    fetch('http://localhost:3001/pokemons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPokemon),
    })
    .then((response) => {
      if (response.ok) {
        alert('pokemon created succesfull')
      } else {
        alert('could not be created')
      }
    })
    dispatch({
      type: POST_POKEMON,
    });
  }
};

export const page = (order) => {
  return function (dispatch) {
    dispatch({
      type:PAGINATE,
      payload:order
    })
  }
};

export const getByName = (name) => {
  console.log(name + 'holaaa')
  return function (dispatch) {
    fetch(`http://localhost:3001/pokemons/name?q=${name}`,{
      method: 'GET',
    }) 
    .then((response) =>  { 
      if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
      }
      return response.json()
   })
    .then((data) => {dispatch({
      type: GET_BY_NAME,
      payload: data,
      
    })},
    )
    .catch(error =>{
      console.log(error + 'encontrado')
    })
  }
};

export const pokemonsFilter = (filter) => {
  return function (dispatch) {
    dispatch({
      type:FILTER,
      payload:filter
    })
  }
};

export const resetPokemons = (order) => {
  return function (dispatch) {
    dispatch({
      type:RESET,
      payload:order
    })
  }
};
export const setPageFromBackUp = () => {
  return function (dispatch) {
    dispatch({
      type:RESET_PAGE,
    })
  }
};

