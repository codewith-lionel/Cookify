import express from 'express';
import { generateRecipe, getRandomRecipes } from '../controllers/recipeController.js';
import { getNutritionInfo } from '../controllers/nutritionController.js';

const router = express.Router();

/**
 * Recipe Routes
 */

// POST /api/generate-recipe - Generate a recipe using Groq AI
router.post('/generate-recipe', generateRecipe);

// GET /api/random-recipes - Get random recipe suggestions
router.get('/random-recipes', getRandomRecipes);

/**
 * Nutrition Routes
 */

// POST /api/nutrition - Get nutrition information for ingredients
router.post('/nutrition', getNutritionInfo);

export default router;
