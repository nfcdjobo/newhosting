import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";

function Bannier(params) {
    const [state, setState] = useState({});
    useEffect(()=>{
        const table = [];
        fetch(api_url+"getAll/banniere")
        .then(res=>res.json())
        .then(succes=>{
            if(succes.data && succes.data.length>0){
                setState(succes.data.sort((a, b)=>new Date(b.createdAt)-new Date(a.createdAt))[0]);
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])
    return(
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading" style={{ color: 'orange' }}>{state.accueil}</div>
                <div className="masthead-heading text-uppercase" style={{ color: 'orange' }}>{state.plateforme} {state.sigle}</div>
                <a className="btn btn-primary  text-uppercase" href="#services">Savoir plus</a>
            </div>
        </header>
    )
}

export default Bannier;