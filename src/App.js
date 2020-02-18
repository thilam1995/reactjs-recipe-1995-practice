import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEYS = "12d0b2cb346d4b90e0088f9cf65000e9";
const API_ID = "f93672b4";

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    
    e.preventDefault();
    const api_call = await fetch
      (`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${recipeName}&from=3&count=4&app_id=${API_ID}&app_key=${API_KEYS}`);
    const data = await api_call.json();
    this.setState({ recipes: data.hits })
    console.log(this.state.recipes);
  }

  // componentDidMount = () => {
  //   if(localStorage.getItem('recipes') !== null || localStorage.getItem('recipes') !== undefined){
  //     const json = localStorage.getItem('recipes');
  //     const recipes = JSON.parse(json);
  //     this.setState({recipes});
  //   }
  // }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        {
          this.state.recipes !== 0 && <Recipes recipes={this.state.recipes}/>
        }

      </div>
    );
  }

}

export default App;
