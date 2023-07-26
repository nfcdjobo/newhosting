import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import isCookie_user_authorization from "../controlleur/controlleur";
function Voirplus(param){
    const [state, setState] = useState([]);
    const entite = window.location.href.split('#!')[1].split('-')[0];
    const id = window.location.href.split('#!')[1].split('-')[1];
    let model = null;
    if(entite === "auteur" || entite === "abonnes"){
        model = 'User';
    }else{
        model = "Exposition";
    };
    useEffect(()=>{
        if(isCookie_user_authorization){
            if(isCookie_user_authorization==="GESTIONNAIRE"){
                const table = [];
                fetch(api_url+'get'+model+'ById/'+id, {
                    method: 'GET',
                    headers: {Authorization: `token ${cookie.token}`}
                })
                .then(res => res.json())
                .then(succes => {
                    const data = succes.data || succes.auteur;
                    console.log(data)
                    table.push( 
                    `<div class="row">
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <h6 class="card-header text-center" id="vueTitre">${model === "User" ? "PHOTO DE PROFILE" : "IMAGE DESCRIPTIVE"}</h6>
                                <div class="card-body">
                                    <img class="card-img-top" src="${data.photo}" id="vueImage" style="height: 350px"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-8">
                            <div class="card mb-4">
                                <h6 class="card-header text-center" id="vueTitre">${model === "User" ? data.nomPrenom : data.titre}</h6>
                                <div class="card-body">
                                    <h6 class="card-img-top text-center">${model === "User" ? data.nationalite : ""}</h6>
                                    <div class="card-body">
                                        <p class="card-text" id="vueDescription">${model === "User" ? data.email : data.description}</p>
                                        <p class="card-text" id="vueDescription">${model === "User" ? data.telephone : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    setState(table)
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                window.location.href =  '/login#!';
            }
        }else{
            window.location.href =  '/login#!';
        }
    }, []);
    if(isCookie_user_authorization){
        if(isCookie_user_authorization==="GESTIONNAIRE"){
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
                            <div className="col-12">
                                <div className="card mb-4">
                                    <div className="card-header text-center">DETAIL</div>
                                    <div className="card-body" id="card-body">
                                        {
                                            (
                                                ()=>{
                                                    if(document.getElementById('card-body')){
                                                        document.getElementById('card-body').innerHTML = state.map(item => item).join('');
                                                    }
                                                }
                                            )()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            );
        }else{
            window.location.href =  '/login#!';
        }
    }else{
        window.location.href =  '/login#!';
    }     
}

export default Voirplus;
