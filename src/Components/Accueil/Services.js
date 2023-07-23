import { useEffect, useState } from "react";
import api_url from "../../api_url/api_url";

function Services(params) {
  const [state, setState] = useState([]);

  useEffect(()=>{
    const table = [];
    fetch(api_url+'getAll/service')
    .then(res=>res.json())
    .then(succes=>{
      if(succes.data && succes.data.length>0){
        succes.data.sort((a, b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0, 3).forEach((item, index) => {
          table.push(
            `<div class="col-md-4">
                <img src="${item.photo}" class="rounded mx-auto d-block" style="width: 100%; height: 350 px"alt="SERVICE${index}"/>
                <h4 class="my-3">${item.titre}</h4>
                <p class="text-break">${item.description}</p>
            </div>
            `
          )
        });
        setState(table)
      }
    })
  }, [])

    return (
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">Sophia-Culturas (S-!-C).</h3>
          </div>
          <div className="row text-center" id="text-center-text-center">
            {
                (()=>{
                    if(document.getElementById('text-center-text-center')){
                        document.getElementById('text-center-text-center').innerHTML = [...state].join('');
                    }
                })()
            }
          </div>
        </div>
      </section>
    );
}

export default Services;