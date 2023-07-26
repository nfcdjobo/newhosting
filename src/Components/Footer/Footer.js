import deconnexion from '../../deconnexion/deconnexion';
import moduleName from '../../javascript/scripts';
function Footer() {
    return (
        <footer className="footer py-4">
            <div className="modal fade" id="deconnexion" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deconnexionLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="deconnexionLabel">DEMANDE DE DECONNEXION</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Une demande de fermèture de session (déconnexion) est sur le point d'être effectuée.</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ANNULER</button>
                        <button type="button" className="btn btn-info" data-bs-dismiss="modal" aria-label="Close" onClick={deconnexion}>CONFIRMER</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 text-lg-start">Copyright &copy; Sophia-Culturas {new Date().getFullYear()}</div>
                    <div className="col-lg-4 my-3 my-lg-0">
                        <a className="btn btn-dark btn-social mx-2" href="https://wa.me/+2250575554499" aria-label="whatsApp" title='WhatsApp' target="_blank"><i className="fab fa-whatsapp"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="https://www.facebook.com/profile.php?id=100068908539248" aria-label="Facebook" title='Facebook' target="_blank"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="https://www.linkedin.com/in/n-dri-fran%C3%A7ois-car%C3%AAm-djobo-290921159/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BFbJGm54VTuqgcq7gi2FNog%3D%3D" aria-label="LinkedIn" title="LinkedIn" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                        <a className="link-dark text-decoration-none me-3" href="#!" title='nfcdjobo@gmail.com (+225 057 555 4499)'>Conçu par</a>
                        <a className="link-dark text-decoration-none" href="#!" title='nfcdjobo@gmail.com (+225 057 555 4499)'>DJOBO N'dri François C</a>
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