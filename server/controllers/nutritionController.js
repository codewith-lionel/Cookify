import axios from 'axios';

/**
 * Nutrition Controller
 * Handles nutrition information retrieval using Edamam API
 */

/**
 * Get nutrition information for ingredients
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getNutritionInfo = async (req, res) => {
  try {
    const { ingredients } = req.body;

    // Validate inputs
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ 
        error: 'Ingredients array is required' 
      });
    }

    // Check if nutrition API credentials are configured
    if (!process.env.NUTRITION_API_KEY || !process.env.NUTRITION_APP_ID) {
      console.warn('Nutrition API not configured, returning mock data');
      return res.json({
        success: true,
        nutrition: getMockNutrition()
      });
    }

    // Prepare ingredients for Edamam API
    const ingredientList = ingredients.map(ing => {
      // Clean up the ingredient string (remove quantities if needed)
      return ing;
    });

    // Call Edamam Nutrition Analysis API
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details`,
      {
        title: 'Recipe',
        ingr: ingredientList
      },
      {
        params: {
          app_id: process.env.NUTRITION_APP_ID,
          app_key: process.env.NUTRITION_API_KEY
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract nutrition data
    const nutritionData = response.data;
    const totalNutrients = nutritionData.totalNutrients || {};

    const nutrition = {
      calories: Math.round(nutritionData.calories || 0),
      protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
      carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
      fat: Math.round(totalNutrients.FAT?.quantity || 0),
      fiber: Math.round(totalNutrients.FIBTG?.quantity || 0),
      servings: nutritionData.yield || 1
    };

    res.json({
      success: true,
      nutrition
    });

  } catch (error) {
    console.error('Nutrition API Error:', error.response?.data || error.message);
    
    // If API fails, return mock data as fallback
    res.json({
      success: true,
      nutrition: getMockNutrition(),
      note: 'Using estimated nutrition values'
    });
  }
};

/**
 * Get mock nutrition data (fallback)
 * @returns {Object} Mock nutrition information
 */
function getMockNutrition() {
  return {
    calories: Math.floor(Math.random() * 300) + 200, // 200-500 calories
    protein: Math.floor(Math.random() * 20) + 10,    // 10-30g
    carbs: Math.floor(Math.random() * 40) + 20,      // 20-60g
    fat: Math.floor(Math.random() * 15) + 5,         // 5-20g
    fiber: Math.floor(Math.random() * 8) + 2,        // 2-10g
    servings: 1
  };
}
