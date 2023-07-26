import {useState, useEffect} from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import logo from '../../assets/img/logos/logo.png';
import isCookie_user_authorization from "../controlleur/controlleur";

function Detail(params) {
    let [state, setState] = useState({});
    useEffect(()=>{
        if(isCookie_user_authorization === "PASSANT"){
            fetch(api_url+'getExpositionById/'+window.location.href.split('#!')[1].split('-')[0], {
                headers: { Authorization: `token ${cookie.token}`}
            })
            .then(res => res.json())
            .then(success => {
                if(success.data){
                    fetch(api_url+'getUserById/'+success.data.user_id, {
                        headers: { Authorization: `token ${cookie.token}`}
                    })
                    .then(ress => ress.json())
                    .then(all => {
                        const objet = {user: all.data, exposition: success.data};
                        setState(objet);
                    })
                }else{
                    console.log('error', success.msg)
                }
                
            })
        }else{
            window.location.href = "/login#!";
        }
    }, []);
    if(isCookie_user_authorization === "PASSANT"){
        return (
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3">Bienvenue chez </h3>
                            <h1 className="fw-bolder">Sophia-Culturas (S-!-C)</h1>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-4">
                                <div className="card-header text-center"><h2>{state.exposition ? state.exposition.titre : "Chargement en cours..."}</h2> </div>
                                <div className="card-body">
                                    <div className="row" id="exposition-row">
                                        <img src={state.exposition ? state.exposition.photo : state} title={state.exposition ? state.exposition.titre: state} className="card-img-top img-fluid" style={{ maxWidth: 100+'%', maxHeight: '550px' }} alt={state.exposition ? state.exposition.titre : "Chargement en cours..."}></img>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-body">
                                            <p className="card-text" id="vueDescription">{state.exposition ? state.exposition.description : "Chargement en cours..."}</p>
                                        </div>
                                        
                                        
                                    </div>
                                    <a href='/expositions#!' class="btn btn-outline-primary text-center"><i class="bi bi-backspace"></i> Rétour à la précedente</a>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <Footer  />
            </>
        )
    }else{
        window.location.href = '/login#!';
    }
}
export default Detail;