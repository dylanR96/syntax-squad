import { useEffect, useState } from "react";
import { EventFn, ProductIngredientType, ProductType } from "./productTypes";
import { toast } from "react-toastify";
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

  const updateProduct = async () => {
    const ENDPOINT_CHANGE_PRODUCT = `https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/product`;
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
  return (
    <div className="product-modal">
      <div className="product-modal__product">
        <label className="product-modal__label">
          <div className="product-modal__column">Produktnamn</div>
          <input
            className="product-modal__input"
            name="productName"
            value={editProduct.productName}
            onChange={handleChange}
          />
        </label>
        <label className="product-modal__label">
          <div className="product-modal__column">Bild (URL)</div>
          <input
            className="product-modal__input"
            name="image"
            value={editProduct.image}
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
                    <div className="product-ingredients__name">{info.name}</div>
                    <div>
                      <input
                        className="product-modal__input product-modal__input--number"
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => {
                          handleIngredients(index, e.target.value);
                        }}
                      />
                    </div>
                    <div className="product-ingredients__units">
                      {info.unit}
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
            onChange={handleChange}
          />
        </label>
        <label className="product-modal__label">
          <div className="product-modal__column">Recept</div>
          <textarea
            className="product-modal__input product-modal__input--textarea"
            name="description"
            placeholder="Description"
            value={editProduct.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className="product-modal__label">
          <div className="product-modal__column">Taggar</div>
          <div className="product-modal__tags">
            <input
              className="product-modal__input"
              value={editProduct.tags[0]}
              placeholder="Tagg 1"
              onChange={(e) => {
                handleTags(0, e.target.value);
              }}
            />
            <input
              className="product-modal__input"
              value={editProduct.tags[1]}
              placeholder="Tagg 2"
              onChange={(e) => {
                handleTags(1, e.target.value);
              }}
            />
            <input
              className="product-modal__input"
              value={editProduct.tags[2]}
              placeholder="Tagg 3"
              onChange={(e) => {
                handleTags(2, e.target.value);
              }}
            />
          </div>
        </label>
        <footer className="stock-modal__footer">
          <button
            className="recipe__button stock-modal__button button--blue"
            onClick={() => {
              updateProduct();
            }}
          >
            Spara
          </button>
          <button
            className="recipe__button stock-modal__button"
            onClick={() => {
              setEditProduct(null);
            }}
          >
            Stäng
          </button>
        </footer>
      </div>
    </div>
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