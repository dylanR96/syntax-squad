import { useEffect, useState } from "react";

import { EventFn, ProductIngredientType, ProductType } from "./productTypes";
import { toast } from "react-toastify";
import {
  ENDPOINT_CHANGE_PRODUCT,
  ENDPOINT_DELETE_PRODUCT,
} from "../../../endpoints/apiEndpoints";
// Import this later
type IngredientType = {
  createdAt: string;
  exchangeFor: string;
  ingredientID: number;
  ingredientName: string;
  pricePerUnit: number;
  stock: number;
  units: string;
};
type ProductPropsType = {
  editProduct: ProductType;
  setEditProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
};
const ProductModal: React.FC<ProductPropsType> = ({
  editProduct,
  setEditProduct,
}) => {
  const [allIngredients, setAllIngredients] = useState<
    IngredientType[] | null
  >();
  const [newIngredient, setNewIngredient] = useState<number | null>(null);
  useEffect(() => {
    const fetchIngredients = async () => {
      const ENDPOINT_ALL_INGREDIENTS = `https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/ingredients`;
      try {
        const response = await fetch(ENDPOINT_ALL_INGREDIENTS, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IngredientType[] = await response.json();
        setAllIngredients(data);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    window.scroll({
      top: 0,
      left: 0,
    });
    fetchIngredients();
  }, []);
  // Functions
  const handleChange = (e: EventFn) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  const handleTags = (index: number, value: string) => {
    setEditProduct((prev) => {
      if (!prev) return null;
      const updatedTags: string[] = [...prev.tags];
      updatedTags[index] = value; // Update the specific tag
      return {
        ...prev,
        tags: updatedTags,
      };
    });
  };

  const addIngredient = () => {
    const ingredients: ProductIngredientType[] = editProduct.ingredients;
    if (newIngredient) {
      ingredients.push({ id: newIngredient, quantity: 0 });
    }
    setEditProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ingredients: ingredients,
      };
    });
    setNewIngredient(null);
  };
  const handleIngredients = (index: number, value: string) => {
    setEditProduct((prev) => {
      if (!prev) return null;
      const updatedIngredients: ProductIngredientType[] = [...prev.ingredients];
      updatedIngredients[index].quantity = parseInt(value);
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };
  const deleteIngredient = (ingredientIndex: number) => {
    const updatedIngredients = editProduct.ingredients.filter(
      (_, index) => index !== ingredientIndex
    );
    setEditProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };
  const addStep = () => {
    const recipe: string[] = editProduct.recipe;
    recipe.push(`Steg ${editProduct.recipe.length + 1}`);
    setEditProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        recipe: recipe,
      };
    });
  };
  const handleSteps = (index: number, value: string) => {
    setEditProduct((prev) => {
      if (!prev) return null;
      const updatedRecipe: string[] = [...prev.recipe];
      updatedRecipe[index] = value;
      return {
        ...prev,
        recipe: updatedRecipe,
      };
    });
  };
  const deleteStep = (stepIndex: number) => {
    const updatedSteps = editProduct.recipe.filter(
      (_, index) => index !== stepIndex
    );
    setEditProduct((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        recipe: updatedSteps,
      };
    });
  };
  const deleteProduct = async () => {
    try {
      const response: Response = await toast.promise(
        fetch(`${ENDPOINT_DELETE_PRODUCT}/${editProduct.productID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          pending: "Tar bort produkt",
          success: "Produkt borttagen",
          error: "Can not connect to API",
        },
        { hideProgressBar: true }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setEditProduct(null);
    } catch (error) {
      console.error("Failed", error);
    }
  };
  const updateProduct = async () => {
    try {
      const response: Response = await toast.promise(
        fetch(ENDPOINT_CHANGE_PRODUCT, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editProduct),
        }),
        {
          pending: "Uppdaterar produkt",
          success: "Produkt uppdaterad",
          error: "Can not connect to API",
        },
        { hideProgressBar: true }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      setEditProduct(null);
    } catch (error) {
      console.error("Failed", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editProduct.ingredients.length === 0) {
      toast.error("Du har inte valt några ingredienser");
      return;
    }
    if (editProduct.recipe.length === 0) {
      toast.error("Du har inte skrivit något recept");
      return;
    }
    updateProduct();
  };
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
              value={editProduct.productName}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Bild (URL)</div>
            <input
              className="product-modal__input"
              name="image"
              value={editProduct.image}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Ingredienser</div>
            {allIngredients
              ? editProduct.ingredients.map((ingredient, index) => {
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
              : editProduct.ingredients.map((ingredient) => {
                  // Make skeleton loading
                  return (
                    <div
                      key={ingredient.id}
                      style={{
                        height: 30,
                        marginTop: 5,
                        backgroundColor: "#ccc",
                      }}
                      className="product-modal__ingredients product-skeleton__ingredients"
                    ></div>
                  );
                })}
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Lägg till ingrediens</div>
            <select
              className="product-modal__input"
              name="image"
              onChange={(e) => {
                setNewIngredient(parseInt(e.target.value));
              }}
            >
              <option>Välj ingrediens</option>
              {/* Loop all ingredients that are not in the product */}
              {allIngredients &&
                allIngredients
                  .filter((ingredient) => {
                    return !editProduct.ingredients.some(
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
              value={editProduct.price}
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
              value={editProduct.specialOffer}
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
              value={editProduct.description}
              required
              onChange={handleChange}
            ></textarea>
          </label>
          <div className="product-modal__label">
            <h5 className="h5--dark">Recept</h5>
            {editProduct.recipe.length > 0 &&
              editProduct.recipe.map((step, index) => {
                return (
                  <div className="product-modal__column" key={`step${index}}`}>
                    <div className="product-modal__column product-modal__column--col-2">
                      <div>Steg {index + 1}</div>
                      <div className="product-ingredients__delete">
                        <button
                          className="delete-button"
                          type="button"
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
              type="button"
              className="recipe__button stock-modal__button button--blue button--small"
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
              value={editProduct.bakingTime}
              required
              onChange={handleChange}
            />
          </label>
          <label className="product-modal__label">
            <div className="product-modal__column">Taggar</div>
            <div className="product-modal__tags">
              <input
                className="product-modal__input"
                value={editProduct.tags[0]}
                placeholder="Tagg 1"
                required
                onChange={(e) => {
                  handleTags(0, e.target.value);
                }}
              />
              <input
                className="product-modal__input"
                value={editProduct.tags[1]}
                placeholder="Tagg 2"
                required
                onChange={(e) => {
                  handleTags(1, e.target.value);
                }}
              />
              <input
                className="product-modal__input"
                value={editProduct.tags[2]}
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
              className="recipe__button stock-modal__button button--warning"
              type="button"
              onClick={() => {
                if (confirm("Vill du ta bort produkten?")) {
                  deleteProduct();
                }
              }}
            >
              Ta bort
            </button>
            <button
              className="recipe__button stock-modal__button"
              type="button"
              onClick={() => {
                setEditProduct(null);
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
export default ProductModal;
