import {GET_POKEMONS, GET_DETAIL, GET_TYPE, POST_POKEMON, PAGINATE} from '../Action/ActionTypes';

let inicialState = {
  pokemons: [],
  pokemosBackUp: [],
  detail: {},
  type:[],
  currentPage:0,

};

//definir las funciones

function Reducer(state=inicialState, action){
  const ITENS_PER_PAGE = 12;
    switch(action.type){
        case GET_POKEMONS:
          return {
            ...state,
            pokemons: [...action.payload].splice(0, ITENS_PER_PAGE),
            pokemosBackUp: action.payload
          };

        case GET_DETAIL:
          return {
            ...state,
            detail: action.payload,
          };

        case GET_TYPE:
          if(!state.type[0]){
            return {
              ...state,
              type: action.payload
            }
          }
          
        case POST_POKEMON:
          return {
            ...state
          }

        case PAGINATE:
          const next_page = state.currentPage +1; //cambia a la pagina 
          const prev_page = state.currentPage -1; // devuelve a la pagina anterior
          // renderisa 12 card por pagina
          const firstPage = action.payload === "next" ? next_page * ITENS_PER_PAGE : prev_page * ITENS_PER_PAGE;

          if(action.payload === "next" && firstPage >= state.pokemosBackUp.length) return state
          else if(action.payload === "prev" && prev_page < 0) return state

          return {
            ...state,
            pokemons: [...state.pokemosBackUp.splice(firstPage, ITENS_PER_PAGE)],
            currentPage: action.payload === 'next'? next_page : prev_page
          }
          
        default:
          return{...state}
    }
};

export default Reducer;