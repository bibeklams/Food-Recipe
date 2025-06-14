import React from "react";
import styles from "./card.module.css";
import RecipeDetails from "./RecipeDetails";

const Card = ({ details, setRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setRecipe(recipe);
  };

  return (
    <>
      <div className={styles.card_container}>
        {details &&
          details.map((dish) => (
            <div key={dish.idMeal} className={styles.card}>
              <div className={styles.image}>
                <img src={dish.strMealThumb} alt={dish.strMeal} />
              </div>
              <div className={styles.content}>
                <h2>{dish.strMeal}</h2>
                <p className={styles.category}>{dish.strCategory}</p>
                <button
                  className={styles.recipeBtn}
                  onClick={() => handleRecipeClick(dish)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
      </div>

      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          setRecipe={() => {
            setSelectedRecipe(null);
            setRecipe(null);
          }}
        />
      )}
    </>
  );
};

export default Card;
