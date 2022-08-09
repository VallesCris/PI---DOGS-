import React from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDogDetail } from "../../actions/indexActions";
import { useEffect } from "react";

export default function DogsDetails({id}){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogDetail(id))
    },[dispatch ])

    const dogDetail = useSelector((state)=> state.details)

    if(!dogDetail.temperament){
        dogDetail.temperament = "None"
    }

    return(
        <React.Fragment>
            <div >
                        <h1>Nombre: {dogDetail.name}</h1>

                        <h3>Altura: {dogDetail.height ? dogDetail.height : "No se ha indicado la altura"}</h3>

                        <h4>Peso: {dogDetail.weight ? dogDetail.weight : "No se ha indicado el peso"}</h4>
                    
                        <h4>Años de vida: {dogDetail.life_span ? dogDetail.life_span : "No se ha indicado los años de vida" }</h4>
                
                        <h4>Temperamento: {dogDetail[0].temperament.length === 0 ? "No se han indicado dietas" : !dogDetail[0].createdInDb ? dogDetail[0].temperament + "" : dogDetail[0].temperament.map((d) => d.name + (' '))}</h4> 

                        <img src={dogDetail.image} alt="Image not found"/>
            </div>
            
       </React.Fragment>
    )
}