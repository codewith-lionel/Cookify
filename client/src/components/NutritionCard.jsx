import React from 'react';

/**
 * NutritionCard Component
 * Displays nutrition information for the recipe
 */
const NutritionCard = ({ nutrition }) => {
  if (!nutrition) return null;

  const { calories, protein, carbs, fat, fiber, servings } = nutrition;

  // Nutrition items configuration
  const nutritionItems = [
    {
      label: 'Calories',
      value: calories,
      unit: 'kcal',
      icon: '🔥',
      color: 'bg-red-100 text-red-700'
    },
    {
      label: 'Protein',
      value: protein,
      unit: 'g',
      icon: '💪',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Carbs',
      value: carbs,
      unit: 'g',
      icon: '🌾',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      label: 'Fat',
      value: fat,
      unit: 'g',
      icon: '🥑',
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Fiber',
      value: fiber,
      unit: 'g',
      icon: '🌿',
      color: 'bg-emerald-100 text-emerald-700'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">📊</span> Nutrition Facts
        </h2>
        {servings && (
          <p className="text-sm text-gray-600 mt-2">
            Per serving {servings > 1 ? `(${servings} servings)` : ''}
          </p>
        )}
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {nutritionItems.map((item) => (
          <div
            key={item.label}
            className={`${item.color} rounded-lg p-4 text-center transition-transform hover:scale-105`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="font-bold text-2xl mb-1">
              {item.value}
              <span className="text-sm ml-1">{item.unit}</span>
            </div>
            <div className="text-sm font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          ℹ️ Nutritional values are approximate and may vary based on specific ingredients and quantities used.
        </p>
      </div>
    </div>
  );
};

export default NutritionCard;
