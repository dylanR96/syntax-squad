import { Dispatch, SetStateAction } from "react";

import { EditIngredientType, EventFn } from "./types";
import { toast } from "react-toastify";

type Ingredient = {
  editIngredient: EditIngredientType;
  setEditIngredient: Dispatch<SetStateAction<EditIngredientType | null>>;
  units: string[];
};

const StockModal: React.FC<Ingredient> = ({
  editIngredient,
  setEditIngredient,
  units,
}) => {
  const handleChange = (e: EventFn) => {
    setEditIngredient({ ...editIngredient, [e.target.name]: e.target.value });
  };

  const updateIngredient = async () => {
    const response: Response = await toast.promise(
      fetch(
        "https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/ingredient",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editIngredient), // Convert the data to JSON format
        }
      ),
      {
        pending: "Uppdaterar ingrediens",
        success: "Ingrediens uppdaterad",
        error: "Can not connect to API",
      },
      { hideProgressBar: true }
    );
    setEditIngredient(null);
    const data: string = await response.json();
    console.log(data);
  };
  console.log(editIngredient);
  return (
    <section className="stock-modal">
      <article className="stock-modal__ingredient">
        <h1 className="h1--dark">
          Ändra {editIngredient.ingredientName.toLowerCase()}
        </h1>
        <label className="stock-modal__label">
          <div className="stock-modal__column">Namn</div>
          <input
            className="ingredient__input"
            placeholder="name"
            name="ingredientName"
            value={editIngredient.ingredientName}
            onChange={handleChange}
          />
        </label>
        <label className="stock-modal__label">
          <div className="stock-modal__column">Antal</div>
          <input
            className="ingredient__input"
            type="number"
            name="stock"
            value={editIngredient.stock}
            onChange={handleChange}
          />
        </label>
        <label className="stock-modal__label">
          <div className="stock-modal__column">Enhet</div>
          <select
            className="ingredient__input"
            name="units"
            value={editIngredient.units}
            onChange={handleChange}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <footer className="stock-modal__footer">
          <button
            className="recipe__button stock-modal__button button--blue"
            onClick={updateIngredient}
          >
            Spara
          </button>
          <button
            className="recipe__button stock-modal__button"
            onClick={() => setEditIngredient(null)}
          >
            Stäng
          </button>
        </footer>
      </article>
    </section>
  );
};

export default StockModal;
