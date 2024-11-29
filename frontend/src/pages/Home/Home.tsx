import "./Home.css"
import "../../assets/styles/index.css"
import React, { useState } from 'react';
import CardBig from "../../components/recipe-cards/CardBig";
import CardSmall from "../../components/recipe-cards/CardSmall";

const Home = () => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      alert(`Du skrev: ${inputValue}`);
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
    <CardBig/>
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Trending</h3>
    <div className="cards-wrapper">
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
    </div>
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Under 15 min</h3>
    <div className="cards-wrapper">
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
    </div>
</article>
<article className="home__card-container">
    <h3 className="h3--dark">Jul</h3>
    <div className="cards-wrapper">
        <CardSmall />
        <CardSmall />
        <CardSmall />
        <CardSmall />
    </div>
</article>
            
       </main> 
    </>
  )
}

export default Home