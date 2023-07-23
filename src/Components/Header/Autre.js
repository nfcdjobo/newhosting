function MeunAutre(params) {
    return (
        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li className="nav-item"><a className="nav-link" href="/expositions">Exprositions</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#deconnexion" >Déconnexion</a></li>
        </ul>
    )
}

export default MeunAutre;