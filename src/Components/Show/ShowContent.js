
import { useState, useEffect } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";

const requete = (arg1, arg2, arg3) => {
    return fetch(arg1, {
        method: arg2,
        headers: arg3
    })
    .then(res => res.json())
}
function ShowContent(params) {
    let [state, setState] = useState([]);
    let table = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let theadTr = document.getElementById("thead-tr");
    useEffect(()=>{
        const data = {
            route: window.location.href.includes("#!domaine") ? api_url+"getAllDomaine" : window.location.href.includes("#!auteurs") ?  api_url+"getAllUsers" : window.location.href.includes("#!abonnes") ? api_url+"getAllUsers" : api_url+"getAllExposition",
            method: 'GET',
            headers: { Authorization: `token ${cookie.token}`},
        };
        requete(data.route, data.method, data.headers)
        .then((success) => {
            if(Array.isArray(success.data) && success.data.length > 0){
                if(window.location.href.includes('#!domaine')){
                    success.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item,index) => {
                        table.push(
                            `
                                <tr>
                                    <th scope="row">${index + 1}</th>
                                    <td>${item.libelle}</td>
                                    <td><a href="/voirplus#!${item._id}"><img src="${item.photo}" style="width:35px; height:35px"/></a></td>
                                    <td>${new Date(item.createdAt).toLocaleTimeString("fr-FR", options)}</td>
                                    <td>${new Date(item.updatedAt).toLocaleTimeString("fr-FR", options)}</td>
                                    <td>
                                        <a href="/modifierDomaine#!${item._id}">
                                            <button type="button" title="Modifier-${item._id}" class="btn btn-info"><i class="bi bi-pencil-square"></i></button>
                                        </a>
                                    </td>
                                </tr>
                            `
                        )
                    })
                }else if(window.location.href.includes("#!auteur")){
                    success.data.filter(item=>item.entite==="AUTEUR").forEach((item, index) => {
                    table.push(
                        `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${item.nomPrenom}</td>
                            <td>${item.nationalite}</td>
                            <td>${item.email}</td>
                            <td>${item.telephone}</td>
                            <td>${new Date(item.createdAt).toLocaleTimeString("fr-FR",options)}</td>
                            <td>${new Date(item.updatedAt).toLocaleTimeString("fr-FR",options)}</td>
                            <td>
                                <a href="/voirplus#!${item._id}">
                                    <button type="button" title="Voir les détails ${item._id}" class="btn btn-success"><i class="bi bi-eye"></i></button>
                                </a>
                            </td>
                        </tr>`
                    )
                })}else if(window.location.href.includes("#!abonnes")){
                    success.data.filter(item=>item.entite==="PASSANT").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach((item, index) => {
                    table.push(`<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.nomPrenom}</td>
                        <td>${item.nationalite}</td>
                        <td>${item.email}</td>
                        <td>${item.telephone}</td>
                        <td>${new Date(item.createdAt).toLocaleTimeString("fr-FR",options)}</td>
                        <td>${new Date(item.updatedAt).toLocaleTimeString("fr-FR",options)}</td>
                        <td>
                            <a href="/voirplus#!${item._id}">
                                <button type="button" title="Voir les détails ${item._id}" class="btn btn-success"><i class="bi bi-eye"></i></button>
                            </a>
                        </td>
                    </tr>`)
                    }) 
                }else{
                    success.data.forEach((item, index) => {
                    table.push(`<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.titre}</td>
                        <td>${item.description}</td>
                        <td><a href="/voirplus#!${item._id}"><img src="${item.photo}" style="width:35px; height:35px"/></a></td>
                        <td>${new Date(item.createdAt).toLocaleTimeString("fr-FR",options)}</td>
                        <td>${new Date(item.updatedAt).toLocaleTimeString("fr-FR",options)}</td>
                        <td>
                            <a href="/voirplus#!${item._id}">
                                <button type="button" title="Voir les détails ${item._id}" class="btn btn-success"><i class="bi bi-eye"></i></button>
                            </a>
                        </td>
                    </tr>`)
                    })
                }
                setState(table);
            }
        })
    }, []);
    return (
      <>
        <tbody id="tbody">
            {
                (()=>{
                    if(document.getElementById('tbody')){
                        document.getElementById('tbody').innerHTML = [...state].join('')
                    }
                })()
            }
        </tbody>
        
      </>
    );
    
}

export default ShowContent;