import React from "react";
import {Link} from "react-router-dom";
import land from '../LandingPage/land.module.css';



export default function LandingPage(){
    return(
        <React.Fragment>
            <div className={land.container}>
                <div className={land.h1}>
                    <h1>Bienvenidos al PI-DOGS</h1>
                </div>
                <Link to = '/home'>
                    <button className={land.button}>Ingresar</button>
                </Link>
            </div>
        </React.Fragment>
    )
}