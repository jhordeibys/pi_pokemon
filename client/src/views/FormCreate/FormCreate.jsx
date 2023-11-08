import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTypes, postPokemon} from '../../Redux/Action/Action';
import './FormStyle.css';



const FormCreate = () => {

  const dispatch = useDispatch();
  const type = useSelector(state => state.type);
  

  useEffect(() => {
    dispatch(getTypes())
  }, []);

  const [formValues, setFormValues] = useState({
    frmName:'',
    frmImg:'',
    frmLife:'',
    frmAttack:'',
    frmDefense:'',
    frmSpeed:'',
    frmHeight:'',
    frmWeight:'',
    frmType:[""]
  });

  const [formError, setFormError] = useState({
    frmName:'required field',
    frmImg:'required field',
    frmLife:'required field',
    frmAttack:'required field',
    frmDefense:'required field',
    frmSpeed:'',
    frmHeight:'',
    frmWeight:'',
    //frmType:'select at least 1',
  });
  
  const validarForm = (formValues, name)=>{
      switch(name){
        case 'frmName':
          if(formValues.frmName === ''){
            setFormError({...formError, frmName:'required field'})
          } else if(formValues.frmName.length > 15){ 
            setFormError({...formError, frmName:'maximum 15 characters'})
          } else if(!formValues.frmName.match(/^[a-zA-Z]+$/)){
            setFormError({...formError, frmName:'only accepts letters'})
          } else {setFormError({...formError, frmName:''})}
          
          break;

          case 'frmImg':
            if(formValues.frmImg === ''){
              setFormError({...formError, frmImg:'required field'})
            } else if(formValues.frmImg.length > 250){
              setFormError({...formError, frmImg:'maximum 250 characters'})
            } else {setFormError({...formError, frmImg:''})}
            
            break;

          case 'frmLife':
            if(formValues.frmLife === ''){
              setFormError({...formError, frmLife:'required field'})
            } else if(formValues.frmLife.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmLife:'accepts only numbers'})
            }else if(formValues.frmLife.length > 10){
              setFormError({...formError, frmLife:'maximum 10 characters'})
            }else {setFormError({...formError, frmLife:''})}
            
            break;

          case 'frmAttack':
            if(formValues.frmAttack === ''){
              setFormError({...formError, frmAttack:'required field'})
            } else if(formValues.frmAttack.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmAttack:'accepts only numbers'})
            }else if(formValues.frmAttack.length > 10){
              setFormError({...formError, frmAttack:'maximum 10 characters'})
            }else {setFormError({...formError, frmAttack:''})}
            
            break;

          case 'frmDefense':
            if(formValues.frmDefense === ''){
              setFormError({...formError, frmDefense:'required field'})
            } else if(formValues.frmDefense.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmDefense:'accepts only numbers'})
            }else if(formValues.frmDefense.length > 10){
              setFormError({...formError, frmDefense:'maximum 10 characters'})
            }else{setFormError({...formError, frmDefense:''})}
            
            break;

          case 'frmSpeed':
            if(formValues.frmSpeed.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmSpeed:'accepts only numbers'})
            }else if(formValues.frmSpeed.length > 10){
              setFormError({...formError, frmSpeed:'maximum 10 characters'})
            }else{setFormError({...formError, frmSpeed:''})}
            
            break;

          case 'frmHeight':
            if(formValues.frmHeight.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmHeight:'accepts only numbers'})
            }else if(formValues.frmHeight.length > 10){
              setFormError({...formError, frmHeight:'maximum 10 characters'})
            }else{setFormError({...formError, frmHeight:''})}
            
            break;

          case 'frmWeight':
            if(formValues.frmWeight.match(/^[a-zA-Z]+$/)){
              setFormError({...formError, frmWeight:'accepts only numbers'})
            }else if(formValues.frmWeight.length > 10){
              setFormError({...formError, frmWeight:'maximum 10 characters'})
            }else{setFormError({...formError, frmWeight:''})}
            
            break;

          /*case 'frmType':
            if(formValues.frmType === ""){
              setFormError({...formError, frmType:'select at least 1'})
            } else {setFormError({...formError, frmType:''})}
            
            break;*/
        }
  }


  const disableButton =()=> {
    let auxDesabled = true;
    for(let error in formError){
      if(formError[error]=== "") auxDesabled = false;
      else{
        auxDesabled = true
        break
      }
    }
    return auxDesabled
  }


  let newPokemon = {
    name: formValues.frmName,
    image: formValues.frmImg,
    life: formValues.frmLife,
    attack: formValues.frmAttack,
    defense: formValues.frmDefense,
    speed: formValues.frmSpeed,
    height:formValues.frmHeight,
    weight: formValues.frmWeight ,
    type: formValues.frmType
  };



  const handleInputChange = (e)=>{
    e.preventDefault();

    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    if(name === 'frmType'){
      if(formValues.frmType.includes(value)) return
      setFormValues({
        ...formValues,
        [name]: [...formValues[name], value]
      })
      return
    }
   if(name === 'frmType') validarForm({
      ...formValues,
      [name]: [...formValues[name], value] 
  }, name)
    else validarForm({...formValues, [name]: value}, name)
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch(postPokemon(newPokemon))
    // bederia setiar el estado a todos los campos vacios al enviar
  
  };


  const remove = (e)=>{
    //const value = document.getElementById(e.target.id).value
    setFormValues({
      ...formValues,
      [e.target.name]: [...formValues[e.target.name].filter(x => x !== e.target.id)]
    })
  }


  return (
    <div className='cont-form'>
      
      <form className='form' name='form' onSubmit={handleSubmit}>

        {/*Agrega nombre en formulario*/}
        <label>
          Name: 
          <input
            type='text'
            name='frmName'
            value={setFormValues.frmName}
            onChange={handleInputChange}
          />
          </label>
          {formError.frmName}
          <br/>
          <br/>


        {/*Agrega imagen en formulario*/}
        <label>
          Image: 
          <input
            type='text'
            name='frmImg'
            value={setFormValues.frmImg}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmImg}
        <br/>
        <br/>

        {/*Agrega vida en formulario*/}
        <label>
          Life: 
          <input
            type='text'
            name='frmLife'
            value={setFormValues.frmLife}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmLife}
        <br/>
        <br/>
        {/*Agrega ataque en formulario*/}
        <label>
          Attack: 
          <input
            type='text'
            name='frmAttack'
            value={setFormValues.frmAttack}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmAttack}
        <br/>
        <br/>

        {/*Agrega defensa en formulario*/}
        <label>
          Defense: 
          <input
            type='text'
            name='frmDefense'
            value={setFormValues.frmDefense}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmDefense}
        <br/>
        <br/>  

        {/*Agrega velocidad en formulario*/}
        <label>
          Speed: 
          <input
            type='text'
            name='frmSpeed'
            value={setFormValues.frmSpeed}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmSpeed}
        <br/>
        <br/> 

        {/*Agrega altura en formulario*/}
        <label>
        Height: 
          <input
            type='text'
            name='frmHeight'
            value={setFormValues.frmHeight}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmHeight}
        <br/>
        <br/>

        {/*Agrega peso en formulario*/}
        <label>
        Weight: 
          <input
            type='text'
            name='frmWeight'
            value={setFormValues.frmWeight}
            onChange={handleInputChange}
          />
        </label>
        {formError.frmWeight}
        <br/>
        <br/>

        {/* Agregar tipos en formulario */}
        <label className='label'>
          Type:
          <select
            name='frmType'
            onChange={handleInputChange}
          >
              <option key="select" >select</option>
            {
              type?.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
            }
          </select>
          {/*muestro los type seleccionados en pantalla*/}
          {
            formValues.frmType.map(t => <div><span id={'frmType'}>{t}</span><button id={t} type='button' name='frmType' onClick={remove}>x</button></div>)
          }
        </label>
        <br/>
        <br/>

        {/* Enviar post */}
        <button disabled={disableButton()} type="submit"  > Create </button>

      </form>
    </div>
  )
}

export default FormCreate;