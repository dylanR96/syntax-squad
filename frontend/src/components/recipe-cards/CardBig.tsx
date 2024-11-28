import React from 'react'
import "./Card.css"
import "../../assets/styles/index.css"

const CardBig = () => {
  return (
    <>
    <article className="card-container">
        <img src="/src/assets/images/muffin.jpg" alt="image of pastry" className="card-image" />
        <article className="card-info-plate">
            <div className="card-title">
            <h4 className="h4--dark">Muffins</h4>
            <h4 className="h4--dark">60kr</h4>
            </div>
            
            <h5 className="h5--dark">Baktid: 30 min</h5>
            <h5 className="h5--dark">Gluten, ägg, laktos</h5>
        </article>
    </article>
    </>
  )
}

export default CardBig