import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Recipe.css";
import "../../assets/styles/index.css";
import { AppDispatch, RootState } from "../../app/store";
import { API_CALL_GET } from "../../features/fetchFromApi";
import { ENDPOINT_PRODUCT } from "../../endpoints/apiEndpoints";
import { fetchIngredients } from "../../features/ingredients/ingredientsSlice";
import { motion } from "framer-motion";
/* PRODUCT INTERFACES */
interface ProductIngredient {
  id: number; // ID för ingrediensen
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

interface Ingredient {
  ingredientID: number;
  ingredientName: string;
  stock: number;
  units: string;
  quantity: number | null;
  pricePerUnit: number;
  exchangeFor: string;
  checked: boolean;
}

const Recipe2 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { productID } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [uncheckedIngredients, setUncheckedIngredients] = useState<number[]>(
    []
  );
  const [price, setPrice] = useState<number>(0);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const {
    ingredients,
    status: ingredientsStatus,
    error: ingredientsError,
  } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (ingredientsStatus === "idle") {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsStatus]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchProduct = await API_CALL_GET(
        `${ENDPOINT_PRODUCT}/${productID}`
      );
      if (fetchProduct) {
        setProduct(fetchProduct);
        setPrice(fetchProduct.price);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      const newPrice = product.price - uncheckedIngredients.length * 5;
      setPrice(newPrice);
    }
  }, [uncheckedIngredients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      const productToCart = {
        productID: product.productID,
        quantity: 1,
        exclude: [...uncheckedIngredients],
        price: price,
      };
      console.log(productToCart);
      setAddedToCart(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientID = Number(e.target.name.split("-")[1]);
    if (!e.target.checked) {
      setUncheckedIngredients((prev) => [...prev, ingredientID]);
    } else {
      setUncheckedIngredients((prev) =>
        prev.filter((id) => id !== ingredientID)
      );
    }
  };
  return (
    <>
      <main className="container">
        <article className="recipe__upperbox">
          <img
            src={product?.image}
            alt="image of recipe"
            className="recipe__upperbox-img"
          />

          <article className="upperbox-info">
            <h1 className="h1--dark">{product?.productName}</h1>
            <article className="recipe__info-box">
              <p className="recipe__info-box-text">
                {`${product?.bakingTime} min`} <br />{" "}
                <strong>Tillagningstid</strong>
              </p>
              <p className="recipe__info-box-text">
                {product?.ingredients.length} <br />{" "}
                <strong>Ingredienser</strong>
              </p>
              <p className="recipe__info-box-text">
                {`${product?.price} kr`} <br />
                <strong>Pris</strong>
              </p>
            </article>
            <p className="body-text--dark">{product?.description}</p>
          </article>
        </article>
        <article className="recipe__lowerbox">
          <article className="recipe__lowerbox--upperbox-info">
            <h6 className="h6--dark">Ingredienser</h6>
            <form onSubmit={handleSubmit} className="recipe__form">
              {/* Checkbox form */}

              {product?.ingredients.map((ingredient) => {
                const myIngredient = ingredients?.find(
                  (searchIngredient) =>
                    searchIngredient.ingredientID == ingredient.id
                );

                return (
                  <div key={ingredient.id} className="recipe__input-container">
                    <label className="recipe__label">
                      <input
                        type="checkbox"
                        name={`ingredient-${ingredient.id}`}
                        defaultChecked={true}
                        onChange={handleChange}
                        className="recipe__input"
                      />
                      {`${ingredient.quantity} ${myIngredient?.units} ${myIngredient?.ingredientName}`}
                    </label>
                  </div>
                );
              })}

              <div className="recipe__total-div">
                <h6 className="recipe__total-text">Totalt</h6>
                <h6 className="recipe__total-text--bold">
                  <strong>{price} SEK</strong>
                </h6>
              </div>

              <button
                className="recipe__button"
                type="submit"
                style={{ backgroundColor: addedToCart ? "green" : "#cc8d80" }}
                disabled={
                  uncheckedIngredients.length === product?.ingredients.length ||
                  addedToCart
                }
              >
                {addedToCart ? "Tillagd" : "Lägg till i kundvagn"}
              </button>
            </form>
          </article>
          <article className="recipe__lowerbox--lowerbox-info">
            <h6 className="h6--dark">Gör såhär</h6>
            {product?.recipe.map((rec, index) => (
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

export default Recipe2;