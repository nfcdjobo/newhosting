import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import cookie from '../../Cookies/Cookies';
import FormComment from './FormComment';
import Presentation from './Presentation';
import {useState, useEffect} from 'react';
import api_url from '../../api_url/api_url';
import isCookie_user_authorization from '../controlleur/controlleur';

const cooki = cookie;
function Commentaire(params) {
    let [data, setState] = useState({});
    useEffect(()=>{
        if(isCookie_user_authorization === "PASSANT"){
            const urlPage = window.location.href;
            fetch(api_url+'getByIdExposition/'+urlPage.slice(urlPage.indexOf('#!')+2).split('-')[0], {
                headers: { Authorization: `token ${cookie.token}`}
            })
            .then(res => res.json())
            .then(succes => {
            setState(succes.data);
            });
        }else{
            window.location.href = '/login#!';
        }
    }, []) 
    return (
        <>
            <Navbar />
            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h3 className="lea mb-3">Espace commentaire chez </h3>
                        <h1 className="fw-bolder" style={{ color: 'orange' }}>Sophia-Culturas (S-!-C)</h1>
                    </div>
                </div>
            </header>
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4" id="presentation">
                            <a href="#!"><img className="card-img-top" id="photo" src={data.photo} alt="..." style={{ height: '200px' }}/></a>
                            <div className="card-body">
                                <div className="small text-muted " id="ceatedAt"></div>
                                <h5 className="card-title text-center"  id="username">{data.titre}</h5>
                                <hr/>
                                <div className="card-text" id="usernationalite">{data.description}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mb-4">
                                    <div className="card-header text-center">Laisser votre commentaire ici</div>
                                    <div className="card-body">
                                        <FormComment infos={cooki}/>
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

export default Commentaire;