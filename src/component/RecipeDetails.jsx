import React from "react";
import styles from "./Recipe.module.css";

const RecipeDetails = ({ recipe, setRecipe }) => {
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={() => setRecipe(null)}>
          &times;
        </button>

        <h1 className={styles.title}>{recipe.strMeal}</h1>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className={styles.image}
            />
            <div className={styles.tags}>
              {recipe.strTags &&
                recipe.strTags.split(",").map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag.trim()}
                  </span>
                ))}
              <span className={styles.category}>{recipe.strCategory}</span>
              {recipe.strArea && (
                <span className={styles.area}>{recipe.strArea}</span>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.ingredients}>
              <h2>Ingredients</h2>
              <ul>
                {ingredients.map((item, index) => (
                  <li key={index}>
                    <span className={styles.measure}>{item.measure}</span>
                    <span className={styles.ingredient}>{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.instructions}>
              <h2>Instructions</h2>
              <div className={styles.instructionsText}>
                {recipe.strInstructions.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {recipe.strYoutube && (
          <div className={styles.video}>
            <h2>Video Tutorial</h2>
            <div className={styles.videoContainer}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  recipe.strYoutube.split("v=")[1]
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
