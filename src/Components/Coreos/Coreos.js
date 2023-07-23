import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import isCookie_user_authorization from "../controlleur/controlleur";

function Coreos(){
    const [state, setState] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(()=>{
        if(isCookie_user_authorization != "GESTIONNAIRE"){
            window.location.href = '/login#!';
        }else{
            fetch(api_url+"getMessageNoRead", {
                method:'GET',
                headers: {Authorization: `token ${cookie.token}`}
            })
            .then(res=>res.json())
            .then(succes=>{
                const table = [];
                if(succes.data && Array.isArray(succes.data) && succes.data.length > 0){
                    succes.data.sort((a, b)=>new Date(b.createdAt)-new Date(a.createdAt)).forEach((item, index) => {
                        table.push(
                        `<tr id="ligne-${item._id}">
                            <th scope="row">${index+1 >9 ? index+1 : '0'+(index+1).toString()}</th>
                            <td>${item.nomPrenom}</td>
                            <td>${item.email}</td>
                            <td>${item.telephone}</td>
                            <td>${new Date(item.createdAt).toLocaleDateString('fr-FR', options)}</td>
                            <td className="text-center"><button type="button" class="btn btn-success" id="${item._id}" title="lecture" data-bs-toggle="modal" data-bs-target="#LIRE-${item._id}">LIRE</button></td>
                            <div class="modal fade" id="LIRE-${item._id}" tabindex="-1" aria-labelledby="LIRE-${item._id}Title" style="display: none;" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="LIRE-${item._id}Title">MOTIF: ${item.motif}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p class="text-break">${item.message}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <a href="mailto:${item.email}"><button type="button" class="btn btn-primary">REPONDRE</button></a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </tr>`);
                    });
                    setState(table)
                } 
            })
        }
    }, []);
    if(isCookie_user_authorization === "GESTIONNAIRE"){
        return(
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3">BOITE AUX LETTRES </h3>
                            <h1 className="fw-bolder">Sophia-Culturas (S-!-C)</h1>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className="card mb-4">
                                        <div className="card-header text-center">HISTORIQUE</div>
                                            <div className="card-body text-center">
                                                <a href="/historiques#!"><button className="btn btn-secondary" id="button-search" type="button" >MESSAGE</button></a>
                                            </div>
                                    </div>
                                </div>

                                <div className="col-lg-10">
                                    <div className="card mb-4">
                                        <div className="card-header">Search</div>
                                        <div className="card-body">
                                            <div className="input-group">
                                                <input className="form-control" type="search" aria-describedby="button-search"/>
                                                <button className="btn btn-primary" id="button-search" type="button" >Recherche</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            
                            <div className="card mb-4">
                                <div className="card-header text-center">MESSAGE(S) EN ATTENTE DE LECTURE </div>
                                <div className="card-body">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">N°#</th>
                                                <th scope="col">NOM ET PRENOM</th>
                                                <th scope="col">EMAIL</th>
                                                <th scope="col">TELEPHONE</th>
                                                <th scope="col">DATE</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody-table">
                                            {
                                                (()=>{
                                                    if(document.getElementById('tbody-table')){
                                                        document.getElementById('tbody-table').innerHTML = [...state].join('');
                                                        document.querySelectorAll("button[title='lecture']").forEach(item=>item.addEventListener('click', changeStatut))
                                                    }
                                                })()
                                            }
                                        </tbody>
                                    </table>
                                    <nav aria-label="Pagination">
                                        <hr className="my-0" />
                                        <ul className="pagination justify-content-center my-4">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true"> Previous </a>
                                            </li>
                                            <li className="page-item active" aria-current="page">
                                                <a className="page-link" href="#!"> 1 </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#!">2 </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#!">3</a>
                                            </li>
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#!">... </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#!">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }else{
        window.location.href = '/login#!';
    }
}

const changeStatut = event=>{
    if(isCookie_user_authorization === "GESTIONNAIRE"){
        let nmessage = document.getElementById('n-message');
        const formData = new FormData();
        formData.append('id', event.target.id);
        fetch(api_url+'updateMessage', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {Authorization: `token ${cookie.token}`}
        })
        .then(res=>res.json())
        .then(succes=>{
            if(succes.msg.includes('effectuée avec succès !')){
                document.getElementById(`ligne-${event.target.id}`).remove();
                nmessage.textContent =  Number(nmessage.textContent.replace('+', ''))<11 ? '0'+(Number(nmessage.textContent)-1).toString() : Number(nmessage.textContent.replace('+', ''))>=11 && Number(nmessage.textContent.replace('+', ''))<101 ? Number(nmessage.textContent.replace('+', ''))-1 : (Number(nmessage.textContent.replace('+', ''))-1).toString()+'+';
                document.getElementById('position-relative').title=`${nmessage.textContent} nouveau(x) message en attente de lecture.`
            }
        })
    }else{
        window.location.href = '/login#!';
    }
}

export default Coreos;