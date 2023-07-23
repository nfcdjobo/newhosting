import { useEffect, useState } from 'react';
import api_url from '../../api_url/api_url';

function Portfolio(params) {
    const [state, setState] = useState([]);
    useEffect(()=>{
        try {
            const table = [];
            fetch(api_url+"getAll/table")
            .then(res=>res.json())
            .then(succes=>{
                if(succes.data && succes.data.length > 0){
                    succes.data.sort((a, b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0, 6).forEach((item, index) => {
                        table.push(
                        `<div class="col-lg-4 col-sm-6 mb-4">
                            <div class="portfolio-item">
                                <a class="portfolio-link" data-bs-toggle="modal" href="#TABLEAU${index+1}">
                                    <div class="portfolio-hover">
                                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <img class="img-fluid" style="width: 100%; height: 500px"  src="${item.photo}" alt="TABLEAU${index+1}" />
                                </a>
                                <div class="portfolio-caption">
                                    <div class="portfolio-caption-heading">${item.type}</div>
                                    <div class="portfolio-caption-subheading text-muted">${item.titre}</div>
                                </div>
                            </div>
                        </div>

                        <div class="portfolio-modal modal fade" id="TABLEAU${index+1}" tabindex="-1" role="dialog" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="close-modal" data-bs-dismiss="modal"><button type="button" class="btn btn-outline-dark"><i class="bi bi-x-lg"></i></button></div>
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                <div class="modal-body">
                                                    <h2 class="text-uppercase">${item.titre}</h2>
                                                    <p class="item-intro text-muted">SOPHIA-CULTURAS (S-!-C)</p>
                                                    <img class="img-fluid d-block mx-auto" src="${item.photo}" alt="TABLEAU${index+1}" />
                                                    <p>${item.resume}</p>
                                                    <ul class="list-inline">
                                                        <li><strong>SOUS-TITRE:</strong> ${item.sousTitre}</li>
                                                        <li><strong>CATEGORIE:</strong> ${item.type}</li>
                                                    </ul>
                                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                        <i class="fas fa-xmark me-1"></i> FERMER CE TABLEAU
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                    });
                    setState(table);
                }
            })
            .catch(error=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    
    return (
        <>
            <section className="page-section bg-light" id="portfolio">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">ECHANTILLON DES TABLEAUX</h2>
                        <h3 className="section-subheading text-muted">SOPHIA-CULTURAS (S-!-C)</h3>
                    </div>
                    <div className="row" id='all-tableaux'>
                        {
                            (()=>{
                                if(document.getElementById('all-tableaux')){
                                    document.getElementById('all-tableaux').innerHTML = [...state].join('');
                                }
                            })()
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Portfolio;