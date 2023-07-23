import {useState, useEffect } from "react";
import api_url from "../../api_url/api_url";
import cookie from "../../Cookies/Cookies";


function Notification(params) {
    let  [state, setState] = useState([]);
    useEffect(() => {
        fetch(api_url+'getCommentByAutor', {
            method: 'GET',
            headers: {Authorization: `token ${cookie.token}`}
        })
        .then(res => res.json())
        .then(succes => {
            setState(succes.data)
        })
        .catch(error => setState([]))
    }, [])
    return(
        <>
            <button type="button" className="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
                <i className="bi bi-chat-left-text" title={"Message"}></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {state.length}
                </span>
            </button>
        </>
    )
}

export default Notification