import React from 'react';
import { NavLink} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './NavBarStyle.css';

const NavBar = ({setShowPaginator}) => {



  return (
    <div className='NavBar'>

      <div className='NavBar-img-logo'>
        <NavLink to='/'>
          <img 
            src='https://falabella.scene7.com/is/image/FalabellaPE/115848679_1?wid=800&hei=800&qlt=70'       
            alt='logo_pokemons'
          /> 
        </NavLink>
        <br/>
        <SearchBar setShowPaginator={setShowPaginator}/>

      </div>

      <div className='buttons'>
        <div>
          <NavLink to='/Create'><button> Create Pokemon </button></NavLink>
        </div>
        <br/>
        <div>
          <NavLink to='/Home'><button> Back </button></NavLink>
        </div>      
        
      </div>

    </div>
  )
}

export default NavBar;