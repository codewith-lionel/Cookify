import React, { useState } from 'react';

/**
 * RecipeForm Component
 * Form for inputting recipe generation parameters
 */
const RecipeForm = ({ onGenerateRecipe, isLoading }) => {
  const [formData, setFormData] = useState({
    ingredients: '',
    cuisine: 'Any',
    vessel: 'Any'
  });

  // Cuisine options
  const cuisines = ['Any', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Continental'];
  
  // Cooking vessel options
  const vessels = ['Any', 'Oven', 'Gas Stove', 'Induction', 'Pressure Cooker', 'Air Fryer'];

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate ingredients
    if (!formData.ingredients.trim()) {
      alert('Please enter at least one ingredient');
      return;
    }

    // Pass form data to parent component
    onGenerateRecipe(formData);
  };

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setFormData({
      ingredients: '',
      cuisine: 'Any',
      vessel: 'Any'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        🍳 Generate Your Recipe
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ingredients Input */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700 mb-2">
            Ingredients <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients (comma-separated)&#10;Example: chicken, tomatoes, onions, garlic, rice"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
            rows="4"
            disabled={isLoading}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple ingredients with commas
          </p>
        </div>

        {/* Cuisine Selector */}
        <div>
          <label htmlFor="cuisine" className="block text-sm font-semibold text-gray-700 mb-2">
            Cuisine Type
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
            disabled={isLoading}
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Cooking Vessel Selector */}
        <div>
          <label htmlFor="vessel" className="block text-sm font-semibold text-gray-700 mb-2">
            Cooking Vessel
          </label>
          <select
            id="vessel"
            name="vessel"
            value={formData.vessel}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
            disabled={isLoading}
          >
            {vessels.map(vessel => (
              <option key={vessel} value={vessel}>
                {vessel}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? 'Generating...' : '✨ Generate Recipe'}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔄 Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
