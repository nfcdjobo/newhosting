import { useEffect, useState } from "react";
import cookie from "../../Cookies/Cookies";
import api_url from "../../api_url/api_url";
import isCookie_user_authorization from "../controlleur/controlleur";

function ExpositionProfile(params) {
    let [state, setState] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(() => {
        if(isCookie_user_authorization === "AUTEUR" || isCookie_user_authorization === "GESTIONNAIRE" || isCookie_user_authorization === "PASSANT"){
            const table = [];
            if (cookie.user.entite === "AUTEUR"){
                fetch(api_url + "getExpositionByAutor/" + cookie.user._id, {
                    method: "GET",
                    headers: { Authorization: `token ${cookie.token}` }
                })
                .then((res) => res.json())
                .then((succes) => {
                    if(succes.data && succes.data.length > 0){
                        let row = document.getElementById("exposition-row");
                        const data = succes.data.sort(
                            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                        );
                        
                        const AllCommentaire = succes.comment.filter(itemCom => itemCom.auteur[0]==data[0].user_id[0]);
                        const AllLike = succes.like.filter(itemLi => itemLi.auteur[0]==data[0].user_id[0]);
                        row.textContent = "";
                        data.forEach((item) => {
                            let comments = AllCommentaire.filter(element => element.exposition[0] === item._id);
                            let likes = AllLike.filter(element => element.exposition[0] === item._id);
                            table.push(`<div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <h6 class="card-header text-center">${item.titre}</h6>
                                    <div class="card-body">
                                        <img class="card-img-top" style="height:150px" src="${item.photo}" alt="Card image cap"/>
                                        <div class="card-body">
                                            <p class="card-text" style="text-align:justify">${item.description.slice(0, 25)} (....)</p>
                                        </div>
                                        <div class="row">
                                            <a class="btn btn-outline-warning" id="${item._id}" href="editeExposition#!${item._id}">Modifier →</a>
                                        </div>
                                        <br/>
                                        
                                        <button type="button" class="btn btn-outline-danger me-md-4 position-relative btn-sm" >
                                            <i class="bi bi-heart-fill"></i>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${likes.length}</span>
                                        </button>

                                        <button type="button" class="btn btn-outline-info me-md-4 position-relative btn-sm" >
                                            <i class="bi bi-chat-left-text-fill"></i>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${comments.length}</span>
                                        </button>
                                        <hr/>

                                        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group me-md-4" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-success position-relative btn-sm" >
                                                    <i class="bi bi-heart-fill"></i>
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${Math.floor(likes.length*100/AllLike.length)}%</span>
                                                </button>
                                            </div>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end" role="group" aria-label="Second group">
                                                <button type="button" class="btn btn-secondary position-relative btn-sm" >
                                                    <i class="bi bi-chat-left-text-fill"></i>
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${Math.floor(comments.length*100/AllCommentaire.length)}%</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
                        })
                        setState(table);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            

            }else if (cookie.user.entite === "GESTIONNAIRE") {
                fetch(api_url + "getAllDomaine")
                .then(dom => dom.json())
                .then(domain => {
                    document.querySelector("nav[aria-label='Pagination']").hidden = true;
                    let row = document.getElementById("exposition-row");
                    fetch(api_url + "getAllUsers", {
                        method: 'GET',
                        headers: { Authorization: `token ${cookie.token}` },
                    })
                    .then(us => us.json())
                    .then(user => {
                        fetch(api_url + "getAllExposition")
                        .then(expo => expo.json())
                        .then(exposit => {
                            const domaine = Array.isArray(domain.data) && domain.data.length > 0 ? domain.data.filter(item=> item.libelle != "GESTIONNAIRE" && item.libelle != "ADMIRATEUR") : [];
                            const usersAUTEUR = Array.isArray(user.data) && user.data.length > 0 ? user.data.filter((item) => item.entite==="AUTEUR") : [];
                            const usersPASSANT = Array.isArray(user.data) && user.data.length > 0 ? user.data.filter((item) => item.entite==="PASSANT") : [];
                            const expostion = Array.isArray(exposit.data) && exposit.data.length > 0 ? exposit.data : [];
                            row.innerText = "";
                            row.innerHTML += 
                            `<div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">DOMAINE D'ACTIVITE</h5>
                                        <p class="card-text text-center">${domaine.length}</p>
                                        <a href="/show#!domaine" class="btn btn-primary">Voir tout</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">REALISATEURS</h5>
                                        <p class="card-text text-center">${usersAUTEUR.length}</p>
                                        <a href="/show#!auteurs" class="btn btn-primary">Voir tout</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">GRAND PUBLIC</h5>
                                        <p class="card-text text-center">${usersPASSANT.length}</p>
                                        <a href="/show#!abonnes" class="btn btn-primary">Voir tout</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 col-xl-4">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">EXPOSITIONS</h5>
                                        <p class="card-text text-center">${expostion.length}</p>
                                        <a href="/show#!exposition" class="btn btn-primary">Voir tout</a>
                                    </div>
                                </div>
                            </div>
                            `;
                        })
                    })
                })
                
            }else if (cookie.user.entite === "PASSANT"){
                fetch(api_url+'getLikeByCommentateur/'+cookie.user._id, {
                    method: 'GET',
                    headers: { Authorization: `token ${cookie.token}` },
                })
                .then(res => res.json())
                .then(succes => {
                    table.push(
                        `<div class='col-lg-8'>
                    <div class="card mb-4">
                        <div class="card-header text-center">MES COMMENTAIRES</div>
                        <div class="card-body">
                        <div class="accordion accordion-flush" id="commentaire">`
                    );
                    
                    succes.comment.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(item => {
                        table.push(
                            `<div class="accordion-item btn-sm">
                            <h2 class="accordion-header" id="flush-heading-${item._id}">
                                <button class="accordion-button collapsed btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${item._id}" aria-expanded="false" aria-controls="flush-collapse-${item._id}">
                                ${item.exposition[0].titre}  <i class="me-md-4"></i> <code>( ${new Date(item.createdAt).toLocaleDateString('fr-FR', options)} )</code>
                                </button>
                            </h2>
                            <div id="flush-collapse-${item._id}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${item._id}" data-bs-parent="#commentaire">
                                <div class="card-header text-center">REALISATEUR : ${item.exposition[0].user_id[0].nomPrenom} </div>
                                <div class="accordion-body"> ${item.contenu} </div>
                                <a href="detail#!${item.exposition[0]._id}-${item.exposition[0].user_id[0]._id}}"><button type="button" class="btn btn-outline-warning btn_sm">Voir le produit</button></a>
                            </div>
                            </div>`
                        )
                    })
                    table.push(
                        `</div>
                        </div>
                    </div>
                    </div>`
                    );
                    setState(table)
                })
            }
        }else{
            window.location.href = '/login#!';
        }
        
    }, []);

    return(
        <>
            {
                (()=>{
                    if(document.getElementById('exposition-row')){
                        document.getElementById('exposition-row').innerHTML = [...state].join('');
                    }
                })()
            }
        </>
    )
    
}


export default ExpositionProfile