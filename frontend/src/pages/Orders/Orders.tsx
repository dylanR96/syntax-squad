import React, { useState } from 'react';
import "./Orders.css";

interface FormData {
  address: string;
  postalCode: string;
  phone: string;
  comment: string;
}

const Orders = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    address: 'Väggatan 45',
    postalCode: '859 95',
    phone: '07074554846',
    comment: 'Ingen ost',
  });

  const [status, setStatus] = useState<string>('obekräftad');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(e.target.value);
    console.log('Uppdaterad status:', status);
  };

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (): void => {
    console.log('Uppdaterad data:', formData);
    setIsEditing(false);
  };

  return (
    <main className="container">
      <section className="orders__container">
        <h1 className="h1--dark">Order</h1>
        <section className="orders__status">
          <h6 className="h6--dark">Visa:</h6>
          <article className="orders__tag--green">
            <h6 className="orders__tag-text">Klar</h6>
          </article>
          <article className="orders__tag--red">
            <h6 className="orders__tag-text">Obekräftad</h6>
          </article>
          <article className="orders__tag--blue">
            <h6 className="orders__tag-text">Bekräftad</h6>
          </article>
        </section>
        <section className="orders__all-orders-container">
          <article className="orders__card-container">

            {/* Ordernummer */}

            <article className="card-detail-info">
              <h6 className="h6--dark">
                Ordernummer
              </h6>
                <p className="h5--dark">5464351458434</p>
            </article>
            
            {/* Pris */}

            <article className="card-detail-info">
              <h6 className="h6--dark">
                Pris
              </h6>
                <p className="h5--dark">60 kr</p>
            </article>
            
            {/* Datum */}

            <article className="card-detail-info">
              <h6 className="h6--dark">
                Datum
              </h6>
                <p className="h5--dark">2024-11-18, 12:13</p>
            </article>
            
            {/* Recept */}

            <article className="card-detail-info">
              <h6 className="h6--dark">
                Recept
              </h6>
                <p className="h5--dark">Kladdkakor, Hallongrottor</p>
            </article>
           
            {/* Adress */}
            <article className="card-detail-info">
              <h6 className="h6--dark">
                Adress
              </h6>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="h5--dark">{formData.address}</p>
              )}
            </article>
            {/* Postnummer */}
            <article className="card-detail-info">
              <h6 className="h6--dark">
                Postnummer
              </h6>
              {isEditing ? (
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="h5--dark">{formData.postalCode}</p>
              )}
            </article>
            {/* Telefon nummer */}
            <article className="card-detail-info">
              <h6 className="h6--dark">
                Telefon nummer
              </h6>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="h5--dark">{formData.phone}</p>
              )}
            </article>
            {/* Kommentar */}
            <article className="card-detail-info">
              <h6 className="h6--dark">
                Kommentar
              </h6>
              {isEditing ? (
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="h5--dark">{formData.comment}</p>
              )}
            </article>
            {/* Status */}
            <article className="card-detail-info">
              <h6 className="h6--dark">Status</h6>
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
                className={`orders__status-select ${status === 'obekräftad' 
                ? 'obekräftad'
                : status === 'bekräftad'
                ? 'bekräftad'
                : 'klar'
                }`} 
              >
                <option value="obekräftad">Obekräftad</option>
                <option value="bekräftad">Bekräftad</option>
                <option value="klar">Klar</option>
              </select>
            </article>
            {isEditing ? (
              <button
                className="recipe__button"
                type="button"
                onClick={handleSubmit}
              >
                Spara ändringar
              </button>
            ) : (
              <button
                className="recipe__button"
                type="button"
                onClick={handleEditToggle}
              >
                Redigera
              </button>
            )}
          </article>
        </section>
      </section>
    </main>
  );
};

export default Orders;