import React from 'react'
import "./Card.css"
import "../../assets/styles/index.css"

const CardSmall = () => {
  return (
    <>
    <article className="card-container-small">
        <img src="/src/assets/images/muffin.jpg" alt="image of pastry" className="card-image-small" />
        <article className="card-info-plate">
            <div className="card-title">
            <h4 className="h6--dark">Muffins</h4>
            <h4 className="h6--dark">60kr</h4>
            </div>
            
            <p className="p--dark">Baktid: 30 min</p>
            <p className="p--dark">Gluten, ägg, laktos</p>
        </article>
    </article>
    </>
  )
}

export default CardSmall