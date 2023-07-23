import Microsoft from '../../assets/img/logos/microsoft.svg';
import Google from '../../assets/img/logos/google.svg';
import Facebook from '../../assets/img/logos/facebook.svg';
import Ibm from '../../assets/img/logos/ibm.svg';

function Patenaire() {
    return(
        <div className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={Microsoft} alt="..." aria-label="Microsoft Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={Google} alt="..." aria-label="Google Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={Facebook} alt="..." aria-label="Facebook Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={Ibm} alt="..." aria-label="IBM Logo" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Patenaire;