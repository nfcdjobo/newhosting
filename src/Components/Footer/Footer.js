import deconnexion from '../../deconnexion/deconnexion';
import moduleName from '../../javascript/scripts';
// deconnexion
function Footer() {
    return (
        <footer className="footer py-4">
            <div class="modal fade" id="deconnexion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deconnexionLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-center" id="deconnexionLabel">DEMANDE DE DECONNEXION</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ANNULER</button>
                        <button type="button" class="btn btn-info" data-bs-dismiss="modal" aria-label="Close" onClick={deconnexion}>CONFIRMER</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 text-lg-start">Copyright &copy; Your Website 2023</div>
                    <div className="col-lg-4 my-3 my-lg-0">
                        <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                        <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                        <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                    </div>
                </div>
            </div>
            <script src={moduleName}></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
        </footer>
    )
}

export default Footer;