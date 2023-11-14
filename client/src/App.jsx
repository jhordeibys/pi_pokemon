import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Create from './views/FormCreate/FormCreate';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './views/landing/landingPage';
import './App.css';
import {useState} from 'react';


function App() {

  const {pathname} = useLocation();
  const [showPaginator, setShowPaginator] = useState(true)

  return(

    <div className='app'>

      <div>
        {pathname !== '/' && <NavBar setShowPaginator={setShowPaginator}/>}

      </div>

      <div>
        <Routes className='pages'>
        
          <Route path={'/'} element={<LandingPage/>}/>;
          <Route path={'/Home'} element={<Home showPaginator={showPaginator}/>}/>;
          <Route path={'/Detail/:id'} element={<Detail/>}/>;
          <Route path={'/Create'} element={<Create/>}/>;

        </Routes>
      </div>
      
    </div>


  )
  
}

export default App;
