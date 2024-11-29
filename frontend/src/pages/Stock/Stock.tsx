import { useEffect, useState } from "react";
import editIcon from "../../assets/images/icons/edit.svg";
import "./Stock.css";
type IngredientType = {
  createdAt: string;
  exchangeFor: string;
  ingredientID: number;
  ingredientName: string;
  pricePerUnit: number;
  stock: number;
  units: string;
};
const Stock = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const ENDPOINT_INGREDIENTS =
    "https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/ingredients";
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(ENDPOINT_INGREDIENTS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IngredientType[] = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchIngredients();
  }, []);

  return (
    <>
      <section className="stock-modal">
        <h1 className="h1--dark">Ändra</h1>
      </section>
      <main className="stock-container">
        <h1 className="h1--dark stock-heading">Lagersaldo</h1>
        <article>
          <div className="stock-wrapper stock-wrapper--title">
            <div className="stock__buttons"></div>
            <div className="stock__ingredient">Ingrediens</div>
            <div className="stock__number">Antal</div>
            <div className="stock__unit">Enhet</div>
          </div>
          {ingredients &&
            ingredients.map((ingredient) => {
              // ingredient.ingredientID
              return (
                <>
                  <div className="stock-wrapper">
                    <div className="stock__buttons">
                      <button className="stock__button">
                        <img src={editIcon} className="stock__button--icon" />
                      </button>
                    </div>

                    <div className="stock__ingredient">
                      {ingredient.ingredientName}
                    </div>
                    <div className="stock__number">{ingredient.stock}</div>
                    <div className="stock__unit">{ingredient.units}</div>
                  </div>
                </>
              );
            })}
        </article>
      </main>
    </>
  );
};

export default Stock;

// OLD
// <label className="stock-wrapper">
// <input
//   type="checkbox"
//   className="stock__checkbox recipe__input"
// />
// <div className="stock__ingredient">
//   {ingredient.ingredientName}
// </div>
// <div className="stock__number">{ingredient.stock}</div>
// <div className="stock__unit">{ingredient.units}</div>
// </label>
