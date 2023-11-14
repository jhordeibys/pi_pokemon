import { useState} from 'react';
import { useDispatch} from 'react-redux';
import { getByName, setPageFromBackUp } from '../../Redux/Action/Action';

const SearchBar = ({setShowPaginator}) => {
  const dispatch = useDispatch();
  const [name, setName]= useState('');
  const [showClearSearch, setShowClearSearch]= useState(false);

  const handleChange = (e)=> {
    setName(e.target.value)
  }
 
  
  const handleSutmit = ()=>{
    if(name.length > 0){ 
    dispatch(getByName(name))
    setShowPaginator(false)
    setShowClearSearch(true)
    }
  }

  const clearSearch =()=>{
    dispatch(setPageFromBackUp())
    setShowClearSearch(false)
    setShowPaginator(true)
    setName("")
  }

      


  return (
    <div>
      <input 
      type='search'
      placeholder='Seach by name'
      value={name}
      onChange={(e)=>handleChange(e)}
      />
      <button 
      type='submit'
      onClick={handleSutmit}>Search</button>
      {
        showClearSearch &&
          <button 
          type='button'
          onClick={clearSearch}>Clear</button>
      }
      
    </div>
  )
}

export default SearchBar;