import { useEffect, useState } from "react";
import {
  EventFn,
  ProductIngredientType,
  ProductType,
  initProduct,
} from "./productTypes";
import { toast } from "react-toastify";
import { IngredientType } from "../Ingredients/types";
import {
  ENDPOINT_ALL_INGREDIENTS,
  ENDPOINT_PRODUCT,
} from "../../../endpoints/apiEndpoints";
import { API_CALL_GET, jwtToken } from "../../../features/fetchFromApi";

type ProductPropsType = {
  setNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
};
const NewProductModal: React.FC<ProductPropsType> = ({ setNewProduct }) => {
  const [allIngredients, setAllIngredients] = useState<
    IngredientType[] | null
  >();
  const [newIngredient, setNewIngredient] = useState<number | null>(null);
  const { productID, ...processedProduct } = initProduct;

  const [product, setProduct] = useState<ProductType>(processedProduct);

  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await API_CALL_GET(ENDPOINT_ALL_INGREDIENTS);
      setAllIngredients(ingredients);
    };
    fetchIngredients();
    // Reset arrays when rendering newProduct
    setProduct((prev) => {
      return {
        ...prev,
        ingredients: [],
        recipe: [],
      };
    });
  }, []);

  // Functions
  const handleChange = (e: EventFn) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleTags = (index: number, value: string) => {
    setProduct((prev) => {
      const updatedTags: string[] = [...prev.tags];
      updatedTags[index] = value.toLowerCase(); // Update the specific tag
      return {
        ...prev,
        tags: updatedTags,
      };
    });
  };
  const addIngredient = () => {
    const ingredients: ProductIngredientType[] = product.ingredients;
    if (newIngredient) {
      ingredients.push({ id: newIngredient, quantity: 0 });
    }
    setProduct((prev) => {
      return {
        ...prev,
        ingredients: ingredients,
      };
    });
    setNewIngredient(null);
  };
  const handleIngredients = (index: number, value: string) => {
    setProduct((prev) => {
      const updatedIngredients: ProductIngredientType[] = [...prev.ingredients];
      updatedIngredients[index].quantity = parseInt(value);
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };
  const deleteIngredient = (ingredientIndex: number) => {
    const updatedIngredients = product.ingredients.filter(
      (_, index) => index !== ingredientIndex
    );
    setProduct((prev) => {
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };
  const addStep = () => {
    const recipe: string[] = product.recipe;
    recipe.push(`Steg ${product.recipe.length + 1}`);
    setProduct((prev) => {
      return {
        ...prev,
        recipe: recipe,
      };
    });
  };
  const handleSteps = (index: number, value: string) => {
    setProduct((prev) => {
      const updatedRecipe: string[] = [...prev.recipe];
      updatedRecipe[index] = value;
      return {
        ...prev,
        recipe: updatedRecipe,
      };
    });
  };
  const deleteStep = (stepIndex: number) => {
    const updatedSteps = product.recipe.filter(
      (_, index) => index !== stepIndex
    );
    setProduct((prev) => {
      return {
        ...prev,
        recipe: updatedSteps,
      };
    });
  };
  const updateProduct = async () => {
    try {
      const response: Response = await toast.promise(
        fetch(ENDPOINT_PRODUCT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(product),
        }),
        {
          pending: "Uppdaterar produkt",
          success: "Produkt uppdaterad",
          error: "Can not connect to API",
        },
        { hideProgressBar: true }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setNewProduct(false);
    } catch (error) {
      console.error("Failed", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product.ingredients.length === 0) {
      toast.error("Du har inte valt några ingredienser");
      return;
    }
    if (product.recipe.length === 0) {
      toast.error("Du har inte skrivit något recept");
      return;
    }
    updateProduct();
  };

  console.log(product);
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="product-modal">
        <div className="product-modal__product">
          <label className="product-modal__label">
            <div className="product-modal__column">Produktnamn</div>
            <input
              className="product-modal__input"
              name="productName"
              value={product.productName}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Bild (URL)</div>
            <input
              className="product-modal__input"
              name="image"
              value={product.image}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Ingredienser</div>
            {allIngredients
              ? product.ingredients.map((ingredient, index) => {
                  const info = getIngredientInfo(ingredient.id, allIngredients);
                  return (
                    <div
                      key={ingredient.id}
                      className="product-modal__ingredients"
                    >
                      <div className="product-ingredients__name">
                        {info.name}
                      </div>
                      <div>
                        <input
                          className="product-modal__input product-modal__input--number"
                          type="number"
                          value={ingredient.quantity}
                          required
                          onChange={(e) => {
                            handleIngredients(index, e.target.value);
                          }}
                        />
                      </div>
                      <div className="product-ingredients__units">
                        {info.unit}
                      </div>
                      <div className="product-ingredients__delete">
                        <button
                          className="delete-button"
                          onClick={() => deleteIngredient(index)}
                        ></button>
                      </div>
                    </div>
                  );
                })
              : product.ingredients.map((ingredient) => {
                  // Make skeleton loading
                  return (
                    <div
                      key={ingredient.id}
                      style={{
                        height: 30,
                        marginTop: 5,
                        backgroundColor: "#ccc",
                      }}
                      className="product-modal__ingredients"
                    ></div>
                  );
                })}
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Lägg till ingrediens</div>
            <select
              className="product-modal__input"
              name="image"
              required
              onChange={(e) => {
                setNewIngredient(parseInt(e.target.value));
              }}
            >
              <option>Välj ingrediens</option>
              {/* Loop all ingredients that are not in the product */}
              {allIngredients &&
                allIngredients
                  .filter((ingredient) => {
                    return !product.ingredients.some(
                      (editIngredient) =>
                        editIngredient.id === ingredient.ingredientID
                    );
                  })
                  .map((ingredient) => {
                    return (
                      <option
                        key={ingredient.ingredientID}
                        value={ingredient.ingredientID}
                      >
                        {ingredient.ingredientName}
                      </option>
                    );
                  })}
            </select>
            <button
              className="recipe__button stock-modal__button button--blue button--small"
              type="button"
              onClick={() => {
                if (newIngredient) addIngredient();
              }}
            >
              Lägg till
            </button>
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Ordinarie pris</div>
            <input
              className="product-modal__input"
              name="price"
              value={product.price}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">
              Extrapris (0 för ordinarie pris)
            </div>
            <input
              className="product-modal__input"
              name="specialOffer"
              value={product.specialOffer}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Beskrivning</div>
            <textarea
              className="product-modal__input product-modal__input--textarea"
              name="description"
              placeholder="Description"
              value={product.description}
              required
              onChange={handleChange}
            ></textarea>
          </label>
          <div className="product-modal__label">
            <h5 className="h5--dark">Recept</h5>
            {product.recipe.length > 0 &&
              product.recipe.map((step, index) => {
                return (
                  <div className="product-modal__column" key={`step${index}}`}>
                    <div className="product-modal__column product-modal__column--col-2">
                      <div>Steg {index + 1}</div>
                      <div className="product-ingredients__delete">
                        <button
                          className="delete-button"
                          onClick={() => deleteStep(index)}
                        ></button>
                      </div>
                    </div>

                    <textarea
                      className="product-modal__input product-modal__input--textarea"
                      name="steps"
                      placeholder="Steg"
                      value={step}
                      required
                      onChange={(e) => {
                        handleSteps(index, e.target.value);
                      }}
                    ></textarea>
                  </div>
                );
              })}

            <button
              className="recipe__button stock-modal__button button--blue button--small"
              type="button"
              onClick={addStep}
            >
              Lägg till steg
            </button>
          </div>
          <label className="product-modal__label">
            <div className="product-modal__column">Baktid (minuter)</div>
            <input
              className="product-modal__input"
              name="bakingTime"
              value={product.bakingTime}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Taggar</div>
            <div className="product-modal__tags">
              <input
                className="product-modal__input"
                value={product.tags[0]}
                placeholder="Tagg 1"
                required
                onChange={(e) => {
                  handleTags(0, e.target.value);
                }}
              />
              <input
                className="product-modal__input"
                value={product.tags[1]}
                placeholder="Tagg 2"
                required
                onChange={(e) => {
                  handleTags(1, e.target.value);
                }}
              />
              <input
                className="product-modal__input"
                value={product.tags[2]}
                placeholder="Tagg 3"
                required
                onChange={(e) => {
                  handleTags(2, e.target.value);
                }}
              />
            </div>
          </label>
          <footer className="stock-modal__footer">
            <button
              className="recipe__button stock-modal__button button--blue"
              type="submit"
            >
              Spara
            </button>
            <button
              className="recipe__button stock-modal__button"
              onClick={() => {
                setNewProduct(false);
              }}
            >
              Stäng
            </button>
          </footer>
        </div>
      </div>
    </form>
  );
};
const getIngredientInfo = (
  ingredientID: number,
  ingredients: IngredientType[]
) => {
  const ingredientInfo = ingredients.find((ingredient) => {
    return ingredient.ingredientID == ingredientID;
  });
  if (ingredientInfo) {
    return {
      name: ingredientInfo.ingredientName,
      unit: ingredientInfo.units,
    };
  } else {
    console.warn(`Ingredient with ID ${ingredientID} not found`);
    return {
      name: "Unknown",
      unit: "Unknown",
    };
  }
};
export default NewProductModal;
