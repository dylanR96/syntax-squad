import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleIngredient, addRecipeIngredients } from "../../features/ingredients/ingredientsSlice";
import './Recipe.css';
import "../../assets/styles/index.css"
import { recipes } from "./recipes";

const Recipe = () => {
  const dispatch = useDispatch();
  const recipeName = 'Kladdkaka';

  // Hämta receptets ingredienser från `recipes`
  const originalIngredients =
    recipes.find(r => r.recipe === recipeName)?.ingredients || [];

  // Lokal state för att hantera `checked`-status
  const [localIngredients, setLocalIngredients] = useState(originalIngredients);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    // Uppdatera lokal state
    const updatedIngredients = localIngredients.map(ingredient =>
      ingredient.name === name
        ? { ...ingredient, checked: !ingredient.checked }
        : ingredient
    );
    setLocalIngredients(updatedIngredients);

    // Dispatcha till Redux
    dispatch(toggleIngredient({ recipe: recipeName, ingredientName: name }));

    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkedIngredients = localIngredients.filter(ingredient => ingredient.checked);

    if (checkedIngredients.length === 0) {
      console.log("Inga ingredienser markerade");
      return;
    }

    // Skicka markerade ingredienser till Redux
    dispatch(addRecipeIngredients({ recipe: recipeName, ingredients: checkedIngredients }));
    console.log("Markerade ingredienser skickade:", checkedIngredients);
  };

  return (
    <>
      <main className="container">
        <article className="recipe__upperbox">
          <img
            src="https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image of recipe"
            className="recipe__upperbox-img"
          />

          <article className="upperbox-info">
            <h1 className="h1--dark">Kladdkaka</h1>
            <article className="recipe__info-box">
              <p className='recipe__info-box-text'>20 min <br /> <strong>Tillagningstid</strong></p>
              <p className='recipe__info-box-text'>14 <br /> <strong>Ingredienser</strong></p>
              <p className='recipe__info-box-text'>60 kr <br /><strong>Pris</strong></p>
            </article>
            <p className="body-text--dark">
              Lorem ipsum dolor sit amet consectetur. Ante senectus id id nisl sapien volutpat auctor feugiat. In sit velit gravida vitae amet volutpat nibh adipiscing sagittis. Morbi sem ac pharetra.
            </p>
          </article>
        </article>
        <article className="recipe__lowerbox">
          <article className="recipe__lowerbox--upperbox-info">
            <h6 className="h6--dark">Ingredienser</h6>
            <form onSubmit={handleSubmit} className="recipe__form">
            {localIngredients.map(ingredient => (
                <div key={ingredient.id} className="recipe__input-container">
                  <label className="recipe__label">
                    <input
                      type="checkbox"
                      name={ingredient.name}
                      checked={ingredient.checked}
                      onChange={handleChange}
                      className="recipe__input"
                    />
                    {ingredient.name}
                  </label>
                </div>
              ))}
              <div className="recipe__total-div">
                <h6 className="recipe__total-text">Totalt</h6>
                <h6 className="recipe__total-text--bold">
                  <strong>60kr</strong>
                </h6>
              </div>

              <button className="recipe__button" type="submit">
                Lägg till i kundvagn
              </button>
            </form>
          </article>
          <article className="recipe__lowerbox--lowerbox-info">
            <h6 className="h6--dark">Gör såhär</h6>
            <p className="body-text--dark">
              <strong>1. </strong>
              Lorem ipsum dolor sit amet consectetur. Ante senectus id id nisl sapien volutpat auctor feugiat. In sit velit gravida vitae amet volutpat nibh adipiscing sagittis. Morbi sem ac pharetra.<br /><br />
              <strong>2. </strong>
              Lorem ipsum dolor sit amet consectetur. Ante senectus id id nisl sapien volutpat auctor feugiat. In sit velit gravida vitae amet volutpat nibh adipiscing sagittis. Morbi sem ac pharetra.
            </p>
          </article>
        </article>
      </main>
    </>
  );
};

export default Recipe;