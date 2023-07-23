import { useEffect, useState } from "react";
import cookie from "../../Cookies/Cookies";
import api_url from "../../api_url/api_url";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import isCookie_user_authorization from "../controlleur/controlleur";


const cooki = cookie;
function LireCommentaire(params) {
    const [state, setState] = useState([]);    
    useEffect(()=>{
        if(isCookie_user_authorization === "AUTEUR"){
            const formData = new FormData();
            formData.append('id', window.location.href.split('#!')[1]);
            const datas = new URLSearchParams(formData);
            fetch(api_url+'updateCommantaire', {
                method: 'POST',
                body: datas,
                headers: {Authorization: `token ${cooki.token}`}
            })
            .then(res => res.json())
            .then(succes => {
                // 
            })
            .catch(error => console.log(error));

            fetch(api_url+'getAllInfoComment/'+window.location.href.split('#!')[1], {headers: {Authorization: `token ${cookie.token}`}})
            .then(res => res.json())
            .then(succes => setState(succes.data))
            .catch(error => console.log(error));
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
                        <h3 className="lea mb-3">Lecture des commentaire chez </h3>
                        <h1 className="fw-bolder" style={{ color: 'orange' }}>Sophia-Culturas (S-!-C)</h1>
                    </div>
                </div>
            </header>
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb">
                            <div className="card-header text-center">COMMENTATEUR</div>
                            <div className="card" >
                                <img src={ state.length >0 ? state[1].commentateur[0].photo : state} className="card-img-top" alt="Photo" style={{width:100+'%', height:200+"px"}}/>
                                <div className="card-body">
                                    <h5 className="card-title">{state.length >0 ? state[1].commentateur[0].nomPrenom : state}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{state.length >0 ? state[1].commentateur[0].nationalite: state}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <div className="card-header text-center">Laisser votre commentaire ici</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <p className="card-text">{state.length >0 ? state[0].contenu : state}</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <h5 className="card-title">{state.length >0 ? state[0].exposition[0].titre: state}</h5>
                                        <img src={state.length >0 ? state[0].exposition[0].photo: state} className="card-img-top" alt="Photo" style={{width:100+'%', height:200+"px"}}/>
                                    </div>
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
// const formData = new FormData();
// formData.append('id', window.location.href.split('#!')[1])
// const datas = new URLSearchParams(formData);
// fetch(api_url+'updateCommantaire', {
//     method: 'POST',
//     body: datas,
//     headers: {Authorization: `token ${cooki.token}`}
// })
// .then(res => res.json())
// .then(succes => {
//     // succes
// })
// .catch(error => console.log(error))

function readComment(event){
    event.preventDefault();
    alert(event.target.id)
}

export default LireCommentaire;