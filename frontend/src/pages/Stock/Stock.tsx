import { useEffect, useState } from "react";
import "./Stock.css";
import { EditIngredientType, IngredientType } from "./types";
import StockModal from "./StockModal";

const Stock = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [editIngredient, setEditIngredient] =
    useState<EditIngredientType | null>(null);
  const test = ingredients.filter((ingredient) => {
    return ingredient.stock < 1000;
  });
  console.log(test);
  const ENDPOINT_INGREDIENTS =
    "https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/ingredients";
  useEffect(() => {
    const fetchIngredients = async () => {
      if (!editIngredient) {
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
      }
    };
    fetchIngredients();
  }, [editIngredient]);
  const initEditIngredient = (ingredient: IngredientType) => {
    const data = {
      ingredientID: ingredient.ingredientID,
      ingredientName: ingredient.ingredientName,
      stock: ingredient.stock,
      units: ingredient.units,
    };
    setEditIngredient(data);
  };
  return (
    <>
      {editIngredient && (
        <StockModal
          editIngredient={editIngredient}
          setEditIngredient={setEditIngredient}
        />
      )}
      <main className="stock-container">
        <h1 className="h1--dark stock-heading">Lagersaldo</h1>
        <article>
          <div className="stock-wrapper stock-wrapper--title">
            <div className="stock__ingredient">Ingrediens</div>
            <div className="stock__number">Antal</div>
            <div className="stock__unit">Enhet</div>
          </div>
          {ingredients &&
            ingredients.map((ingredient) => {
              // ingredient.ingredientID
              return (
                <div
                  className="stock-wrapper"
                  key={ingredient.ingredientID}
                  onClick={() => {
                    initEditIngredient(ingredient);
                  }}
                >
                  <div className="stock__ingredient">
                    {ingredient.ingredientName}
                  </div>
                  <div className="stock__number">{ingredient.stock}</div>
                  <div className="stock__unit">{ingredient.units}</div>{" "}
                </div>
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
