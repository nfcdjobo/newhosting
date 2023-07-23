import { useEffect, useState } from "react";
import deconnexion from '../../deconnexion/deconnexion';
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";

function MeunGestionnaire(params) {
    const [state, setState] = useState([]);
    useEffect(()=>{
        fetch(api_url+'getMessageNoRead', {
            method: 'GET',
            headers: { Authorization: `token ${cookie.token}` }
        })
        .then(res=>res.json())
        .then(succes=>{
            
            if(succes.data && Array.isArray(succes.data)){
                if(succes.data.length === 0 && document.getElementById('position-relative')){
                    document.getElementById('n-message').hidden = true;
                }else{
                    setState(succes.data)
                }
            }
        })
    }, [])

    return (
        <>
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                <li className="nav-item"><a className="nav-link" href="/anime#!">Animation</a></li>
                <li className="nav-item"><a className="nav-link" href="/domaine#!">Domaine</a></li>
                <li className="nav-item"><a className="nav-link" href="/overUp#!">Publics</a></li>
                <li className="nav-item"><a className="nav-link" href="/auteur#!">AUTEURS</a></li>
                <li className="nav-item"><a className="nav-link" href="/profile#!">Profile</a></li>
                
                <li className="nav-item"><a className="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#deconnexion" >Déconnexion</a></li>
                <a href={state.length === 0 ? "/historiques#!" : "/coreos#!"}><button type="button" className="btn btn-warning position-relative" id="position-relative" title={state.length+" nouveau(x) message en attente de lecture."}>
                    
                    <i className="bi bi-chat-left-text" title={"Message"}></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="n-message">
                    {state.length<9 ? "0"+state.length.toString(): state.length>0 && state.length<99 ? state.length : "99+"}
                    </span>
                </button></a>
            </ul>
        </>
    )
}

export default MeunGestionnaire;