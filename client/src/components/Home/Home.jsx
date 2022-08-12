import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterByTemp, dogCreated, alphabeticSort, scoreSort } from "../../actions/indexActions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

export default function HomePage(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> {return state.dogs});
    const [orden, setOrden] = useState("");
    const [pagActual, setPagActual] = useState(1);
    const dogPerPage = 8
    const indexLastDog = pagActual * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const dogActual = allDogs.slice(indexFirstDog, indexLastDog)
    const temperaments = useSelector(state => state.temperaments);
    console.log('dogActual', dogActual);

    const paginado = (numberPage) => {
        setPagActual(numberPage)
    }

    useEffect(()=>{
        dispatch(getAllDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault(e)
        dispatch(getAllDogs())
    }

    function handleFilterByTemp(e){
        dispatch(filterByTemp(e.target.value))
    }

    function handleFilterDb(e){
        e.preventDefault(e)
        dispatch(dogCreated(e.target.value))
    }

    function handleAToZ(e){
        e.preventDefault(e)
        dispatch(alphabeticSort(e.target.value))
        setPagActual(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleScoreSort(e){
        e.preventDefault(e)
        dispatch(scoreSort(e.target.value))
        setPagActual(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <React.Fragment>
            <div>
                <div>
                    <h1>Bienvenido a la pagina de perros</h1>
                <Link to= '/dogs'>
                    <button>Crear Perro</button>
                </Link>
                <button onClick={e=>{handleClick(e)}}>Recargar Perros</button>
                </div>

                <div>
                    <select onChange={e=> {handleAToZ(e)}}>
                        <option value="">Busqueda alfabética</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => {handleScoreSort(e)}}>
                        <option value="">Busqueda por Peso</option>
                        <option value="up">Mas alto</option>
                        <option value="down">Mas bajo</option>
                    </select>
                </div>
                <div>
                    <select onChange={e=>{handleFilterDb(e)}}>
                        <option value="">Todos los perros</option>
                        <option value="current">Creados</option>
                        <option value="created">Existentes</option>
                    </select>
                </div>
                <div>
                    <select onChange ={e => handleFilterByTemp(e)} defaultValue="default">
                        <option value='default' disabled='disabled' >Filter by temperaments</option>
                        <option value='all' key="all">All temperaments</option>
                            { temperaments && temperaments.map(d =>   
                        <option key={d} value={d}>{d}</option>
                )}
            </select>
                </div>
                <Pagination
                dogPerPage={dogPerPage}
                allDogs = {allDogs.length}
                pagination = {paginado}
                />

                <SearchBar/>
                <div>
                    <span>
                        <div>
                            {
                                dogActual?.map(r=>{
                                    return(
                                        <div key = {r.id}>
                                            <Link to ={`/dogs/${r.id}`}>
                                                <Card name={r.name} temperament={r.temperament} image={r.image} weight={r.weight.metric}/>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </span>
                </div>

            </div>
        </React.Fragment>
    )
}