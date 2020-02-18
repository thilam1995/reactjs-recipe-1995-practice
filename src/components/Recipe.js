import React from 'react';
import { Link } from "react-router-dom";

const API_KEYS = "12d0b2cb346d4b90e0088f9cf65000e9";
const API_ID = "f93672b4";


class Recipe extends React.Component {
    state = {
        activeRecipe: []
    }

    componentDidMount = async () => {
        //const title = this.props.location.state.recipe;
        const uri = encodeURIComponent(this.props.location.state.uri);
        // console.log(uri.length);
        // console.log(uri.substring(44, uri.length))
        // const uri_id = uri.substring(44, uri.length);
        const req = await fetch
            (`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?r=${uri}&app_id=${API_ID}&app_key=${API_KEYS}`);
        const res = await req.json();
        this.setState({ activeRecipe: res[0] })
        console.log(this.state.activeRecipe);
    }
    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                {
                    this.state.activeRecipe.length !== 0 &&
                    <div className="active-recipe marginbottondown">
                        <img className="active-recipe__img" src={recipe.image} alt={recipe.label} />
                        <h3 className="recipes__title">{recipe.label}</h3>
                        <h4 className="recipes__publisher">
                            Source: <span>{recipe.source}</span>
                        </h4>
                        <p className="active-recipe__website">
                            <span>
                                <a href={recipe.url}>{recipe.url}</a>
                            </span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                        </button>
                    </div>
                }
            </div>
        );
    }
}



export default Recipe;