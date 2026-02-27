import React from 'react';

/**
 * RecipeResult Component
 * Displays the generated recipe details
 */
const RecipeResult = ({ recipe }) => {
  if (!recipe) return null;

  const {
    recipeName,
    cuisine,
    ingredients,
    steps,
    cookingTime,
    difficulty,
    vessel,
    servings
  } = recipe;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
      {/* Recipe Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={`https://source.unsplash.com/1200x800/?${cuisine || 'food'},${recipeName.split(' ')[0]},cooking,recipe`}
          alt={recipeName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=800&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
            {recipeName}
          </h2>
          {/* Recipe Meta Information */}
          <div className="flex flex-wrap gap-3 text-sm">
            {cuisine && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white font-medium shadow-lg">
                🌍 {cuisine}
              </span>
            )}
            {difficulty && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-white font-medium shadow-lg">
                📊 {difficulty}
              </span>
            )}
            {cookingTime && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white font-medium shadow-lg">
                ⏱️ {cookingTime}
              </span>
            )}
            {vessel && vessel !== 'Any' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500 text-white font-medium shadow-lg">
                🍳 {vessel}
              </span>
            )}
            {servings && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white font-medium shadow-lg">
                👥 Serves {servings}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
      {/* Ingredients Section */}
      {ingredients && ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🛒</span> Ingredients
          </h3>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cooking Steps Section */}
      {steps && steps.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">👨‍🍳</span> Cooking Instructions
          </h3>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">
                  {index + 1}
                </span>
                <p className="text-gray-700 flex-1 pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Save Recipe Button */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <button
          onClick={() => {
            // Save to localStorage
            localStorage.setItem('lastRecipe', JSON.stringify(recipe));
            alert('Recipe saved successfully! 🎉');
          }}
          className="w-full md:w-auto bg-secondary hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          💾 Save Recipe
        </button>
      </div>
      </div>
    </div>
  );
};

export default RecipeResult;
