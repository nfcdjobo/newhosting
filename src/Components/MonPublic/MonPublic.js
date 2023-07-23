import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cookie from '../../Cookies/Cookies';
import api_url from '../../api_url/api_url';
import { useEffect, useState } from 'react';
import isCookie_user_authorization from '../controlleur/controlleur';
function MonPublic(params) {
    let [state, setState] = useState([]);
    const table = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(() => {
        if(isCookie_user_authorization !== "AUTEUR"){
            window.location.href = '/login#!';
        }else{
            fetch(api_url+'getCommentLireJoint', {
                method: 'GET',
                headers: {Authorization: `token ${cookie.token}`}
            })
            .then(res => res.json())
            .then(succes => {
                if(Array.isArray(succes.data) && succes.data.length > 0){
                    succes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item, index) => {
                        table.push(
                            `<div class="accordion-item btn-sm">
                                <h2 class="accordion-header" id="flush-heading-${item._id}">
                                    <button class="accordion-button collapsed btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${item._id}" aria-expanded="false" aria-controls="flush-collapse-${item._id}">
                                        ${item.commentateur[0].nomPrenom}  <i class="me-md-4"></i> <code>( ${new Date(item.createdAt).toLocaleDateString('fr-FR', options)} )</code>
                                    </button>
                                </h2>
                                <div id="flush-collapse-${item._id}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${item._id}" data-bs-parent="#commentaire">
                                    <div class="card-header text-center">Exposition commentée : ${item.exposition[0].titre} </div>
                                    <div class="accordion-body"> ${item.contenu} </div>
                                    <a href="editeExposition#!${item.exposition[0]._id}"><button type="button" class="btn btn-outline-warning btn_sm">Voir l'exposition</button></a>
                                </div>
                            </div>`
                        )
                    });
                    setState(table);
                }
            })
        }
    }, []);

    if(isCookie_user_authorization !== "AUTEUR"){
        window.location.href = '/login#!';
    }else{
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
                                <div className="card-header">Search</div>
                                <div className="card-body">
                                    <div className="input-group">
                                        <input className="form-control" type="search"  aria-describedby="button-search" />
                                        <button className="btn btn-primary" id="button-search" type="button">Recherche</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card mb-4">
                                <div className="card-header">MESSAGE(S) LU(S)</div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xl-12">
                                            <div className="card mb-4">
                                                <div className="card-body" id="card-body" >
                                                    <div className="accordion accordion-flush" id="commentaire">
                                                        {
                                                            (()=>{
                                                                if(document.getElementById('commentaire')){
                                                                    document.getElementById('commentaire').innerHTML = [...state].join('');
                                                                }
                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <nav aria-label="Pagination">
                        <hr className="my-0" />
                        <ul className="pagination justify-content-center my-4">
                            <li className="page-item disabled"><a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a></li>
                            <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                            <li className="page-item"><a className="page-link" href="#!">2</a></li>
                            <li className="page-item"><a className="page-link" href="#!">3</a></li>
                            <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                            <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                        </ul>
                    </nav>   
                </div>
                <Footer  />
            </>
        )

    }
    
}

export default MonPublic;