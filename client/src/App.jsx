import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Create from './views/FormCreate/FormCreate';
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './views/landing/landingPage';
import './App.css';


function App() {

  const {pathname} = useLocation();

  return(

    <div className='app'>

      <div>
        {pathname !== '/' && <NavBar onSearch=''/*{onSearch}*//>}

      </div>

      <div>
        <Routes className='pages'>
        
          <Route path={'/'} element={<LandingPage/>}/>;
          <Route path={'/Home'} element={<Home/>}/>;
          <Route path={'/Detail/:id'} element={<Detail/>}/>;
          <Route path={'/Create'} element={<Create/>}/>;

        </Routes>
      </div>
      
    </div>


  )
  
}

export default App;
