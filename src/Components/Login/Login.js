
import Footer from '../Footer/Footer';
import Cookies from 'js-cookie';
import Validateur from '../../Validators/Validateur';
import api_url from '../../api_url/api_url';
import logo from '../../assets/img/logos/logo.png';
import isCookie_user_authorization from '../controlleur/controlleur';

function eventement(event) {
    event.preventDefault();
    const email = event.target.querySelector('#email');
    const password = event.target.querySelector('#password');
    const errorEmail = event.target.querySelector('#error-email');
    const errorPassword = event.target.querySelector('#error-password');
    const tel = event.target.querySelectorAll('div[tel=col-lg-6]');
    const alerter = event.target.querySelector('#alert');
    Validateur.validateurEmail(email.value)
    .then(res=>{
        errorEmail.textContent = "";
        errorPassword.textContent = "";
        if(res){
            Validateur.validateurPassword(password.value)
            .then(pass => {
                if(pass){
                    const formData = new FormData(event.target);
                    const urlParams = new URLSearchParams(formData);
                    fetch(api_url+'login', {
                        method: 'POST',
                        body: urlParams
                    })
                    .then(res => res.json())
                    .then(succes => {
                        if(succes.msg.includes('succès')){
                            tel.forEach(item => item.hidden = true);
                            alerter.className = "alert alert-success text-center";
                            if(succes.msg.includes('succès')){
                                alerter.textContent = succes.msg;
                                const aaUser = {
                                    token: succes.token,
                                    user: succes.user,
                                    domaine: succes.domaine
                                }
                                Cookies.set('user_sophia_culturas', JSON.stringify(aaUser), {expires: 1, path: '/'});
                                const intervalle = setInterval(() => {
                                    window.location.href = '/profile';
                                }, 1500);
                            }else{
                                alerter.className = "alert alert-danger text-center";
                                alerter.textContent = succes.msg;
                            }
                        }else{
                            alerter.className = "alert alert-danger text-center";
                            alerter.textContent = succes.msg;
                        }
                    })
                    .catch(() => {
                        alerter.className = "alert alert-danger text-center";
                        alerter.textContent = "Mot de passe incorret !";
                    })
                }else{
                    password.focus();
                    errorPassword.textContent = "Le mot de passe doit être au moins 4 caractère et sans espace !";
                }
            })
        }else{
            email.focus();
            errorEmail.textContent = "Adresse email invalide !";
        }
    })
}

function Login(params) {
    if(isCookie_user_authorization){
        window.location.href = "/profile#!"
    }else{
        return (
            <div>
                <section className="page-section align-items-stretch mb-5" id="contact">
                    <div className="container">
                        <div className="text-center">
                            <a href="/"><img src={logo} className="" alt="logo" title="Logo Sophia-Culturas" style={{ width: 250+'px' }}></img></a>
                            <h2 className="section-heading">Authentification</h2>
                            <h3 className="section-subheading text-muted">Connectez vous à <a href="#">Sophia-Culturas</a></h3>
                        </div>
                        
                        <form id="formulaire" data-sb-form-api-token="API_TOKEN" onSubmit= { eventement }>
                            <div className="row ">
                                <div className="col-lg-6" tel="col-lg-6">
                                    <code id="error-email" style={{ color: 'red' }}></code>
                                    <div className="col-lg-12 input-group mb-3">
                                        <label htmlFor="email" className="input-group-text" id="basic-addon1">Adresse email</label>
                                        <input type="text" name="email" className="form-control" placeholder="Adresse email" aria-label="email" id="email" aria-describedby="basic-addon1" required/>
                                    </div>
                                </div>

                                <div className="col-lg-6" tel="col-lg-6">
                                    <code id="error-password" style={{ color: 'red' }}></code>
                                    <div className="col-lg-12 input-group mb-3">
                                        <label htmlFor="password" className="input-group-text" id="basic-addon1">Mot de passe</label>
                                        <input type="password" name="password" className="form-control" placeholder="Mot de passe" aria-label="password" id="password" aria-describedby="basic-addon1" required/>
                                    </div>
                                
                                </div>
                                
                            </div>

                                
                            <div className="d-grid gap-2 col-6 mx-auto" tel="col-lg-6">
                                <div className="text-center" tel="col-lg-6"><button className="btn btn-outline-warning" id="submit" type="submit">Connexion</button></div>
                            </div>
                            <hr/>
                            <div role="alert" id="alert"></div>

                            <div className="row" id="login-reset" tel="col-lg-6">
                                <div className="form-group col-lg-6">
                                    <div className="text-start"style={{ color: "white" }}> Je n'ai pas de compte ? <a href="/register"> M'inscrire ici</a></div>
                                </div>
                                <div className="form-group col-lg-6">
                                    <div className="text-end"style={{ color: "white" }}> <a href="/reset"> Mot de passe oublié ?</a></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}
export default Login;