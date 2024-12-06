import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardSmall from "../../components/recipe-cards/CardSmall";
import "./Home.css";
import { Product } from "../../features/products/productsSlice";

interface SearchResultsProps {
  searchResults: Product[];
  showAll: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, showAll }) => {
  const [filter, setFilter] = useState<string>(""); // Filterval
  const [sort, setSort] = useState<string>(""); // Sorteringsval
  // Hantera filterändringar
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  // Hantera sorteringsändringar
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  // Filtrera produkterna
  const filteredResults = searchResults.filter((product) => {
    if(filter) {
      return product.tags.includes(filter);
    }
    return true; // Visa alla om inget filter är valt
  });

  // Sortera de filtrerade resultaten
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price; // Stigande pris
    if (sort === "price-desc") return b.price - a.price; // Fallande pris
    return 0; // Ingen sortering
  });
  const tags: string[] = []
  searchResults.map((product) => {
    product.tags.map((tag) => {
      if(!tags.includes(tag)) {
        tags.push(tag);
      }
    })
  })
  const displayText = showAll
  ? (filter === "" ? "Alla produkter" : "Filtrerade produkter")
  : (filter === "" ? "Sökresultat" : "Filtrerade produkter");
  return (
    <main className="container">
    {/* <div className="home__search-results"> */}
      <h3 className="h3--dark">{displayText}</h3>

      {/* Filtrerings- och sorteringsmenyer */}
      <div className="filter-sort-container">
        <div className="filter-container">
          <label htmlFor="filter">Filtrera efter:</label>
          <select id="filter" className="filter__select" value={filter} onChange={handleFilterChange}>
            <option value="">Alla</option>
            {tags.map((tag) => {
              return <option className="filter__option" key={tag} value={tag}>{tag}</option>
            })}
          </select>
        </div>

        <div className="sort-container">
          <label htmlFor="sort">Sortera efter:</label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="">Ingen sortering</option>
            <option value="price-asc">Pris: Lägst först</option>
            <option value="price-desc">Pris: Högst först</option>
          </select>
        </div>
      </div>

      {/* Visning av resultat */}
      <div className="home__search-results">
        {sortedResults.map((product) => (
          <Link to={`/recipe/${product.productID}`} key={product.productID}>
            <CardSmall content={product} />
          </Link>
        ))}
      </div>
    {/* </div> */}
  </main>
  );
};

export default SearchResults;