import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, page, getTypes, pokemonsFilter, resetPokemons} from "../../Redux/Action/Action";
import Card from '../../Components/Card/Card';
import './HomeStyle.css'


const Home = () => {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.page);
  const type = useSelector(state => state.type);
  const currentPage = useSelector(state => state.currentPage);
  const lastPage = useSelector(state => state.lastPage);
 
  const [filters, setFilters] = useState({
    cboOrderBy: 'none',
    rdoSort: 'asc',
    cboType: 'all',
    rdoSource: 'all'
  });

  const filterChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };


  // Cargamos los pokemons de nuestro backend
  // Cargamos la lista de tipos
  useEffect(() => {
    dispatch(getTypes())
    dispatch(getPokemons());
  }, []);

  useEffect(() => {
    //if (pokemons.length === 0) return;
    dispatch(pokemonsFilter(filters));
  }, [filters])


  const pagination = (e)=> {
    dispatch(page(e.target.name))
  };

  const reset = ()=> {
    //dispatch(resetPokemons(e.target.name))
    setFilters({
      cboOrderBy: 'none',
      rdoSort: 'asc',
      cboType: 'all',
      rdoSource: 'all'
    });
  };
  // para mostrar opciones del filtro/orden
  const select =["none", "name", "attack"]

 
  return (

    <div className="contenedor">
      
      <div className="cont-img">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
          alt="Imagen" 
          className="imagen"
          onClick={reset}
        />
      </div>


      <div className="filters">
        <div className="order">
          <label> Order </label> 
          <select 
            name="cboOrderBy"
            onChange={(e)=>filterChange(e)}
            value={filters.cboOrderBy}
          >
            {
              select?.map(el => <option key={el} value={el}>{el}</option>)
            }
          </select>

          {/*radio butons*/}
          <label>
            <input
              type="radio"
              value="asc"
              name="rdoSort"
              checked={filters.rdoSort === 'asc'}
              onChange={(e)=>filterChange(e)}
              />
              Asc
          </label>
          <br />

          <label>
            <input
              type="radio"
              value="desc"
              name="rdoSort"
              checked={filters.rdoSort === 'desc'}
              onChange={(e)=>filterChange(e)}
            />
            Desc
          </label>

        </div>
       

        <div className="filt">

          <label> Filters </label> 
          <select 
            name="cboType"
            onChange={(e)=>filterChange(e)}
            value={filters.cboType}
          >
  
              <option value="all">all</option>
              {
                type?.map(el => <option key={el.id} value={el.name}>{el.name}</option>)
              }
          </select>
              {/*radio butons*/}

            <label>
              <input
                type="radio"
                value="all"
                name="rdoSource"
                checked={filters.rdoSource === 'all'}
                onChange={(e)=>filterChange(e)}
              />
              all
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="api"
                name="rdoSource"
                checked={filters.rdoSource === 'api'}
                onChange={(e)=>filterChange(e)}
              />
              API
            </label>
            <br />

            <label>
              <input
                type="radio"
                value="db"
                name="rdoSource"
                checked={filters.rdoSource === 'db'}
                onChange={(e)=>filterChange(e)}
              />
              DB
            </label>
        </div>
        
      </div>

      <div className="cont-home">

        { pokemons.length === 0
          ? <p>No hay pokemons con ese filtro</p>
          : pokemons.map((pokemon) => (
            <Card
              key={`key-${pokemon.id}`}
              id={pokemon.id}
              name={pokemon.name}
              attack={pokemon.attack}
              image={pokemon.image}
              type={pokemon.type}
            />
          ))
        }

      </div>  

      <div className="button">
        { currentPage > 1 &&
          <button name="prev" onClick={pagination}>Prev</button>
        }
   
        { currentPage < lastPage &&
          <button name="next" onClick={pagination}>Next</button>
        }
      </div>

  </div>
  )
}

export default Home;