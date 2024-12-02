import './About.css';
import Gallery from './Gallery';
import TestimonialCarousel from './TestimonialCarousel';

const AboutUs = () => {
  return (
    <>
    <main className="container">
      <section className="about__info">
      <img src="https://images.unsplash.com/photo-1597528662465-55ece5734101?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Bakverk" 
      className="about__image-img"/>
    <article className="about__textbox">
      <h1 className="about__header">Om oss</h1>
      <p className="about__infotext">
        Vi på EasyBake tror att bakning är en konstform som alla kan njuta av. Därför har vi skapat en plattform där du kan hitta inspiration, recept och ingredienser för att skapa ditt eget mästerverk.
        </p>
        <br />
        <p className="about__infotext">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        scelerisque, risus et consectetur laoreet, lacus libero fermentum
        ligula, vitae ultricies nunc nisl nec nunc. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ea, porro culpa! Corrupti earum quo voluptas ducimus excepturi consequuntur nihil fugiat.
        </p>
        <br />
        <p className="about__infotext">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        scelerisque, risus et consectetur laoreet, lacus libero fermentum
        ligula, vitae ultricies nunc nisl nec nunc. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Ea, porro culpa! Corrupti earum quo voluptas ducimus excepturi consequuntur nihil fugiat.
        </p>
    </article>
    </section>
    <h1 className='h1--dark'>"Bake the world a better place"</h1>
    <h4 className='h4--dark'>Unknown</h4>
    <TestimonialCarousel />
    <Gallery />
    </main>
    </>
    );  
}

export default AboutUs;