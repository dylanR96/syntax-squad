import { useEffect, useState } from "react";
import "./Product.css";
import { initProduct, ProductType } from "./productTypes";
import imgPlaceholder from "../../../assets/images/products/placeholder.png";
import ProductModal from "./ProductModal";
const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([initProduct]);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const ENDPOINT_PRODUCTS = `https://ez7mtpao6i.execute-api.eu-north-1.amazonaws.com/products`;
    const fetchProducts = async () => {
      try {
        const response = await fetch(ENDPOINT_PRODUCTS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProductType[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed", error);
      }
    };
    fetchProducts();
  }, [editProduct]);
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
                    src={product.image ? product.image : imgPlaceholder}
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
          <div style={{ backgroundColor: "#ccc" }}>he</div>
        )}
        <div style={{ backgroundColor: "#ccc" }}>he</div>
      </section>
      {editProduct && (
        <ProductModal
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
    </main>
  );
};

export default Products;
