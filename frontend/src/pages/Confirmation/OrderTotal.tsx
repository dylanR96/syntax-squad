import './Confirmation.css';

interface OrderTotalProps {
    total: number;
  }
  
  const OrderTotal: React.FC<OrderTotalProps> = ({ total }) => {
    return (
      <div className="confirmation__order-total">
        <h3 className="h4--dark">Totalt pris</h3>
        <h3 className="h4--dark">{total} SEK</h3>
      </div>
    );
  };
  
  export default OrderTotal;
  