import {GET_POKEMONS, GET_DETAIL, GET_TYPE, POST_POKEMON, PAGINATE, GET_BY_NAME, FILTER, RESET} from '../Action/ActionTypes';

let inicialState = {
  pokemons: [],
  pokemonsBackUp: [],
  detail: {},
  type:[],
  currentPage:0,
  byName:[],
  pokemonsFilters:[],
  filters: false,

};

//definir las funciones

function Reducer(state=inicialState, action){
 
  const ITENS_PER_PAGE = 12;
    switch(action.type){
        case GET_POKEMONS:
          return {
            ...state,
            pokemons: [...action.payload].splice(0, ITENS_PER_PAGE),
            pokemonsBackUp: action.payload
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
            ...state,
            pokemons: [...state.pokemonsBackUp].splice(0, ITENS_PER_PAGE),
            currentPage:0,
            filters: false,
          }

        case PAGINATE:
          const next_page = state.currentPage +1; //cambia a la pagina 
          const prev_page = state.currentPage -1; // devuelve a la pagina anterior
          // renderisa 12 card por pagina
          const firstPage = action.payload === "next" ? next_page * ITENS_PER_PAGE : prev_page * ITENS_PER_PAGE;

          if(state.filters){
            if(action.payload === "next" && firstPage >= state.pokemonsFilters.length) return state
            else if(action.payload === "prev" && prev_page < 0) return state
              return {
                ...state,
                pokemons: [...state.pokemonsFilters].splice(firstPage, ITENS_PER_PAGE),
                currentPage: action.payload === "next"? next_page : prev_page
              }
          };

          if(action.payload === "next" && firstPage >= state.pokemonsBackUp.length) return state
          else if(action.payload === "prev" && prev_page < 0) return state

          return {
            ...state,
            pokemons: [...state.pokemonsBackUp].splice(firstPage, ITENS_PER_PAGE),
            currentPage: action.payload === "next"? next_page : prev_page
          };

          case GET_BY_NAME:
          return {
            ...state,
            pokemons: [...action.payload],
          };

          case RESET:
            return{
              ...state,
              pokemons: [...state.pokemonsBackUp].splice(0, ITENS_PER_PAGE),
              currentPage:0,
              filters: false
            }

            case FILTER:
              // 1. Guardamos el payload.
              const { tipo, origen, selec, orientacion } = action.payload;
              
              if(selec === "Name"){
                let nameSort = [...state.pokemonsBackUp].sort((a, b)=>{
                  if(orientacion === "asc"){
                    if(a.name>b.name) return 1
                    if(a.name<b.name) return -1
                    return 0
                  } else {
                    if(a.name>b.name) return -1
                    if(a.name<b.name) return 1
                    return 0
                  }
                })
                return{
                  ...state,
                  pokemons:[...nameSort].splice(0, ITENS_PER_PAGE),
                  pokemonsBackUp: nameSort,
                  currentPage:0,
                }
              };

              if(selec === "Attack"){
                let attackSort = [...state.pokemonsBackUp].sort((a, b)=>{
                  if(orientacion === "asc"){
                    if(a.attack>b.attack) return 1
                    if(a.attack<b.attack) return -1
                    return 0
                  } else {
                    if(a.attack>b.attack) return -1
                    if(a.attack<b.attack) return 1
                    return 0
                  }
                })
                return{
                  ...state,
                  pokemons:[...attackSort].splice(0, ITENS_PER_PAGE),
                  pokemonsBackUp: attackSort,
                  currentPage:0,
                }
              };

              if(tipo){
                let tipoFilt = [...state.pokemonsBackUp].filter((p)=>{
                  if(origen === "DB"){
                    return p.type.includes(tipo) && p.isApi === false;
                  } else if(origen === "API"){
                    return p.type.includes(tipo) && p.isApi === true;
                  } else {
                    return p.type.includes(tipo);
                  }
                })
                return{
                  ...state,
                  pokemons: [...tipoFilt].splice(0, ITENS_PER_PAGE),
                  pokemonsFilters: tipoFilt,
                  currentPage:0,
                  filters: true,

                }
              }
              console.log(selec + 'holaaaaa1')

          {/* return default de switch principal */}
        default:
          return{
            ...state
          }
    }aqui
};

export default Reducer;