import React from "react";
import {Link} from "react-router-dom";


export default function LandingPage(){
    return(
        <React.Fragment>
            <div>
                <div>
                    <h1>Welcome fucking bitch</h1>
                </div>
                <Link to = '/home'>
                    <button>Ingresar</button>
                </Link>
            </div>
        </React.Fragment>
    )
}