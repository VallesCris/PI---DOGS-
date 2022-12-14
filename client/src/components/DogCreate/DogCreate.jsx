import React from 'react';
import {Link,} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, postDog } from "../../actions/indexActions";
import { useState } from 'react';
import dg from '../DogCreate/dg.module.css'

function validation(newDog){
    let errors = {}
    if(newDog.name === ' '){
        errors.name = 'Ingresa un nombre'
    }
    if(newDog.minheight && newDog.minheight <= 0 ){
        errors.numberMinheight = 'La altura minima debe ser mayor a 0!'
    }
    if(newDog.maxheight && (newDog.maxheight > 500 || newDog.maxheight <= 0|| parseInt(newDog.minheight) > parseInt(newDog.maxheight))){
        errors.numberMaxheight = `${newDog.maxheight} cm excede la altura maxima!`
    }
    if(newDog.minweight && newDog.minweight <= 0) {
        errors.numberMinweight = 'El peso minimo debe ser mayor a 0!'
    }
    if(newDog.maxweight && (newDog.maxweight > 500 || parseInt(newDog.minweight) > parseInt(newDog.maxweight))){
        errors.numberMaxweight = `${newDog.maxweight} kg excede el peso maximo!`
    }
    return errors
}

export default function DogCreate(){
    const [newDog, setNewDog] = useState({
        name:'',  
        minheight:'', 
        maxheight:'', 
        minweight:'', 
        maxweight:'', 
        minlife_span:'', 
        maxlife_span:'', 
        temperament:[],
        image: '',
    });

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});


    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);


    function handleChange(e){
        setNewDog({
          ...newDog,
          [e.target.name]: e.target.value
          
        });
        setErrors(validation({
            ...newDog,
            [e.target.name]: e.target.value
        }))
      };
     
      function handleSelect(e){ 
          if(e.target.checked === true){
            setNewDog({
              ...newDog,
              temperament: [...newDog.temperament,e.target.value]
          });
        } else {
            setNewDog({
                ...newDog,
                temperament: newDog.temperament.filter(x =>{
                    return e.target.value !== x
                })
            })
        }
      };

      function handleSubmit(e){
          e.preventDefault();
          if(newDog.minheight >= 0 && newDog.minweight >= 0 && parseInt(newDog.maxheight) >= parseInt(newDog.minheight) && parseInt(newDog.maxweight) >= parseInt(newDog.minweight) && newDog.name){
          dispatch(postDog(newDog));
          alert('Dog was succesfully created');
          setNewDog({
            name:'',  
            minheight:'', 
            maxheight:'', 
            minweight:'', 
            maxweight:'', 
            minlife_span:'', 
            maxlife_span:'', 
            temperament:[],
            image: '',
        });
            } 
        else{
            alert('Algo va mal, Asegurate que todos los campos esten completos')
         }
        };

      
    return (
        <div className={dg.container}>
        <br />  
        <h1 className={dg.h1}>CREATE NEW DOG</h1>
        <br/>
        <form onSubmit={handleSubmit} >

            <div className={dg.div2}>
            <label className={dg.label}>Nombre / Raza </label>
            <input type="text" name ="name" value ={newDog.name} onChange={handleChange}/><br/>
            { errors.name && 
            <span className={dg.error}>{errors.name}</span>
            }
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Altura m??nima (cm) </label>
                <input type="number" name ="minheight" value ={newDog.minheight} onChange={handleChange} />
                <br/>
                <label className={dg.label}>Altura m??xima (cm) </label>
                <input type="number" name ="maxheight" value ={newDog.maxheight} onChange={handleChange} />
                <br/>
                { (errors.numberMinheight ||errors.numberMaxheight) && 
                <span className={dg.error}>{(errors.numberMinheight)|| (errors.numberMaxheight)}</span>
            }            
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Peso m??nimo (kg) </label>
                <input type="number" name ="minweight" value ={newDog.minweight} onChange={handleChange}/>
                <label className={dg.label}>Peso m??ximo (kg) </label>
                <input type="number" name ="maxweight" value ={newDog.maxweight} onChange={handleChange} />
                <br />
                { (errors.numberMaxweight || errors.numberMinweight) && 
                <span className={dg.error}>{(errors.numberMaxweight)||(errors.numberMinweight)}</span>
            }
            </div>
            
            <div className={dg.div2}>
                <label className={dg.label}>A??os m??nimos de vida </label>
                <input type="number" name ="minlife_span" value ={newDog.minlife_span} onChange={handleChange}/>
                <label className={dg.label}>A??os m??ximos de vida </label>
                <input type="number" name ="maxlife_span" value ={newDog.maxlife_span} onChange={handleChange}/>
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Imagen</label>
                <input type="text" value={newDog.image} name="image" onChange={(e)=>handleChange(e)}  className={dg.input}/>
            </div>


            <label className={dg.temps}>Temperamentos:</label>
            <div className={dg.div2}>
                <label className={dg.check}>Leal</label>
                <input type="checkbox" value= "Loyal" name="Loyal" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Curioso</label>
                <input type="checkbox" value= "Curious" name="Curious" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Jugueton</label>
                <input type="checkbox" value= "Playful" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Aventuroso</label>
                <input type="checkbox" value= "Adventurous" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Activo</label>
                <input type="checkbox" value= "Active" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Amante de la diversi??n</label>
                <input type="checkbox" value= "Fun-loving" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
            </div>
            <div className={dg.div2}>
                <label className={dg.check}>Independiente</label>
                <input type="checkbox" value= "Independent" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Alegre</label>
                <input type="checkbox" value= "Happy" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Salvaje</label>
                <input type="checkbox" value= "Wild" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Amigable</label>
                <input type="checkbox" value= "Friendly" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Inteligente</label>
                <input type="checkbox" value= "Intelligent" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Valiente</label>
                <input type="checkbox" value= "Brave" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
                <label className={dg.check}>Caballero</label>
                <input type="checkbox" value= "Gentle" name="Playful" onChange={(e) =>handleSelect(e)} className={dg.input}/>
            </div>
                <br /><br />
                    <button type="submit" className={dg.button} disabled={Object.keys(errors).length}>Crear Perro</button>
                <br /><br />
        </form>
        <Link to = '/home'>
            <button className={dg.buttonB}>Volver al men??</button>
         </Link>
        </div>
    ) 
    
}  





