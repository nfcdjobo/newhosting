import api_url from "../../api_url/api_url"
import cookie from "../../Cookies/Cookies";

function ExpositionsToComment(params) {
    fetch(api_url+'getAllExposition')
    .then(res => res.json())
    .then(async succes => {
        let exposition = [];
        if(succes.data && succes.data.length >0){
            let ExpositionRowAll =  document.getElementById('exposition-row-all');
            document.getElementById('exposition-row-all').textContent = "";
            exposition = succes.data;
            exposition.forEach(async item => {
                fetch(api_url+'getUserById/'+item.user_id, {
                    headers: { Authorization: `token ${cookie.token}`}
                })
                .then(res => res.json())
                .then(success => {
                    const artiste = success.auteur;
                    ExpositionRowAll.innerHTML+=`<div class="col-lg-4 col-md-6 col-xl-4">
                        <div class="card mb-4">
                            <h6 class="card-header text-center">${item.titre}</h6>
                            <div class="card-body">
                                <img class="card-img-top" style="height:150px" src="${item.photo}" alt="Card image cap"/>
                                <div class="card-body">
                                    <p class="card-text" style="textAlign:justify">${item.description}</p>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn btn-outline-danger" title="aimer" id="${item._id}-${artiste._id}-like"><i class="bi bi-hearts" id="${item._id}-${artiste._id}-like" title="aimer"></i></button>&#160;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-outline-info" title="Laisser un commentaire" id="${item._id}-${artiste._id}-comment" onClick="window.location.href='/commentaire#!${item._id}-${artiste._id}'"><i class="bi bi-chat-left-text-fill"></i></button>&#160;&nbsp;&nbsp;
                                    <button type="button" class="btn btn-outline-success" title="Contacter l'auteur" id="${item._id}-${artiste._id}-call"><i class="bi bi-headset"></i></button>&#160;&nbsp;&nbsp;
                                </div><br/>
                                
                                <div class="row">
                                    <a class="btn btn-outline-warning" id="${item._id}-${artiste._id}-read" onClick="window.location.href='/detail#!${item._id}-${artiste._id}-${cookie.user._id}'" href="#!">Savoir plus →</a>
                                </div>
                            </div>
                            <span  role="alert" id="alert-like-${item._id}-${artiste._id}-like"></span>
                        </div>
                    </div>`; 
                })
            });
        }
    })
    
    return(
        <></>
    )
}



export default ExpositionsToComment