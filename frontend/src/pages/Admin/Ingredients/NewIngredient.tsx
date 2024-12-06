import { useState } from "react";
import { EventFn, NewIngredientType } from "./types";
import { toast } from "react-toastify";
import { ENDPOINT_INGREDIENT } from "../../../endpoints/apiEndpoints.js";

type NewIngredientPropsType = {
  units: string[];
  setRerender: React.Dispatch<React.SetStateAction<number>>;
};
const NewIngredient: React.FC<NewIngredientPropsType> = ({
  units,
  setRerender,
}) => {
  const initIngredient = {
    ingredientName: "",
    stock: 0,
    units: "gram",
  };

  const [newIngredient, setNewIngredient] =
    useState<NewIngredientType>(initIngredient);
  const handleChange = (e: EventFn) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };
  const addIngredient = async () => {
    console.log(newIngredient);
    const response: Response = await toast.promise(
      fetch(ENDPOINT_INGREDIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient), // Convert the data to JSON format
      }),
      {
        pending: "Lägger till ingrediens",
        success: "Ingrediens tillagd",
        error: "Can not connect to API",
      },
      { hideProgressBar: true }
    );
    setRerender((prev) => prev + 1); // Increment the state to trigger a re-render
    setNewIngredient(initIngredient);
    const data: string = await response.json();
    console.log(data);
    console.log();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addIngredient();
  };
  return (
    <section>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h4 className="h4--dark add-ingredient__h4">Lägg till ingrediens</h4>
        <article className="add-ingredient">
          <label>
            <div>Namn</div>
            <input
              className="ingredient__input"
              type="text"
              name="ingredientName"
              placeholder="Carrot.."
              required
              value={newIngredient.ingredientName}
              onChange={handleChange}
            />
          </label>
          <label>
            <div>Antal</div>
            <input
              className="ingredient__input"
              type="number"
              name="stock"
              placeholder="e.g 2000"
              value={newIngredient.stock}
              onChange={handleChange}
            />
          </label>
          <label>
            <div>Enhet</div>
            <select
              name="units"
              className="ingredient__input"
              value={newIngredient.units}
              onChange={handleChange}
            >
              {units.map((unit) => {
                return (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            className="recipe__button stock-modal__button button--blue button--small"
            type="submit"
          >
            Lägg till
          </button>
        </article>
      </form>
    </section>
  );
};

export default NewIngredient;
