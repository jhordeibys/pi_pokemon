import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, page, getTypes, pokemonsFilter, resetPokemons} from "../../Redux/Action/Action";
import Card from '../../Components/Card/Card';
import './HomeStyle.css'


const Home = () => {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);
  const type = useSelector(state => state.type);

  const [filters, setFilters] = useState({
    tipo: '',
    origen: '',
    selec:'',
    orientacion:'',
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
    dispatch(pokemonsFilter(filters));
  }, [filters])


  const pagination = (e)=> {
    dispatch(page(e.target.name))
  };

  const reset = (e)=> {
    dispatch(resetPokemons(e.target.name))
    setFilters({
      tipo: '',
      origen: '',
      selec:'',
      orientacion:''
    })
  };
  // para mostrar opciones del filtro/orden
  const select =["", "Name", "Attack"]

 
  return (

    <div className="contenedor">
      
      <div className="cont-img">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Imagen" className="imagen"></img>
      </div>

      <div className="reset">
        <button name="reset" onClick={reset}>Reset</button>
      </div>



      <div className="filters">
        <>
        <label> Order </label> 
        <select 
          name="selec"
          onChange={(e)=>filterChange(e)}
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
            name="orientacion"
            checked={filters.orientacion === 'asc'}
            onChange={(e)=>filterChange(e)}
            />
            Asc
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="desc"
            name="orientacion"
            checked={filters.orientacion === 'desc'}
            onChange={(e)=>filterChange(e)}
          />
          Desc
        </label>

        </>
        <br/>

        <>
          <label> Filters </label> 
          <select 
            name="tipo"
            onChange={(e)=>filterChange(e)}
            >
              <option > </option>
              <option value="all">All</option>
              {
              type?.map(el => <option key={el.id} value={el.name}>{el.name}</option>)
              }
          </select>
              {/*radio butons*/}
          <label>

          <input
            type="radio"
            value="ALL"
            name="origen"
            checked={filters.origen === 'ALL'}
            onChange={(e)=>filterChange(e)}
          />
          ALL
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="API"
            name="origen"
            checked={filters.origen === 'API'}
            onChange={(e)=>filterChange(e)}
          />
          API
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="DB"
            name="origen"
            checked={filters.origen === 'DB'}
            onChange={(e)=>filterChange(e)}
          />
          DB
        </label>
      </>
        
      </div>

      <div className="cont-home">

      {pokemons.map((pokemon) => (
        <Card key={`key-${pokemon.id}`} id={pokemon.id} name={pokemon.name} attack={pokemon.attack} image={pokemon.image} type={pokemon.type}/>
      )
      )}

      </div>  

      <div className="button">
        <button name="prev" onClick={pagination}>Prev</button>
   
        <button name="next" onClick={pagination}>Next</button>
      </div>

  </div>
  )
}

export default Home;