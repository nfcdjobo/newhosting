import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cookie from '../../Cookies/Cookies';
import FormulaireExpositionEdite from './FormulaireExpositionEdite';
import isCookie_user_authorization from '../controlleur/controlleur';

const domaine = cookie.domaine;
const user = cookie.user;
function EditeExposition(params) {
    if(isCookie_user_authorization !== "AUTEUR"){
        window.location.href = '/login#!';
    }else{
        return (
            <>
                <Navbar />
                <header className="py-5 bg-light border-bottom mb-4">
                    <div className="container">
                        <div className="text-center my-5">
                            <h3 className="lea mb-3">Mettre à jour vos expositions chez </h3>
                            <h1 className="fw-bolder" style={{ color: 'orange' }} >Sophia-Culturas (S-!-C)</h1>
                        </div>
                    </div>
                </header>
                <FormulaireExpositionEdite />
                <Footer  />
            </>
        )
    }
}

export default EditeExposition;