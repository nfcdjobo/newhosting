import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";



function FormulaireExposition(params) {
    return (
        <>
            <div className="card-body">
                <form id="form-edite-user" encType="multipart/form-data" onSubmit={createExposition}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="titre" name="titre" placeholder="Titre de l'oeuvre..." maxLength={40} required onInput={writeTitre}/>
                        <label htmlFor="titre">Titre de l'exposition</label>
                    </div>

                    <div className="col-lg-12 input-group mb-3">
                        <label htmlFor="photo" className="input-group-text">Image descriptive</label>
                        <input type="file" name="photo" className="form-control" placeholder="Image descriptive du domaine" aria-label="photo" id="photo" aria-describedby="basic-addon1" required onChange={changeFile} accept=".png, .jpg, .jpeg, .webp, .avif, .gif" />
                    </div>
                    <code id="fileErreur"></code>
                    
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="description" maxLength={1500} style={{ height: "100px" }} required onInput={writeDescription}></textarea>
                        <label htmlFor="description">Description de l'oeuvre</label>
                    </div>
                    <hr />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" type="submit">Envoyer</button>
                    </div>
                </form>
            </div>
        </>
    )
}


    function createExposition(event){
        event.preventDefault();
        const alerter = document.getElementById('alert');
        alerter.className = ""; alerter.textContent = "";
        const formData = new FormData();

        const photo = event.target.querySelector('#photo').files[0];
        const fileErreur = document.getElementById('fileErreur');
        fileErreur.textContent = "";
        
        if(photo){
            if(photo.size <= 1024*1024*2){
                formData.append('photo', photo);
            }else{
                event.target.querySelector('#photo').focus();
                fileErreur.textContent = photo.size/(1024*1024) + " Mo est trop volumineuse comment taille du fichier. Au  plus 2 Mo."
                return;
            }
        }
        formData.append("titre", event.target.querySelector('#titre').value);
        formData.append("description", event.target.querySelector('#description').value);
        formData.append("user_id", cookie.user._id);
        formData.append('email', cookie.user.email)
        fetch(api_url+'createExposition', {
            method: 'POST',
            body: formData,
            headers: { Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            if(succes.msg.includes('succès')){
                alerter.className = "alert alert-success text-center";
                alerter.textContent = "Oeuvre ajoutée avec succès !";
                event.target.querySelectorAll('input, textarea').forEach(item => {
                    item.value = "";
                });
            }else{
                alerter.className = "alert alert-danger text-center";
                alerter.textContent = "Une érreur est survenue lors de l'enrégistrement, veuillez donc réessayer plus tard !";
            }
        })
    }

    function writeTitre(event) {document.getElementById('vueTitre').textContent = event.target.value;}

    function changeFile(event) {
        const vueImage = document.getElementById("vueImage");
        if(event.target.files[0]){
            vueImage.onload = () => {URL.revokeObjectURL(vueImage.src)}
        }
        vueImage.src = URL.createObjectURL(event.target.files[0]);
    }

    function writeDescription(event) {
        document.getElementById('vueDescription').textContent = event.target.value;
    }



export default FormulaireExposition;