import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './components/RecipeForm';
import RecipeResult from './components/RecipeResult';
import NutritionCard from './components/NutritionCard';
import RandomRecipes from './components/RandomRecipes';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * Main App Component
 * Cookify - AI-powered Recipe Generator
 */
function App() {
  // State management
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_BASE_URL = '/api';

  /**
   * Fetch random recipes on component mount
   */
  useEffect(() => {
    fetchRandomRecipes();
    loadLastRecipe();
  }, []);

  /**
   * Load last recipe from localStorage
   */
  const loadLastRecipe = () => {
    try {
      const lastRecipe = localStorage.getItem('lastRecipe');
      if (lastRecipe) {
        const parsedRecipe = JSON.parse(lastRecipe);
        setRecipe(parsedRecipe);
      }
    } catch (err) {
      console.error('Error loading last recipe:', err);
    }
  };

  /**
   * Fetch random recipes from API
   */
  const fetchRandomRecipes = async () => {
    try {
      setIsLoadingRandom(true);
      const response = await axios.get(`${API_BASE_URL}/random-recipes`);
      setRandomRecipes(response.data.recipes || []);
    } catch (err) {
      console.error('Error fetching random recipes:', err);
    } finally {
      setIsLoadingRandom(false);
    }
  };

  /**
   * Generate recipe using AI
   */
  const handleGenerateRecipe = async (formData) => {
    try {
      setIsGenerating(true);
      setError(null);
      setRecipe(null);
      setNutrition(null);

      // Call recipe generation API
      const recipeResponse = await axios.post(`${API_BASE_URL}/generate-recipe`, {
        ingredients: formData.ingredients,
        cuisine: formData.cuisine,
        vessel: formData.vessel
      });

      const generatedRecipe = recipeResponse.data.recipe;
      setRecipe(generatedRecipe);

      // Save to localStorage
      localStorage.setItem('lastRecipe', JSON.stringify(generatedRecipe));

      // Fetch nutrition information
      if (generatedRecipe.ingredients && generatedRecipe.ingredients.length > 0) {
        fetchNutritionInfo(generatedRecipe.ingredients);
      }

      // Scroll to recipe result
      setTimeout(() => {
        const recipeElement = document.getElementById('recipe-result');
        if (recipeElement) {
          recipeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      console.error('Error generating recipe:', err);
      setError(err.response?.data?.message || 'Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Fetch nutrition information for ingredients
   */
  const fetchNutritionInfo = async (ingredients) => {
    try {
      const nutritionResponse = await axios.post(`${API_BASE_URL}/nutrition`, {
        ingredients
      });
      setNutrition(nutritionResponse.data.nutrition);
    } catch (err) {
      console.error('Error fetching nutrition info:', err);
      // Don't show error for nutrition, as it's not critical
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              🍳 Cookify
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            AI-Powered Recipe Generator - Turn Your Ingredients Into Delicious Meals
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Recipe Generator Form */}
        <section className="max-w-3xl mx-auto mb-12">
          <RecipeForm 
            onGenerateRecipe={handleGenerateRecipe}
            isLoading={isGenerating}
          />
        </section>

        {/* Loading State */}
        {isGenerating && (
          <section className="max-w-3xl mx-auto mb-12">
            <LoadingSpinner message="Generating your recipe... 🧑‍🍳" />
          </section>
        )}

        {/* Error Message */}
        {error && (
          <section className="max-w-3xl mx-auto mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center animate-fadeIn">
              <p className="text-red-600 font-semibold">❌ {error}</p>
            </div>
          </section>
        )}

        {/* Recipe Result Section */}
        {recipe && !isGenerating && (
          <section id="recipe-result" className="max-w-3xl mx-auto mb-12">
            <RecipeResult recipe={recipe} />
          </section>
        )}

        {/* Nutrition Card Section */}
        {nutrition && !isGenerating && (
          <section className="max-w-3xl mx-auto mb-12">
            <NutritionCard nutrition={nutrition} />
          </section>
        )}

        {/* Random Recipes Section */}
        <section className="max-w-6xl mx-auto">
          <RandomRecipes 
            recipes={randomRecipes}
            isLoading={isLoadingRandom}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🍳 Cookify</p>
          <p className="text-gray-400 text-sm">
            AI-Powered Recipe Generator | Built with React, Node.js & Groq AI
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © 2024 Cookify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
