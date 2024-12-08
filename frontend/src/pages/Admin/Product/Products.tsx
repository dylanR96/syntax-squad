// Lägg till recipe

import { useEffect, useState } from "react";
import "./Product.css";
import { initProduct, ProductType } from "./productTypes";
// import imgPlaceholder from "../../../assets/images/products/placeholder.png";
import UpdateProductModal from "./UpdateProductModal";
import Loader from "../../../components/ui/Loader";
import NewProductModal from "./NewProductModal";
import { ENDPOINT_ALL_PRODUCTS } from "../../../endpoints/apiEndpoints";
import { API_CALL_GET } from "../../../features/fetchFromApi";
const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([initProduct]);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [newProduct, setNewProduct] = useState<boolean>(false);
  useEffect(() => {
    if (!editProduct) {
      const fetchProducts = async () => {
        const products: ProductType[] = await API_CALL_GET(
          ENDPOINT_ALL_PRODUCTS
        );
        setProducts(products);
      };
      fetchProducts();
    }
  }, [editProduct, newProduct]);
  return (
    <main className="product-container">
      <section>
        <h4 className="h4--dark">Produktlista</h4>
        <div className="product-table product__heading">
          <div className="product__image"></div>
          <div className="product__name">Produktnamn</div>
          <div className="product__tags">Taggar</div>
          <div className="product__time">Baktid</div>
          <div className="product__price">Pris</div>
          <div className="product__price">Extrapris</div>
        </div>
        {products[0].productID != 0 ? (
          products.map((product) => {
            return (
              <div
                className="product-table"
                key={product.productID}
                onClick={() => {
                  const { createdAt, ...productWithoutCreatedAt } = product;

                  setEditProduct(productWithoutCreatedAt);
                }}
              >
                <div className="product__image-container">
                  <img
                    className="product__image"
                    src={product.image ? product.image : ""}
                  />
                </div>
                <div className="product__name">{product.productName}</div>
                <div className="product__tags">{product.tags.join(", ")}</div>
                <div className="product__time">
                  {product.bakingTime} minuter
                </div>
                <div className="product__price">{product.price}:-</div>
                <div className="product__price">
                  {product.specialOffer ? `${product.specialOffer}:-` : "-"}
                </div>
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </section>
      <button
        className="recipe__button stock-modal__button button--blue button--small"
        onClick={() => setNewProduct(true)}
      >
        Lägg till produkt
      </button>
      {editProduct && (
        <UpdateProductModal
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
      {newProduct && <NewProductModal setNewProduct={setNewProduct} />}
    </main>
  );
};

export default Products;
