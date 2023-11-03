import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, page } from "../../Redux/Action/Action";
import Card from '../../Components/Card/Card';
import './HomeStyle.css'


const Home = () => {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);

  useEffect(() => {

    dispatch(getPokemons())

  }, []);


  const pagination = (e)=> {
    dispatch(page(e.target.name))
  };

  return (

    <div className="contenedor">

      <div className="cont-home">

      {pokemons.map((pokemon) => (
        <Card key={`key-${pokemon.id}`} id={pokemon.id} name={pokemon.name} image={pokemon.image}/>
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