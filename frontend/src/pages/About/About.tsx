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
        EasyBake grundades 2020 av två passionerade hemmabagare, Helga och Augustus, som delade en vision om att göra bakning enklare och roligare för alla. Idén föddes en regnig söndag när de båda frustrerat letade efter recept som passade det lilla som fanns kvar i skafferiet.
        </p>
        <br />
        <p className='about__infotext'>
        "Varför inte skapa en tjänst där användare enkelt kan hitta inspirerande recept och samtidigt beställa exakt de ingredienser som behövs, direkt hem till dörren?" tänkte de.
        </p>
        <br />
        <p className="about__infotext">
        Med denna idé i grunden föddes EasyBake – en plattform som kombinerar receptsökning med ingrediensleverans. Oavsett om du är nybörjare eller en erfaren bagare, erbjuder EasyBake både inspiration och bekvämlighet. Med en passion för kvalitet ser företaget till att endast leverera noggrant utvalda ingredienser, så att du kan fokusera på det viktiga: att skapa magiska bakverk.
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