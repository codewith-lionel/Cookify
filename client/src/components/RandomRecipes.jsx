import React from 'react';

/**
 * RandomRecipes Component
 * Displays random recipe suggestions
 */
const RandomRecipes = ({ recipes, isLoading, onViewRecipe }) => {
  if (isLoading) {
    return (
      <div className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          ✨ Featured Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
        ✨ Featured Recipes
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Recipe Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={`https://source.unsplash.com/800x600/?${recipe.cuisine || 'food'},recipe,dish,${index}`}
                alt={recipe.recipeName}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop';
                }}
              />
              {recipe.cuisine && (
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow-lg">
                  {recipe.cuisine}
                </span>
              )}
            </div>
            
            <div className="p-6">
            {/* Recipe Name */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {recipe.recipeName}
            </h3>

            {/* Description */}
            {recipe.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {recipe.description}
              </p>
            )}

            {/* Recipe Details */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              {recipe.difficulty && (
                <span className="flex items-center">
                  <span className="mr-1">📊</span>
                  {recipe.difficulty}
                </span>
              )}
              {recipe.cookingTime && (
                <span className="flex items-center">
                  <span className="mr-1">⏱️</span>
                  {recipe.cookingTime}
                </span>
              )}
            </div>

            {/* View Button */}
            <button
              onClick={() => {
                if (onViewRecipe) {
                  onViewRecipe(recipe);
                }
              }}
              className="w-full bg-secondary hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              👀 View Recipe
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomRecipes;
