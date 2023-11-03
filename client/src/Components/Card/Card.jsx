import React from 'react'
import { useNavigate} from 'react-router-dom';
import './CardStyle.css';




const Card = ({id, name, image, life, attack, defense, speed, height, weight, type}) => {

  const navigate = useNavigate()
  const test = (id)=>{
    navigate(`/Detail/${id}`)
  }

  return (
    <div className='card-contenedor' onClick={()=>test(id)}>
      <h1>{name}</h1>
      <img
        src={image}
        alt="Reference image"
        className='image'
        //onError={() => replaceUrl(event)}
      />

      <h2>{life}</h2>
      <h2>{attack}</h2>
      <h2>{defense}</h2>
      <h2>{speed}</h2>
      <h2>{height}</h2>
      <h2>{weight}</h2>
      <h2>{type}</h2>

    </div>
  )
}

export default Card;