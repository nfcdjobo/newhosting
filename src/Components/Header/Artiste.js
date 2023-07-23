import Notification from './Notification';
function MeunArtiste(params) {
    return (
        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li className="nav-item"><a className="nav-link" href="/monPublic#!">Mon public</a></li>
            <li className="nav-item"><a className="nav-link" href="/exposition#!">Ajoute Exposition</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile#!">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#deconnexion" >Déconnexion</a></li>
            <Notification />
            
        </ul>
    )
}

export default MeunArtiste;