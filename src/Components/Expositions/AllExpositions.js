import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cookie from '../../Cookies/Cookies';
import {useState, useEffect} from 'react';
import api_url from '../../api_url/api_url';
import isCookie_user_authorization from '../controlleur/controlleur';

const domaine = cookie.domaine;
const user = cookie.user;

let table = [];
function AllExpositions(params) {
    let [state, setState] = useState([])
    useEffect(()=>{
        if(isCookie_user_authorization !== "PASSANT"){
            window.location.href = '/login#!';
        }else{
            fetch(api_url+'getAllExposition')
            .then(res => res.json())
            .then( succes => {
                let exposition = [];
                if(succes.data && succes.data.length >0){
                    succes.data.sort((a, b) => new Date(b.createdAt)-new Date(a.createdAt)).forEach( item => {
                        exposition.push(
                            `<div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <h6 class="card-header text-center">${item.titre}</h6>
                                    <div class="card-body">
                                        <img class="card-img-top" style="height:150px" src="${item.photo}" alt="Card image cap"/>
                                        <div class="card-body">
                                            <p class="card-text" style="textAlign:justify">${item.description.slice(0, 75)}</p>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-outline-danger me-md-4 position-relative" title="Aimer" id="${item._id}-${item.user_id[0]._id}-like">
                                                
                                                <i class="bi bi-heart-fill" id="${item._id}-${item.user_id[0]._id}-like" title="aimer"></i>
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    ${succes.like.filter(item2 => item2.exposition[0]===item._id).length <= 99 ? succes.like.filter(item2 => item2.exposition[0]===item._id).length : succes.like.filter(item2 => item2.exposition[0]===item._id).length.toStrin()+'+' }
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>
                                            </button>

                                            <button type="button" class="btn btn-outline-info me-md-4 position-relative" title="Laisser un commentaire" id="${item._id}-${item.user_id[0]._id}-comment" onClick="window.location.href='/commentaire#!${item._id}-${item.user_id[0]._id}'">
                                                <i class="bi bi-chat-left-text-fill"></i>
                                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                                                    ${succes.comment.filter(item2 => item2.exposition[0]===item._id).length <= 99 ? succes.comment.filter(item2 => item2.exposition[0]===item._id).length : succes.comment.filter(item2 => item2.exposition[0]===item._id).length.toStrin()+'+' }
                                                    <span class="visually-hidden">unread messages</span>
                                                </span>
                                            </button>

                                            <a href="mailto:${item.user_id[0].email}"><button type="button" class="btn btn-outline-success me-md-4 position-relative" title="E-mail à l'auteur" id="${item._id}-${item.user_id[0]._id}-call">
                                                <i class="bi bi-envelope-at-fill"></i>
                                            </button></a>
                                        </div><br/>
                                        <div class="row">
                                            <a class="btn btn-outline-warning" id="${item._id}-${item.user_id[0]._id}-read" onClick="window.location.href='/detail#!${item._id}-${item.user_id[0]._id}'" href="#!">Savoir plus →</a>
                                        </div>
                                    </div>
                                    <span  role="alert" id="alert-like-${item._id}-${item.user_id[0]._id}-like"></span>
                                </div>
                            </div>`
                        )
                    });
                    setState(exposition);
                }
            })
            .catch(error => console.log(error))
        }
    }, [])
    if(isCookie_user_authorization !== "PASSANT"){
        return (
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3" style={{ color: 'orange' }}>Le travail bien fait se trouve chez </h3>
                            <h1 className="fw-bolder" >Sophia-Culturas (S-!-C)</h1>
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
                            
                    <div className="row" id="exposition-row-all">
                        {
                            state.length > 0 ? (
                                eve=>{
                                    document.getElementById('exposition-row-all').innerHTML= [...state].join(''); 
                                    (()=>{document.querySelectorAll(`button[title="Aimer"]`).forEach(item => item.addEventListener('click', createLike))})() 
                                }
                            )() : state 
                        }
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
    }else{
        window.location.href = '/login#!';
    }
}

function createLike(event){
    if(isCookie_user_authorization !== "PASSANT"){
        const id=event.target.id;
        const alertLike = document.getElementById('alert-like-'+id);
        let formaData = new FormData();
        formaData.append('commentateur', cookie.user._id);
        formaData.append('auteur', id.split('-')[1]);
        formaData.append('exposition', id.split('-')[0]);

        const data = new URLSearchParams(formaData);

        fetch(api_url+'createLike', {
            method: 'POST',
            body: data,
            headers: { Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            alertLike.className = "alert alert-success text-center"
            alertLike.textContent = succes.msg;
            const intervalle = setInterval(() => {
                alertLike.className = ""
                alertLike.textContent = "";
                clearInterval(intervalle)
            }, 1500);
        })
    }else{
        window.location.href = '/login#!';
    }
}

export default AllExpositions;