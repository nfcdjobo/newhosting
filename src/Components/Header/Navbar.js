import { useEffect, useState } from 'react';
import navbarLogo from '../../assets/img/logos/logo.png';
import MeunArtiste from './Artiste';
import MeunAutre from './Autre';
import MeunGestionnaire from './Gestionnaire';
import Indefinie from './Indefinie';
import cookie from '../../Cookies/Cookies';
import api_url from '../../api_url/api_url';
import front_url from '../../api_url/front_url';

function Navbar() {
    let [state, setState] = useState([]);
    let talbe = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(() => {
        fetch(api_url+'getCommentJoint', {
            method:'GET',
            headers: {Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            talbe = [];
            if(succes.data && succes.data.length > 0){
                succes.data[0].forEach((item, key) => {
                    talbe.push(`<a href="lireCommentaire#!${item._id}" ref="notification" linker="lireCommentaire#!${item._id}"  class="btn btn-light border-start text-start" ><img src="${succes.data[1][key].commentateur[0].photo}" linker="lireCommentaire#!${item._id}" class="rounded-circle" alt="" style="height: 25px; width:25px"/> ${succes.data[1][key].commentateur[0].nomPrenom} <code linker="lireCommentaire#!${item._id}"> Dépuis ${new Date(item.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</code></a>`);
                });
                setState(talbe);
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }, []);

    let Menu = '';
    if(cookie){
        Menu = cookie.user.entite === "PASSANT" ? MeunAutre : (cookie.user.entite === "GESTIONNAIRE" ? MeunGestionnaire : MeunArtiste)
    }else{
        Menu = Indefinie;
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="/" ><img src={navbarLogo} alt="..." /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <Menu />
                    </div>
                </div>
            </nav>
            <div className="modal fade" id="exampleModalScrollable" tabIndex="1" aria-labelledby="exampleModalScrollableTitle"  style={{display: "none"}} aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalScrollableTitle">Messages et commentaires en attentes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-grid gap-1" id="al-comment">
                                { 
                                    (()=>{
                                        if(state.length >0){
                                            document.getElementById('al-comment').innerHTML = [...state].join('')
                                        }
                                        (()=>{
                                            document.querySelectorAll("a[ref=notification]").forEach(item => item.addEventListener('click', refraicheComment))
                                        })()
                                    })()

                                    
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function refraicheComment(event){
    window.location.href = front_url+event.target.getAttribute('linker');
    window.location.reload();
}

export default Navbar;