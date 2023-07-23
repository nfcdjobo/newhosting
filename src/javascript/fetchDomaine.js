import cookie from '../Cookies/Cookies';
import api_url from '../api_url/api_url';

fetch(api_url+'getAllDomaine')
.then(res => res.json())
.then(success => {
    if(cookie && window.locationh.href.includes('profile')) {
        const domaine = cookie.domaine;
        const selectDomaine = document.getElementById('domaine_id');
        document.getElementById('toggleAnnuler').addEventListener('click', ToggleAnnuler);
        document.getElementById('toggleEdite').addEventListener('click', ToggleEdite)
        selectDomaine.textContent = "";
        const data = success.data;
        data.sort((a, b) => a.libelle.localeCompare(b.libelle)).forEach(item => {
            const option = document.createElement('option'); option.value = item._id; option.textContent = item.libelle; selectDomaine.append(option)
            if(item._id === domaine._id ) option.selected = true;
        });
        document.getElementById("form-edite-user").addEventListener('submit', updateUser);
    }
})
.catch(()=>{
    return [];
})


function updateUser(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nomPrenom', event.target.querySelector('#nomPrenom'));
    formData.append('nationalite', event.target.querySelector('#nationalite'));
    formData.append('domaine_id', event.target.querySelector('#domaine_id'));
    formData.append('email', event.target.querySelector('#email'));
    formData.append('telephone', event.target.querySelector('#telephone'));
    if(event.target.querySelector('#photo').files[0]){
        formData.append('photo', event.target.querySelector('#photo'));
    }
}
function ToggleEdite() {
    document.getElementById('gameToggle').hidden = true;
    document.getElementById('gameToggle2').hidden = false;
}

function ToggleAnnuler() {
    document.getElementById('gameToggle').hidden = false;
    document.getElementById('gameToggle2').hidden = true;
}