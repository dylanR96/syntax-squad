import { useEffect, useState } from "react";
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
  console.log(ingredients);
  return (
    <main className="stock-container">
      <h1 className="h1--dark stock-heading">Lagersaldo</h1>
      <article>
        <label className="stock-wrapper stock-wrapper--title">
          <div className="stock__checkbox"></div>
          <div className="stock__ingredient">Ingrediens</div>
          <div className="stock__number">Antal</div>
          <div className="stock__unit">Enhet</div>
        </label>
        {ingredients &&
          ingredients.map((ingredient) => {
            return (
              <>
                {" "}
                <label className="stock-wrapper">
                  <input
                    type="checkbox"
                    className="stock__checkbox recipe__input"
                  />
                  <div className="stock__ingredient">
                    {ingredient.ingredientName}
                  </div>
                  <div className="stock__number">{ingredient.stock}</div>
                  <div className="stock__unit">{ingredient.units}</div>
                </label>
              </>
            );
          })}
      </article>
    </main>
  );
};

export default Stock;
