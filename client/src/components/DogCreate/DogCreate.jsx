import React from "react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getTemperament, postDog } from "../../actions/indexActions";
import {useDispatch} from "react-redux";


function validation(input){
    const errors = {}
    if(!input.name){
        errors.name = "Oblitario un nombre";
    }
    if(input.height < 10 ){
        errors.height = "La altura es menor a 10cm, ingrese una mayor"
    }
    if(input.height > 110 ){
        errors.height = "La altura es mayor a 110cm, ingrese una menor"
    }
    if(input.weight < 1 ){
        errors.weight = "Peso menor a 1kg, ingrese uno mayor"
    }
    if(input.weight > 30 ){
        errors.weight = "Peso mayor a 30kg, ingrese uno menor"
    }
    if(!input.lifeSpan){
        errors.life_span = "Obligatorio los años de vida"
    }
    return errors
}

export default function DogCreate(){
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        height: null,
        weight: null,
        lifeSpan: null,
        image: null,
        temperament: []
    })

    useEffect(()=> {
        dispatch(getTemperament())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validation({
            ...input,
            [e.target.name] : e.target.value
        }))
        //console.log(input)
    }

    function handleSelect(e){
        if(e.target.checked){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!input.name || !input.height || !input.weight || !input.lifeSpan){
            return alert('Complete todos los campos')
        }
        dispatch(postDog(input))
        setInput({
            name: "",
            height: null,
            weight: null,
            lifeSpan: null,
            image: null,
            temperament: []
        })
        alert('Perro creado existosamente')
    }

    return(
        <React.Fragment>
            <div>
                <div>
                    <h1>Que tal un nuevo perro?</h1>
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <div>
                            <div>
                                <label>Nombre</label>
                                <input type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}/>
                                { errors.name && ( <p>{errors.name}</p>)}
                            </div>
                            <div>
                                <label>Altura</label>
                                <input type="text" value={input.height} name="altura" onChange={(e)=>handleChange(e)}/>
                                { errors.height && ( <p>{errors.height}</p>)}
                            </div>
                            <div>
                                <label><Peso></Peso></label>
                                <input type="text" value={input.weight} name="peso" onChange={(e)=>handleChange(e)}/>
                                { errors.weight && ( <p>{errors.weight}</p>)}
                            </div>
                            <div>
                                <label>Años</label>
                                <input type="text" value={input.lifeSpan} name="años" onChange={(e)=>handleChange(e)}/>
                                { errors.lifeSpan && ( <p>{errors.lifeSpan}</p>)}
                            </div>
                            <div>
                                <label>Image</label>
                                <input type="text" value={input.image} name="años" onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div>
                                <label>Escoge el temperamento: </label>
                                <select onChange ={e => handleSelect(e)} defaultValue='default'>
                                <option value='default' disabled='default'></option>
                                { temperament && temperament.map(d =>    
                                <option key={d} value={d}>{d}</option>
                                )}
                                </select>
                            </div>

                            <button type="submit" disabled={Object.keys(errors.length)}>Crear Perro</button>
                        </div>
                    </form>
                    <Link to = '/home'><button>Volver a inicio</button></Link>
                </div>
            </div>
        </React.Fragment>
    )
}