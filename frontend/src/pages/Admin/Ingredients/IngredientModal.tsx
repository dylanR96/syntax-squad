import { Dispatch, SetStateAction } from "react";

import { EditIngredientType, EventFn } from "./types";
import { toast } from "react-toastify";
import { ENDPOINT_INGREDIENT } from "../../../endpoints/apiEndpoints";

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
      fetch(ENDPOINT_INGREDIENT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editIngredient), // Convert the data to JSON format
      }),
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
  const deleteIngredient = async () => {
    try {
      const ingredientID = editIngredient.ingredientID;
      const response: Response = await toast.promise(
        fetch(ENDPOINT_INGREDIENT, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientID }),
        }),
        {
          pending: "Tar bort ingrediens",
          success: "Ingrediens borttagen",
          error: "Can not connect to API",
        },
        { hideProgressBar: true }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setEditIngredient(null);
    } catch (error) {
      console.error("Failed", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateIngredient();
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
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
              required
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
              required
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
              type="submit"
            >
              Spara
            </button>
            <button
              className="recipe__button stock-modal__button button--warning"
              type="button"
              onClick={() => {
                if (confirm("Vill du ta bort ingrediensen?")) {
                  deleteIngredient();
                }
              }}
            >
              Ta bort
            </button>
            <button
              className="recipe__button stock-modal__button"
              type="button"
              onClick={() => setEditIngredient(null)}
            >
              Stäng
            </button>
          </footer>
        </article>
      </section>{" "}
    </form>
  );
};

export default StockModal;
