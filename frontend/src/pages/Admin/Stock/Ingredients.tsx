import { useEffect, useState } from "react";
import "./Stock.css";
import { EditIngredientType, IngredientType } from "./types";
import StockModal from "./IngredientModal";
import NewIngredient from "./NewIngredient";

const Stock = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [editIngredient, setEditIngredient] =
    useState<EditIngredientType | null>(null);
  const [rerender, setRerender] = useState<number>(0);
  const units: string[] = ["gram", "milliliter", "styck"];

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
  }, [editIngredient, rerender]);

  const lowStock = ingredients.filter((ingredient) => {
    return ingredient.stock < 1000 && ingredient.stock > 0;
  });
  const outOfStock = ingredients.filter((ingredient) => {
    return ingredient.stock == 0;
  });

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
          units={units}
        />
      )}
      <main className="stock-container">
        <h1 className="h1--dark stock-heading">Lagersaldo</h1>
        <div className="stock-wrapper">
          <section>
            {(lowStock.length > 0 || outOfStock.length > 0) && (
              <h4 className="h4--dark stock--h4">Låga saldon</h4>
            )}

            <article className="stock-alert">
              <div className="stock-alert stock-alert--zero">
                {outOfStock.length > 0 &&
                  outOfStock.map((ingredient) => {
                    return (
                      <div
                        className="alert__ingredient alert__ingredient--zero"
                        key={`${ingredient.ingredientName}-oos`}
                        onClick={() => {
                          initEditIngredient(ingredient);
                        }}
                      >
                        {ingredient.ingredientName} - {ingredient.stock}{" "}
                        {ingredient.units}
                      </div>
                    );
                  })}
              </div>
              <div className="stock-alert stock-alert--low">
                {lowStock.length > 0 &&
                  lowStock.map((ingredient) => {
                    return (
                      <div
                        className="alert__ingredient alert__ingredient--low"
                        key={`${ingredient.ingredientName}-low`}
                        onClick={() => {
                          initEditIngredient(ingredient);
                        }}
                      >
                        {ingredient.ingredientName} - {ingredient.stock}{" "}
                        {ingredient.units}
                      </div>
                    );
                  })}
              </div>
            </article>
          </section>
          <section className="ingredients-list__wrapper">
            <h4 className="h4--dark stock--h4">Ingredienslista</h4>
            <article className="stock__ingredients-list">
              <div className="ingredient-wrapper ingredient-wrapper--title">
                <div className="stock__ingredient">Ingrediens</div>
                <div className="stock__number">Antal</div>
                <div className="stock__unit">Enhet</div>
              </div>
              {ingredients &&
                ingredients.map((ingredient) => {
                  // ingredient.ingredientID
                  return (
                    <div
                      className="ingredient-wrapper"
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
          </section>
        </div>
        <NewIngredient units={units} setRerender={setRerender} />
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
