import './Confirmation.css';
import OrderTotal from './OrderTotal';

const Confirmation: React.FC = () => {
  return <div className="wrapper">
  <main className="container">
    <section className="confirmation__textbox">
    <h1 className='h1--dark'>Orderbekräftelse</h1>
    <p className='body-text--dark'>Ordernummer: 123456</p>
    <h2 className='h3--dark'>Muffins</h2>
    <h3 className='h4--dark'>Ingredienser:</h3>
    <p className='body-text--dark'>Ingrediens</p>
    <p className='body-text--dark'>Ingrediens</p>
    <h3 className='h4--dark'>Tillval:</h3>
    <p className='body-text--dark'>Ingrediens</p>
    <h3 className='h4--dark'>Specialönskemål/Allergier</h3>
    <p className='body-text--dark'>Allergisk mot nötter, mjölkprotein, gluten och ägg</p>
    <OrderTotal />
    </section>
    <button className='confirmation__OK-button'>Ok</button>
  </main>
  </div>
};

export default Confirmation;
