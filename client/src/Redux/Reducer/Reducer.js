import {GET_POKEMONS, GET_DETAIL, GET_TYPE, POST_POKEMON, PAGINATE, GET_BY_NAME, FILTER, RESET} from '../Action/ActionTypes';

let inicialState = {
  page: [], // Para guardar los pokemones de la pagina.
  pokemonsBackUp: [],
  detail: {},
  type:[],
  currentPage:1,
  lastPage: null, // Para guardar la ultima pagina del paginador
  byName:[],
  filteredPokemons:[], // Los pokemones filtrados. Esta es la que se va a usar para renderizar en la vista.
};

//definir las funciones

function Reducer(state=inicialState, action){
 
  const ITENS_PER_PAGE = 12;
  let res = 0;
  let noDecimals = 0;
    switch(action.type){
        case GET_POKEMONS:

          state.pokemonsBackUp = action.payload; // Guardamos los pokemones de la peticion en backup
          state.filteredPokemons = action.payload; // Guardammos lo pokemones en la lista filtrada
          state.page = [...state.filteredPokemons].splice(0, ITENS_PER_PAGE);

          res = state.filteredPokemons.length / ITENS_PER_PAGE;
          noDecimals = parseInt(res);

          state.lastPage = (res > noDecimals) ? noDecimals + 1 : noDecimals;
          
          return { ...state }

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
            page: [...state.pokemonsBackUp].splice(0, ITENS_PER_PAGE),
            currentPage:1,
          }

        case PAGINATE:
          const event = action.payload;

          if (event === 'next') state.currentPage++;
          if (event === 'prev') state.currentPage--;

          const start = (state.currentPage - 1) * ITENS_PER_PAGE;
          const end = start + ITENS_PER_PAGE;
          state.page = [...state.filteredPokemons].slice(start, end);

          return { ...state }

          case GET_BY_NAME:
          return {
            ...state,
            pokemons: [...action.payload],
          };

          case RESET:
            return{
              ...state,
              pokemons: [...state.pokemonsBackUp].splice(0, ITENS_PER_PAGE),
              currentPage:1,
            }

            case FILTER:
              const { cboOrderBy, rdoSort, cboType, rdoSource } = action.payload;

              let list = [...state.pokemonsBackUp];

              // Si viene nombre o ataque en filtro order by.
              if (cboOrderBy !== 'none') {

                // Ordenamos la lista en asc o desc
                list = list.sort((a, b) => {
                  if(rdoSort === "asc") {
                    if(a[cboOrderBy]>b[cboOrderBy]) return 1
                    if(a[cboOrderBy]<b[cboOrderBy]) return -1
                  } else {
                    if(a[cboOrderBy]>b[cboOrderBy]) return -1
                    if(a[cboOrderBy]<b[cboOrderBy]) return 1
                  }
                })
              }

              if (cboType !== 'all') list = list.filter((p) => p.type.includes(cboType));

              if (rdoSource === 'api') list = list.filter((p) => p.isApi);
              if (rdoSource === 'db') list = list.filter((p) => !p.isApi);

              state.currentPage = 1;
              state.filteredPokemons = [...list];
              state.page = state.filteredPokemons.splice(0, ITENS_PER_PAGE);

              res = state.filteredPokemons.length / ITENS_PER_PAGE;
              noDecimals = parseInt(res);

              state.lastPage = (res > noDecimals) ? noDecimals + 1 : noDecimals;
              
              return { ...state }

        default:
          return{
            ...state
          }
    }aqui
};

export default Reducer;