import React from "react";

export default function Card({name, image, temperament, id, weight}){

    const temperaments = temperament.split(", ");
    return(
        <React.Fragment>
            <div>
                <div key={id}>
                    <h2>{name}</h2>
                    <h2>{weight} kg</h2>
                    {temperaments.map(d => <h5 key={d}>{ d + " "}</h5>)}
                    <img src={image} alt="a"/>
                </div>
            </div>
        </React.Fragment>
    )

}