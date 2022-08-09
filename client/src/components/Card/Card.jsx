import React from "react";

export default function({name, image, temperament, id}){
    return(
        <React.Fragment>
            <div>
                <div key={id}>
                    <h2>{name}</h2>
                    {dog[0]?.name? temperament.map(d => <h5>{d.name}</h5>) : temperament.map(d => <h5>{ d + " "}</h5>)}
                    <image src={image} alt="a"/>
                </div>
            </div>
        </React.Fragment>
    )

}