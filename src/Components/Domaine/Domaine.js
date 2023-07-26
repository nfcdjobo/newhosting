import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer';
import logo from '../../assets/img/logos/logo.png';
import api_url from '../../api_url/api_url';
import cookie from '../../Cookies/Cookies';
import isCookie_user_authorization from '../controlleur/controlleur';


function Domaine(params) {
    if(isCookie_user_authorization === "GESTIONNAIRE"){

        const chanImage = event=>{
            if(event.target.files[0]){
                const image = document.getElementById('image');
                image.onload = ()=>{URL.revokeObjectURL(image.src)}
                image.src = URL.createObjectURL(event.target.files[0]);
            }
        }
        const soumetDomaine = (event) => {
            event.preventDefault();
            const libelle = event.target.querySelector('#libelle').value;
            const photo = event.target.querySelector('#photo').files[0];
            
            const fileErreur = event.target.querySelector('#fileErreur');
            fileErreur.textContent = "";
            const alerter = document.getElementById('alert');
            alerter.className = "";
            alerter.textContent = "";
            const formData = new FormData();
            formData.append("libelle", libelle);
            if(photo){
                if(photo.size <= 1024*1024*2){
                    formData.append('photo', photo);
                }else{
                    event.target.querySelector('#photo').focus();
                    fileErreur.textContent = photo.size/(1024*1024) + " Mo est trop volumineuse comment taille du fichier. Au  plus 2 Mo."
                    return;
                }
            }
            fetch(api_url+'createDomaine', {
                method: 'POST',
                body: formData,
                headers: { Authorization: `token ${cookie.token}`}
            })
            .then(res=>res.json())
            .then(()=>{
                event.target.querySelector('#libelle').value = '';
                event.target.querySelector('#photo').value = '';
                alerter.className = "alert alert-success text-center";
                alerter.textContent = "Ajout effectué avec succès !";
                event.target.querySelectorAll('input').forEach(item =>  item.value = "");
            })
            .catch(()=>{
                alerter.className = "alert alert-danger text-center";
                alerter.textContent = "Une érreur c'est produite lors lors du traîtement de l'enregistrement, veuillez donc réessayer !";
            })
        }

        return (
        <>
            <Navbar />
                <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <br></br><br></br>
                         <a href="/"><img src={logo} className="" alt="logo" title="Logo Sophia-Culturas" style={{ width: 250+'px' }}></img></a>
                        <br></br><br></br>
                        <h2 className="section-heading">Ajout des domaine</h2>
                        <h3 className="section-subheading text-muted"><a href="#">Sophia-Culturas</a> vous souhaite les bienvenues</h3>
                    </div>
                    <form data-sb-form-api-token="API_TOKEN" onSubmit={soumetDomaine} encType="multipart/form-data">
                        <div className="row ">
                            <div className="col-lg-6" id="col-lg-6-1">
                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="libelle" className="input-group-text">Libelle du domaine</label>
                                    <input type="text" name="libelle" className="form-control" placeholder="Nom du domaine artistique" aria-label="libelle" id="libelle" aria-describedby="basic-addon1" required/>
                                </div>
                            </div>

                            <div className="col-lg-6" id="col-lg-6-2">
                                <div className="col-lg-12 input-group mb-3">
                                    <label htmlFor="photo" className="input-group-text">Image descriptive</label>
                                    <input type="file" name="photo" className="form-control" placeholder="Image descriptive du domaine" aria-label="photo" id="photo" aria-describedby="basic-addon1" onChange={chanImage} required/>
                                </div>
                                <code id='fileErreur'></code>
                            </div>
                            <hr></hr>
                            <div className="d-grid gap-2 col-6 mx-auto" id="submiter">
                                <div className="text-center" id="div-connexion"><button className="btn btn-outline-warning" id="submitRegister" type="submit">Connexion</button></div>
                            </div>
                            <hr></hr>
                            <div className="text-center" >
                                <img  className="rounded" alt="" id="image" style={{ width: '12rem', maxHeight: '12rem' }}/>
                            </div>
                            <hr></hr>
                            <div className="" role="alert" id="alert"></div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>)
    }else{
        window.location.href = "/login#!";
    }
}

export default Domaine;
