import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleIngredient, addRecipeIngredients } from "../../features/order/orderSlice";
import { fetchProducts } from '../../features/products/productsSlice';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';
import './Recipe.css';
import "../../assets/styles/index.css"
import { RootState, AppDispatch } from '../../app/store';

/* PRODUCT INTERFACES */
interface ProductIngredient {
  id: number;      // ID för ingrediensen
  quantity: number; // Mängd av ingrediensen
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
  recipe: string[];
  
  
}

/* INGREDIENS INTERFACES */

interface Ingredient{
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
  quantity: number | null;
  pricePerUnit: number;
  exchangeFor: string;
  checked: boolean;
}

const Recipe = () => {

  const orderState = useSelector((state: RootState) => state.order.items);

  useEffect(() => {
    console.log("Glo0oooooooooobal Order State:", JSON.stringify(orderState, null, 2));
  }, [orderState]); // Kör varje gång orderState uppdateras

  const {productID} = useParams();

    // Konvertera productID till ett nummer
    const recipeID = Number(productID); // Konverterar alltid till nummer
    if (isNaN(recipeID)) {
      console.error("Ogiltigt productID: Kan inte konvertera till nummer");
      return null; // Avbryt renderingen om det är ogiltigt
    }


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
        checked: true,
      }

    })
      setCurrentIngredients(recipeIngredients);
    }
  }, [ingredients, currentRecipe])



console.log("Current recipe", currentRecipe)
console.log("Current ingredients", currentIngredients)



/* -------------------Redux för att lägga till beställning --------------------------*/

  // Lokal state för att hantera `checked`-status
  
  const [localIngredients, setLocalIngredients] = useState<Ingredient[]>([]);

  // Uppdatera lokal state
  useEffect(() => {
    if (currentIngredients) {
      setLocalIngredients(currentIngredients); // Synkronisera med currentIngredients
    }
  }, [currentIngredients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { checked } = e.target;
  
    // Uppdatera lokala ingredienser
    const updatedIngredients = localIngredients.map((ing) =>
      ing.ingredientID === id ? { ...ing, checked } : ing
    );
    setLocalIngredients(updatedIngredients);
  
    // Dispatcha för att uppdatera exclude i Redux
    dispatch(toggleIngredient({ recipeID, excludeIngredientID: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checkedIngredients = localIngredients.filter(ingredient => ingredient.checked);

    if (checkedIngredients.length === 0) {
      console.log("Inga ingredienser markerade");
      return;
    }

    // Skicka markerade ingredienser till Redux
    console.log("Skickar recipeID:", currentRecipe?.productID);
    dispatch(
      addRecipeIngredients({
        recipeID: Number(productID), // Konverterar alltid till nummer
        ingredients: localIngredients,
      })
    );
    console.log("Markerade ingredienser skickade:", checkedIngredients);
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
            
            {/* Checkbox form */}
            
            {localIngredients.map((ingredient) => (
  <div key={ingredient.ingredientID} className="recipe__input-container">
    <label className="recipe__label">
      <input
        type="checkbox"
        name={ingredient.ingredientName}
        checked={ingredient.checked}
        onChange={(e) => handleChange(e, ingredient.ingredientID)}
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
                <p className="body-text--dark recipe-instruction">{rec}</p>
              </div>
            ))}
          
          </article>
        </article>
      </main>
    </>
  );
};

export default Recipe;