import { useState} from 'react';
import { useDispatch} from 'react-redux';
import { getByName } from '../../Redux/Action/Action';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName]= useState('');


  const handleChange = (e)=> {
    setName(e.target.value)
  }
 
  
  const handleSutmit = ()=>{
    dispatch(getByName(name))
    setName('')

  }

      


  return (
    <div>
      <input 
      type='search'
      placeholder='Seach by name'
      onChange={(e)=>handleChange(e)}
      />
      <button 
      type='submit'
      onClick={()=>handleSutmit()}>Search</button>
    </div>
  )
}

export default SearchBar;