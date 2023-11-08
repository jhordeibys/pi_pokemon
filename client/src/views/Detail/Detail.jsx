import { useParams} from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getDetail } from '../../Redux/Action/Action';
import './DetailStyle.css'

const Detail = () => {
  const {id} = useParams();

  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail);
  
  useEffect( () => {
      
    dispatch(getDetail(id))
}, [id]);


  return (
    <div className='detail'>

      <img 
      src={detail.image && detail.image} 
      alt={detail.name} 
      />

      <div>
        <h3>Name: {detail.name && detail.name }</h3>
        <h3>Life: {detail.life && detail.life} </h3>
        <h3>Attack: {detail.attack && detail.attack}</h3>
        <h3>Defense: {detail.defense && detail.defense}</h3>
        <h3>Speed: {detail.speed && detail.speed}</h3>
        <h3>Height: {detail.height && detail.height}</h3>
        <h3>Weight: {detail.weight && detail.weight}</h3>
        <div>
        <h3>Type: {detail.Type && detail.Type}</h3>
        </div>
        
     
      </div>
      
    </div>
  )
}

export default Detail;