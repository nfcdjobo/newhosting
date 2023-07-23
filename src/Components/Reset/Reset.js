// import '../../css/styleCss.css';

function Reset(params) {
    return (
        <div className="App">
            <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <a href="/"><img src="#" className="" alt="logo" title="Logo Sophia-Culturas"></img></a>
                    <h2 className="section-heading">Réenitialisation</h2>
                    <h3 className="section-subheading text-muted">Réenitialisez votre mot de passe oublié avec <a href="#">Sophia-Culturas</a></h3>
                 </div>
                
                <form id="formulaire" data-sb-form-api-token="API_TOKEN">
                     <div className="row ">
                        <div className="col-lg-6">
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="email" className="input-group-text" id="basic-addon1">Adresse email</label>
                                <input type="text" name="email" className="form-control" placeholder="Adresse email" aria-label="email" id="email" aria-describedby="basic-addon1" required/>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="password" className="input-group-text" id="basic-addon1">Nouveau mot de passe</label>
                                <input type="password" name="password" className="form-control" placeholder="Nouveau mot de passe" aria-label="password" id="password" aria-describedby="basic-addon1" required/>
                            </div>
                            <div className="col-lg-12 input-group mb-3">
                                <label htmlFor="passwordConfirm" className="input-group-text" id="basic-addon1">Répéter mot de passe</label>
                                <input type="password" className="form-control" placeholder="Répéter mot de passe" aria-label="passwordConfirm" id="passwordConfirm" aria-describedby="basic-addon1" required/>
                            </div>
                        </div>
                        <div className="row" id="espaceCode">
                            <div className="col-lg-12 mb-3">
                                <label htmlFor="code" className="form-label" id="basic-addon1" style={{ color: "white" }} >Veuillez confirmer le code de validation par l'adresse <a href="#" id="adresse"> nfcdjobo@gmail.com</a> </label>
                                <input type="text" name="code" className="form-control" style={{ width: "90px" }} placeholder="Code" aria-label="code" id="code" aria-describedby="basic-addon1" required/>
                            </div>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <div className="text-center"><button className="btn btn-outline-warning" id="submit" type="submit">Restaurer</button></div>
                        </div>
                    </div>

                     <div className="row">
                        <div className="form-group col-lg-6">
                            <div className="text-start"style={{ color: "white" }}> Je n'ai pas de compte,  <a href="/register"> m'inscrire ici ?</a></div>
                        </div>
                        <div className="form-group col-lg-6">
                            <div className="text-end"style={{ color: "white" }}> Je ne souviens du mot de passe, <a href="/login"> me connecter ici ?</a></div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </div>
    )
}
export default Reset;