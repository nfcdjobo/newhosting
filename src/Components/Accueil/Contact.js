import Validateur from "../../Validators/Validateur";
import api_url from "../../api_url/api_url";

function Contact() {
    return (
        <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Contacter nous</h2>
                    <h3 className="section-subheading text-muted">Ici Sophia-Culturas (S-!-C)</h3>
                 </div>
                <form id="contactForm" data-sb-form-api-token="API_TOKEN" onSubmit={sendMessage}>
                    <div className="row align-items-stretch mb-5">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input className="form-control" id="nomPrenom" name="nomPrenom" type="text" placeholder="Votre nom et Prénom(s) *" data-sb-validations="required" required/>
                                <div className="invalid-feedback" data-sb-feedback="nomPrenom:required">Nom et Prénom(s) sont obligatoire.</div>
                            </div>
                            <div className="form-group">
                                <input className="form-control" id="email" name="email" type="email" placeholder="Adresse E-mail *" data-sb-validations="required,email" required/>
                                <div className="invalid-feedback" data-sb-feedback="email:required">Email obligatoire.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email obligatoire.</div>
                            </div>
                            <div className="form-group mb-md-0">
                                <input className="form-control" id="telephone" name="telephone" type="tel" placeholder="Adresse téléphonique *" data-sb-validations="required" required/>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">Numéro de téléphone obligatoire.</div>
                            </div>
                        </div>
                        <div className="col-md-6 d-grid gap-4">
                            <div className="form-group mb-md-0">
                                
                                <input className="form-control" id="motif" name="motif" type="text" placeholder="Motif du message *" data-sb-validations="required" required/>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">Motif obligatoire</div>
                            </div>

                            <div className="form-group form-group-textarea ">
                                <textarea className="form-control" id="message" name="message" placeholder="Contenu du message *" data-sb-validations="required" required></textarea>
                                <div className="invalid-feedback" data-sb-feedback="message:required">Contenu obligatoire.</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                    <div className="text-center"><button  className="btn btn-warning text-uppercase" id="submitButton" type="submit">Envoyer un Message</button></div>
                    <hr/>

                    <div className="" id="alerter" role="alert"></div>
                </form>
            </div>
        </section>
    )
}

const sendMessage = event=>{
    event.preventDefault();
    event.target.querySelector("#alerter").className = "";
    event.target.querySelector("#alerter").innerHTML = "";
    Validateur.validateurEmail(event.target.querySelector('#email').value)
    .then(emailOption =>{
        if(!emailOption){
            return event.target.querySelector('#email').focus();
        }
        Validateur.validateurTelephone(event.target.querySelector('#telephone').value)
        .then(phoneOption=>{
            if(!phoneOption){
                return event.target.querySelector('#telephone').focus();
            }
            fetch(api_url+"sendMessage", {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target))
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.data){
                    event.target.querySelector("#alerter").className = "alert alert-info text-center";
                    event.target.querySelector("#alerter").innerHTML = succes.msg+" Votre recevrez une réponse par adresse email au plus en 48 heures.";
                    event.target.querySelectorAll("input, textarea").forEach(item => {
                        item.value = "";
                    });
                }else{
                    event.target.querySelector("#alerter").className = "alert alert-danger text-center";
                    event.target.querySelector("#alerter").innerHTML = "Message non envoyé. Service momentanement indisponible, veuillez réessayer plus tard !";
                }
            })
            .catch(error=>{
                event.target.querySelector("#alerter").className = "alert alert-danger text-center";
                event.target.querySelector("#alerter").innerHTML = "Message non envoyé. Service momentanement indisponible, veuillez réessayer plus tard !";
            })
        })
        .catch(error=>{
            event.target.querySelector("#alerter").className = "alert alert-danger text-center";
            event.target.querySelector("#alerter").innerHTML = "Message non envoyé. Service momentanement indisponible, veuillez réessayer plus tard !";
        })
    })
    .catch(error=>{
        event.target.querySelector("#alerter").className = "alert alert-danger text-center";
        event.target.querySelector("#alerter").innerHTML = "Message non envoyé. Service momentanement indisponible, veuillez réessayer plus tard !";
    })
   
}



export default Contact;