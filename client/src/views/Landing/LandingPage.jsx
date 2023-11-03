import './Landing.css';
import React from 'react';
import { NavLink } from 'react-router-dom';



const LandingPage = () => {
  return (

    <div className='landing'>

      <NavLink  to={'/Home'}>
          <button className='button'> HOME </button>
      </NavLink>
      <br/>

    </div>
  )
}

export default LandingPage;