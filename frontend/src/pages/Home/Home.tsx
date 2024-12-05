import React, { useState, useEffect } from "react";
import "./Home.css";
import "../../assets/styles/index.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { RootState, AppDispatch } from "../../app/store";
import CardBig from "../../components/recipe-cards/CardBig";
import CardSmall from "../../components/recipe-cards/CardSmall";
import SearchResults from "./SearchResults"; // Importera sökresultatskomponenten

const Home = () => {
  const [localError, setLocalError] = useState<string | null>(null); // För felmeddelanden
  const [inputValue, setInputValue] = useState<string>(""); // Inputvärdet
  const [searchResults, setSearchResults] = useState<any[]>([]); // Sökresultaten

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
      setSearchResults(filteredResults);
    }
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
          <i className="fa-solid fa-filter home__fa-filter"></i>
        </article>
      </section>

      {localError && <p>{localError}</p>}
      {isLoading && <p>Laddar produkter...</p>}
      {isEmpty && <p>Inga produkter hittades.</p>}

      {/* Visa sökresultat om det finns */}
      {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}

      {!isLoading && !isEmpty && searchResults.length === 0 && (
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





/* 

import "./Home.css"
import "../../assets/styles/index.css"
import React, { useState, useEffect } from 'react';
import CardBig from "../../components/recipe-cards/CardBig";
import CardSmall from "../../components/recipe-cards/CardSmall";

interface Product {
    productID: number;
    productName: string;
    description: string;
    price: number;
    image: string;
    bakingTime: string;
    tags: string[];
  }

const Home = () => {

    const [products, setProducts] = useState<Product[] | null>(null); // Tillåter null initialt
    const [error, setError] = useState<string | null>(null); // För felmeddelanden
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://4pewmd0k46.execute-api.eu-north-1.amazonaws.com/products');
          
          if (!response.ok) {
            throw new Error(Server responded with ${response.status});
          }
          const data = await response.json();
          console.log('Fetched data:', data);
          setProducts(Array.isArray(data) ? data : []); // Säkerställ att det är en array
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Kunde inte ladda produkter. Försök igen senare.');
        }
      };
  
      fetchProducts();
    }, []);
  
    if (error) {
      return <p>{error}</p>; // Visa felmeddelande
    }
  
    if (!products) {
      return <p>Laddar produkter...</p>; // Visa laddningsindikator
    }
  
    if (products.length === 0) {
      return <p>Inga produkter hittades.</p>; // Hantera tom respons
    }
    

    const julTag = products.filter((product) => product.tags.includes("jul"))
    const timeTag = products.filter((product) => product.tags.includes("15 min"))
    const trendingTag = products.filter((product) => product.tags.includes("trending"))

    console.log("Jul Tag" , julTag)
    

    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      alert(Du skrev: ${inputValue});
    };


  return (
    <>
    <section className='home__header'>
        <h2 className='h2--light'>Vad vill du baka idag?</h2>
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
    <i className="fa-solid fa-filter home__fa-filter"></i>
</article>
        
    </section>
       <main className="container">

<article className="home__card-container">
    <h3 className="h3--dark">Beställ igen</h3>
    <CardBig
    
    />
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Trending</h3>
    <div className="cards-wrapper">
        <CardSmall 
        content={trendingTag}
        />

    </div>
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Under 15 min</h3>
    <div className="cards-wrapper">
        <CardSmall 
        content={timeTag}
        />

    </div>
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Jul</h3>
    <div className="cards-wrapper">
        <CardSmall 
        content={julTag}
        />

    </div>
</article>
            
       </main> 
    </>
  )
}

export default Home

*/