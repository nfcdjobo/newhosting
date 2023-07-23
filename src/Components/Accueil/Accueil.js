import Header from "../Header/Header";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "../Footer/Footer";
function Accueil(params) {
  return (
    <>
      <Header />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}

export default Accueil;
