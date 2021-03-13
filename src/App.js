import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './components/Recipe';

const App = () => {
  const APP_ID = 'f938a7cc';
  const APP_KEY = '6e3ffc54c2eff7205cb0a46b33409e2e';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    // This functions runs at the same time as we are receiving data
    const response = await fetch(exampleReq); // this is when we receive the data
    const data = await response.json(); // this is where we convert it to JSON so that we can use it
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();

    setQuery(search);
    //setSearch('');
  };

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input type='text' className='search-bar' value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
