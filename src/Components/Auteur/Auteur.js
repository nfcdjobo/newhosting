import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import isCookie_user_authorization from "../controlleur/controlleur";

function Auteur(){
    const [state, setState] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(()=>{
        if(isCookie_user_authorization != "GESTIONNAIRE"){
            window.location.href = "/login#!";
        }else{
            const table = [];
            fetch(api_url+"getAllUsers",{
                method: 'GET',
                headers: {Authorization : `token ${cookie.token}`}
            })
            .then(res=>res.json())
            .then(succes => {
                if(Array.isArray(succes.data) && succes.data.length > 0){
                    succes.data.filter(item => item.entite !="GESTIONNAIRE" && item.entite != "PASSANT").sort((a, b)=>new Date(b.libelle)-new Date(a.libelle)).forEach((item, index) => {
                        table.push(
                            `<tr>
                                <th scope="row">${index+1 >9 ? index+1 : '0'+(index+1).toString()}</th>
                                <td>${item.nomPrenom}</td>
                                <td>${item.nationalite}</td>
                                <td>${item.email}</td>
                                <td>${item.telephone}</td>
                                <td><img src="${item.photo}" style="width: 35px; height: 35px"/></td>
                                <td>${new Date(item.createdAt).toLocaleDateString('fr-FR', options)}</td>
                            </tr>`);
                    });
                    setState(table)
                }
            })
        }  
    }, [])
    return (
        <>
            <Navbar />
            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h3 className="lea mb-3">LISTE DES AUTEURS </h3>
                        <h1 className="fw-bolder">Sophia-Culturas (S-!-C)</h1>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
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

                     <div className="col-lg-12">

                        <table class="table table-striped table-hover">
                            <thead className="">
                                <tr>
                                    <th scope="col">N°#</th>
                                    <th scope="col">NOM & PRENOM</th>
                                    <th scope="col">NATIONALITE</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">TELEPHONE</th>
                                    <th scope="col">PHOTO</th>
                                    <th scope="col">DEPUIS</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-table">
                                {
                                    (()=>{
                                        if(document.getElementById('tbody-table')){
                                            document.getElementById('tbody-table').innerHTML = [...state].join('')
                                        }
                                    })()
                                }
                            </tbody>
                        </table>

                     </div>

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
                                    <a className="page-link" href="#!">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">3</a>
                                </li>
                                <li className="page-item disabled">
                                    <a className="page-link" href="#!">...</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">Next</a>
                                </li>
                            </ul>
                    </nav>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Auteur;