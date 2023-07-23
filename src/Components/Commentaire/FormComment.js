import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";

function FormComment(props){
    const urlPage = window.location.href;
    return (
        <>
            <div className="card-body">
                <form id="form-edite-user" encType="multipart/form-data" onSubmit={saveCommentaire}>
                    
                    <div className="form-floating mb-3" hidden={true}>
                        <input type="text" className="form-control" id="commentateur" name="commentateur" placeholder="Leave a comment here" defaultValue={props.infos.user._id} required/>
                        <label htmlFor="commentateur">Commentateur</label>
                    </div>

                    <div className="form-floating mb-3" hidden={true}>
                        <input type="text" className="form-control" defaultValue={urlPage.slice(urlPage.indexOf('#!')+2).split('-')[0]} id="exposition" name="exposition" placeholder="Leave a comment here"  required/>
                        <label htmlFor="exposition">Exposition</label>
                    </div>

                    <div className="form-floating mb-3" hidden={true}>
                        <input type="text" className="form-control" defaultValue={urlPage.slice(urlPage.indexOf('#!')+2).split('-')[1]} id="auteur" name="auteur" placeholder="Leave a comment here"  required/>
                        <label htmlFor="auteur">Auteur d'oeuvre</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="titre" name="titre" placeholder="Leave a comment here" required/>
                        <label htmlFor="titre">Entrer un titre au commentaire...</label>
                    </div>
                    
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="contenu" name="contenu" maxLength={500} style={{ height: "200px" }} required></textarea>
                        <label htmlFor="contenu">Entrer le contenu du commentaire...</label>
                    </div>
                    <hr />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" type="submit">Envoyer</button>
                    </div>
                    <br/>
                    <div role="alert" id="alert-commentaire"></div>
                </form>
            </div>
        </>
    )
}


function saveCommentaire(event) {
    event.preventDefault()
    const alertCommentaire = document.getElementById('alert-commentaire');
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);
    fetch(api_url+'createComment', {
        method: 'POST',
        body: data,
        headers: { Authorization: `token ${cookie.token}` }
    })
    .then(res => res.json())
    .then(succes =>{
        alertCommentaire.className = "alert alert-success text-center";
        alertCommentaire.textContent = succes.msg;
        const intervalle = setInterval(() => {
            window.location.href = '/expositions#!';
            clearInterval(intervalle);
        }, 1000);
    })
    .catch(error => {
        alertCommentaire.className = "alert alert-success text-center";
        alertCommentaire.textContent = "Comment non accepté.";
    })
}

export default FormComment;