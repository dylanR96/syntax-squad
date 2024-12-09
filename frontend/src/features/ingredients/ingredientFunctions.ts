import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export const getIngredientNameById = (myIngredient: number) => {
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  const ingredientName = ingredients?.find(
    (ingredient) => ingredient.ingredientID == myIngredient
  )?.ingredientName;
  return ingredientName;
};
