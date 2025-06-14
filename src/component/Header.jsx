import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import Card from "./Card";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  const [recipe, setRecipe] = useState(null);
  const [details, setDetails] = useState([]);
  const [foodName, setFoodName] = useState("chicken");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const foodApi = async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();
      setDetails(data.meals || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch recipes. Please try again.");
      setDetails([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (foodName.trim() !== "") {
      const timer = setTimeout(() => {
        foodApi(foodName);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [foodName]);

  const handleInputChange = (e) => {
    setFoodName(e.target.value);
  };

  const handleSearch = () => {
    if (foodName.trim() !== "") {
      foodApi(foodName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="./logo.jpg" alt="Recipe Finder Logo" />
        </div>
        <div className={styles.searchar}>
          <input
            type="text"
            placeholder="Enter Food Name"
            value={foodName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <IoSearchOutline
            onClick={handleSearch}
            className={styles.searchIcon}
            aria-label="Search"
          />
        </div>
      </nav>

      <main className={styles.mainContent}>
        {isLoading && <div className={styles.loading}>Loading recipes...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!isLoading && !error && (
          <Card details={details} setRecipe={setRecipe} />
        )}
      </main>
    </>
  );
};

export default Header;
