import React from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDogDetail } from "../../actions/indexActions";
import { useEffect } from "react";

export default function DogsDetails(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDogDetail(id))
    },[dispatch, (id)])

    const dogDetail = useSelector(state => state.dogDetails)
    //console.log('dogDetail', dogDetail, "id", id)
    

    if(!dogDetail.temperament){
        dogDetail.temperament = "None"
    }
    if(!dogDetail){
        return null;
    }

    return(
        <React.Fragment>
            <div >
                        <h1>Nombre: {dogDetail.name}</h1>

                        <h3>Altura: {dogDetail.height ? dogDetail.height.metric : "No se ha indicado la altura"}</h3>

                        <h4>Peso: {dogDetail.weight ? dogDetail.weight.metric : "No se ha indicado el peso"}</h4>
                    
                        <h4>Años de vida: {dogDetail.life_span ? dogDetail.life_span : "No se ha indicado los años de vida" }</h4>

                        <h4>Temperamento: {dogDetail.temperament}</h4>
                
                        {/* <h4>Temperamento: {dogDetail.temperament.length === 0 ? "No se han indicado dietas" : !dogDetail[0].createdInDb ? dogDetail[0].temperament + "" : dogDetail[0].temperament.map((d) => d.name + (' '))}</h4>  */}

                        <img src={dogDetail.image}/>
            </div>

            <div>
                <Link to = '/home'>
                    <button>Volver al menú</button>
                </Link>
            </div>
            
       </React.Fragment>
    )
}