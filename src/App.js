import './css/styleCss.css';
import './css/tableau.css';
import { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Domaine from './Components/Domaine/Domaine';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Exposition from './Components/Expositions/Exposition';
import EditeExposition from './Components/Expositions/EdeteExpedition';
import MonPublic from './Components/MonPublic/MonPublic';
import AllExpositions from './Components/Expositions/AllExpositions';
import Commentaire from './Components/Commentaire/Commentaire';
import Detail from './Components/Detail/Detail';
import Show from "./Components/Show/show";
import ShowEnd from "./Components/Show/showEnd";
import ModifierDomaine from "./Components/ModifierDomaine/ModifierDomaine";
import ShowCommentaire from './Components/Commentaire/ShowCommentaire';
import LireCommentaire from './Components/Commentaire/LireCommentaire';
import Animation from './Components/Animation/Animation';
import AutreUsers from './Components/AutreUsers/AutreUsers';
import Auteur from './Components/Auteur/Auteur';
import Coreos from './Components/Coreos/Coreos';
import Historiques from './Components/Coreos/Historiques';

const Accueil = lazy( () => import('./Components/Accueil/Accueil'));
const Login = lazy( () => import('./Components/Login/Login'));
const Reset = lazy( () => import('./Components/Reset/Reset'));


function App() {
  return (
      <Router>
        <Suspense fallback={<div className="chargement">Chargement...</div>}>
          <Routes>
            <Route path='/' element={<Accueil />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/domaine' element={<Domaine />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/exposition' element={<Exposition />} />
            <Route path='/editeExposition' element={<EditeExposition />} />
            <Route path='/monPublic' element={<MonPublic />} />
            <Route path='/expositions' element={<AllExpositions />} />
            <Route path='/commentaire' element={<Commentaire />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/show' element={<Show />} />
            <Route path='/modifierDomaine' element={<ModifierDomaine />} />
            <Route path='/showCommentaire' element={<ShowCommentaire />} />
            <Route path='/lireCommentaire' element={<LireCommentaire />} />
            <Route path='/show-end' element={<ShowEnd />} />
            <Route path='/auteur' element={<Auteur />} />
            <Route path='/coreos' element={<Coreos />} />
            <Route path='/historiques' element={<Historiques />} />

            <Route path='/overUp' element={<AutreUsers />} />
            <Route path='/anime' element={<Animation />} />
            <Route path='*' element={<h1 className="chargement">Cette page n'existe pas !</h1>} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
