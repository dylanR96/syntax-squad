import React, { useState, useEffect } from "react";
import "./Home.css";
import "../../assets/styles/index.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { RootState, AppDispatch } from "../../app/store";
import CardBig from "../../components/recipe-cards/CardBig";
import CardSmall from "../../components/recipe-cards/CardSmall";
import SearchResults from "./SearchResults"; // Importera sökresultatkomponenten

const Home = () => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(""); // Inputvärdet
  const [searchResults, setSearchResults] = useState<any[]>([]); // Sökresultaten
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false); // Ny state för att visa alla produkter

  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (products) {
      // Filtrera produkterna baserat på sökordet
      const filteredResults = products.filter((product) =>
        product.productName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setShowAllProducts(false); // Dölj alla produkter om något skrivs i sökrutan

      setSearchResults(filteredResults);
    }
  };

  const handleShowAll = (): void => {
    // Visa alla produkter
    setSearchResults(products || []);
    setShowAllProducts(true);
  };

  const isLoading = !products && !error && status === "idle";
  const isEmpty = products && products.length === 0;

  const julTag = (products || []).filter((product) => product.tags.includes("jul"));
  const timeTag = (products || []).filter((product) => product.tags.includes("15 min"));
  const trendingTag = (products || []).filter((product) => product.tags.includes("trending"));

  return (
    <>
      <section className="home__header">
        <h2 className="h2--light">Vad vill du baka idag?</h2>
        <article className="home__header-form-container">
          <form onSubmit={handleSubmit}>
            <article className="home__header-search">
              <input
                type="text"
                id="textInput"
                value={inputValue}
                onChange={handleChange}
                placeholder="Kladdkaka, lussekatt..."
              />
              <button type="submit" className="home__header-search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </article>
          </form>
          {searchResults.length === 0 && <i
            className="fa-solid fa-filter home__fa-filter"
            onClick={handleShowAll}
            style={{ cursor: "pointer" }}
          ></i>}
        </article>
      </section>

      {localError && <p>{localError}</p>}
      {isLoading && <p>Laddar produkter...</p>}
      {isEmpty && <p>Inga produkter hittades.</p>}

      {/* Visa sökresultat */}
      {(searchResults.length > 0 || showAllProducts) && (
      <SearchResults searchResults={searchResults} showAll={showAllProducts} />
      )}

      {!isLoading && !isEmpty && searchResults.length === 0 && !showAllProducts && (
        <main className="container">
          <article className="home__card-container">
            <h3 className="h3--dark">Beställ igen</h3>
            <CardBig />
          </article>
          <article className="home__card-container">
            <h3 className="h3--dark">Trending</h3>
            <div className="cards-wrapper">
              
              {trendingTag.map((tag) => (
                <Link to={`/recipe/${tag.productID}`} key={tag.productID}>
                  <CardSmall content={tag} />
                </Link>
              ))}
            </div>
          </article>

          <article className="home__card-container">
            <h3 className="h3--dark">Under 15 min</h3>
            <div className="cards-wrapper">
              {timeTag.map((tag) => (
                <Link to={`/recipe/${tag.productID}`} key={tag.productID}>
                  <CardSmall content={tag} />
                </Link>
              ))}
            </div>
          </article>

          <article className="home__card-container">
            <h3 className="h3--dark">Jul</h3>
            <div className="cards-wrapper">
              {julTag.map((tag) => (
                <Link to={`/recipe/${tag.productID}`} key={tag.productID}>
                  <CardSmall content={tag} />
                </Link>
              ))}
            </div>
          </article>
        </main>
      )}
    </>
  );
};

export default Home;
