import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import InfosUser from './InfosUser';
import ModifierInfoUser from './ModifierInfoUser';
import ReseauxSociaux from './ReseauxSociaux';
import cookie from '../../Cookies/Cookies';
import ExpositionProfile from './ExpositionProfile';
import isCookie_user_authorization from '../controlleur/controlleur';

const domaine = cookie.domaine;
const user = cookie.user;

function Profile(params) {
  if(isCookie_user_authorization==="GESTIONNAIRE" || isCookie_user_authorization==="AUTEUR" || isCookie_user_authorization==="PASSANT"){
    return (
      <>
        <Navbar />
        <header className="py-5 bg-light border-bottom mb-4">
          <div className="container">
            <div className="text-center my-5">
              <h3 className="lea mb-3">Bienvenue chez </h3>
              <h1 className="fw-bolder">Sophia-Culturas (S-!-C)</h1>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="card mb-4" id="gameToggle">
                <InfosUser user={user} />
              </div>
              <div className="card mb-4" id="gameToggle2" hidden={true}>
                <ModifierInfoUser user={user} />
              </div>
              <ReseauxSociaux user={user} />
            </div>

            <div className="col-lg-9">
              <div className="card mb-4">
                <div className="card-header">Search</div>
                <div className="card-body">
                  <div className="input-group">
                    <input className="form-control" type="search" aria-describedby="button-search"/>
                    <button className="btn btn-primary" id="button-search" type="button" >Recherche</button>
                  </div>
                </div>
              </div>

              <div className="row" id="exposition-row">
                <ExpositionProfile />
              </div>

              <nav aria-label="Pagination">
                <hr className="my-0" />
                <ul className="pagination justify-content-center my-4">
                  <li className="page-item disabled">
                    <a
                      className="page-link"
                      href="#"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#!">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      3
                    </a>
                  </li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#!">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#!">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }else{
    window.location.href = "/login#!";
  }
  
    
}

export default Profile;