import React from "react";
import { Link } from "react-router-dom";
import CardSmall from "../../components/recipe-cards/CardSmall";
import './Home.css';

interface SearchResultsProps {
  searchResults: Array<{ productID: string; productName: string; tags: string[] }>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <main className="container">
    <div className="home__search-results">
        {searchResults.map((product) => (
          <Link to={`/recipe/${product.productID}`} key={product.productID}>
            <CardSmall content={product} />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SearchResults;
