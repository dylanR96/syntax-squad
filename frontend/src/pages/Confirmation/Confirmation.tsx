import './Confirmation.css';
import OrderTotal from './OrderTotal';

const Confirmation: React.FC = () => {
  return <div className="wrapper">
  <main className="container">
    <section className="confirmation__textbox">
      <article className="confirmation__part">
    <h1 className='h1--dark'>Orderbekräftelse</h1>
    <p className='body-text--dark'>Ordernummer: #123456</p>
    </article>
    <article className="confirmation__part">
    <h2 className='h3--dark'>Muffins</h2>
    <h3 className='h4--dark'>Ingredienser:</h3>
    <p className='body-text--dark'>Ingrediens</p>
    <p className='body-text--dark'>Ingrediens</p>
    </article>
    <article className="confirmation__part">
    <h3 className='h4--dark'>Tillval:</h3>
    <p className='body-text--dark'>Ingrediens</p>
    </article>
    <article className="confirmation__part">
    <h3 className='h4--dark'>Specialönskemål/Allergier</h3>
    <p className='body-text--dark'>Allergisk mot nötter, mjölkprotein, gluten och ägg</p>
    <OrderTotal />
    </article>
    </section>
    <section className="confirmation__buttons">
    <button className='confirmation__cancel-button'>Avbryt order</button>
    <button className='confirmation__OK-button'>Ok</button>
    </section>
  </main>
  </div>
};

export default Confirmation;
