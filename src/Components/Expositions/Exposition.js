import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cookie from '../../Cookies/Cookies';
import FormulaireExposition from './FormulaireExposition';
import ApparenceExpossition from './ApparenceExposition';
import isCookie_user_authorization from '../controlleur/controlleur';

const domaine = cookie.domaine;
const user = cookie.user;
function Exposition(params) {
    if(isCookie_user_authorization !== "AUTEUR"){
        window.location.href = '/login#!';
    }else{
        return (
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3">Publier vos expositions chez </h3>
                            <h1 className="fw-bolder" style={{ color: 'orange' }}>Sophia-Culturas (S-!-C)</h1>
                        </div>
                    </div>
                </header>
                
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                                <ApparenceExpossition />
                        </div>
                        
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card mb-4">
                                        <div className="card-header">Ajout d'Oeuvre</div>
                                        <div className="card-body">
                                            <FormulaireExposition />
                                        </div>
                                        <div id="alert" role="alert"></div>
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>
                <Footer  />
            </>
        )
    }
    
}

export default Exposition;