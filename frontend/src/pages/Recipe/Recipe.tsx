import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleIngredient, addRecipeIngredients } from "../../features/order/orderSlice";
import { fetchProducts } from '../../features/products/productsSlice';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';
import './Recipe.css';
import "../../assets/styles/index.css"
import { recipes } from "./recipes";
import { RootState, AppDispatch } from '../../app/store';

/* PRODUCT INTERFACES */
interface ProductIngredient {
  id: number;      // ID för ingrediensen
  quantity: number; // Mängd av ingrediensen
}

interface Recipe {
  step: string[];
}

interface Product {
  productID: number;
  productName: string;
  description: string;
  price: number;
  image: string;
  bakingTime: string;
  tags: string[];
  ingredients: ProductIngredient[];
  recipe: Recipe[];
  quantity: number;
  
}

/* INGREDIENS INTERFACES */

interface Ingredient{
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
  pricePerUnit: number;
  exchangeFor: string
}

const Recipe = () => {
  const {productID} = useParams();


  const dispatch = useDispatch<AppDispatch>();
  const { products, status: productsStatus, error: productError } = useSelector((state: RootState) => state.products);
 
  const { ingredients, status: ingredientsStatus, error: ingredientsError } = useSelector((state: RootState) => state.ingredients);
  const [currentRecipe, setCurrentRecipe] = useState<Product | null>(null);
  const [currentIngredients, setCurrentIngredients] = useState<Ingredient[] | null>(null);

  /* Dispatch Products API */
  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  console.log("Products:", products);

  /* Dispatch Ingredients API */
  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsStatus]);

  console.log("Products:", products);
  console.log("Ingredinets", ingredients)

 
/* Hitta det specifika receptet för sidan */
  useEffect(() => {
    if (products) {
      const recipe = products.find((product) => product.productID === Number(productID)) || null
      setCurrentRecipe(recipe);
    }
  }, [products, productID])

  /* Hitta det specifika ingredienserna för receptet */
  useEffect(() => {
    if (ingredients && currentRecipe) {
      const recipeIngredients = ingredients
      .filter((ing) =>
      currentRecipe.ingredients.some((recipeIng) => recipeIng.id === ing.ingredientID)
    )
    .map((ing) => {
      const matchingRecipeIng = currentRecipe.ingredients.find(
        (recipeIng) => recipeIng.id === ing.ingredientID
      )

      return{
        ...ing,
        quantity: matchingRecipeIng ? matchingRecipeIng.quantity : null,
      }

    })
      setCurrentIngredients(recipeIngredients);
    }
  }, [ingredients, currentRecipe])



console.log("Current recipe", currentRecipe)
console.log("Current ingredients", currentIngredients)



/* -------------------Redux för att lägga till beställning --------------------------*/

  // Hämta receptets ingredienser från `recipes`
  const originalIngredients =
    recipes.find(r => r.recipe === currentRecipe?.productName)?.ingredients || [];

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
    /* dispatch(toggleIngredient({ recipe: currentRecipe?.productName, ingredientName: name })); */

    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkedIngredients = localIngredients.filter(ingredient => ingredient.checked);

    if (checkedIngredients.length === 0) {
      console.log("Inga ingredienser markerade");
      return;
    }

    // Skicka markerade ingredienser till Redux
    /* dispatch(addRecipeIngredients({ recipe: currentRecipe?.productName, ingredients: checkedIngredients }));
    console.log("Markerade ingredienser skickade:", checkedIngredients); */
  };


  return (
    <>
      <main className="container">
        <article className="recipe__upperbox">
          <img
            src={currentRecipe?.image}
            alt="image of recipe"
            className="recipe__upperbox-img"
          />

          <article className="upperbox-info">
            <h1 className="h1--dark">{currentRecipe?.productName}</h1>
            <article className="recipe__info-box">
              <p className='recipe__info-box-text'>{`${currentRecipe?.bakingTime} min`} <br /> <strong>Tillagningstid</strong></p>
              <p className='recipe__info-box-text'>{currentRecipe?.ingredients.length} <br /> <strong>Ingredienser</strong></p>
              <p className='recipe__info-box-text'>{`${currentRecipe?.price} kr`} <br /><strong>Pris</strong></p>
            </article>
            <p className="body-text--dark">
              {currentRecipe?.description}
            </p>
          </article>
        </article>
        <article className="recipe__lowerbox">
          <article className="recipe__lowerbox--upperbox-info">
            <h6 className="h6--dark">Ingredienser</h6>
            <form onSubmit={handleSubmit} className="recipe__form">
            {currentIngredients && currentIngredients.map(ingredient => (
                <div key={ingredient.ingredientID} className="recipe__input-container">
                  <label className="recipe__label">
                    <input
                      type="checkbox"
                      name={ingredient.ingredientName}
                      checked={ingredient.checked}
                      onChange={handleChange}
                      className="recipe__input"
                    />
                    {`${ingredient.quantity} ${ingredient.units} ${ingredient.ingredientName}`}
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
            {currentRecipe?.recipe.map((rec, index) => (
              <div key={index} className="recipe__steps">
                <p className="body-text--dark recipe-instruction">{rec.step}</p>
              </div>
            ))}
          
          </article>
        </article>
      </main>
    </>
  );
};

export default Recipe;