import React from 'react';

interface Product {
  productID: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  bakingTime: string;
  tags: string[];
}

interface CardSmallProps {
  content: Product;
}

const CardSmall: React.FC<CardSmallProps> = ({content}) => {


  return (
    <>

 <article className="card-container-small" key={content.productID}>  
 <img
   src={content.image || "/src/assets/images/muffin.jpg"}
   alt={`Bild på ${content.productName}`}
   className="card-image-small"
 />
 <article className="card-info-plate">
   <div className="card-title">
     <h4 className="h6--dark">{content.productName}</h4>
     <h4 className="h6--dark">{`${content.price} kr`}</h4>
   </div>
   <p className="p--dark">{`Baktid: ${content.bakingTime}`}</p>
 </article>
</article>

       

    </>
  );
};

export default CardSmall;