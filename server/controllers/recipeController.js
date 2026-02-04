import Groq from 'groq-sdk';

/**
 * Recipe Controller
 * Handles recipe generation using Groq AI
 */

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Generate recipe using Groq AI
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateRecipe = async (req, res) => {
  try {
    const { ingredients, cuisine, vessel } = req.body;

    // Validate inputs
    if (!ingredients || ingredients.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Ingredients are required' 
      });
    }

    // Create prompt for Groq AI
    const prompt = `You are a professional chef and recipe creator. Generate a recipe using ONLY the following ingredients: ${ingredients}.

Recipe Requirements:
- Cuisine: ${cuisine || 'Any'}
- Cooking Vessel: ${vessel || 'Any'}
- Use ONLY the provided ingredients (no additional ingredients)
- The recipe can be vegetarian, non-vegetarian, dessert, snack, or drink
- Provide clear, step-by-step instructions

Return ONLY a valid JSON object with this EXACT structure (no markdown, no additional text):
{
  "recipeName": "Name of the recipe",
  "cuisine": "${cuisine || 'Any'}",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "steps": ["Step 1 instruction", "Step 2 instruction"],
  "cookingTime": "XX minutes",
  "difficulty": "Easy/Medium/Hard",
  "vessel": "${vessel || 'Any'}"
}`;

    // Call Groq AI API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional chef that only responds with valid JSON. Never include markdown formatting or explanations, only pure JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    // Parse the response
    const recipeText = chatCompletion.choices[0]?.message?.content;
    
    if (!recipeText) {
      throw new Error('No response from AI');
    }

    // Parse JSON response
    let recipe;
    try {
      recipe = JSON.parse(recipeText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', recipeText);
      throw new Error('Invalid JSON response from AI');
    }

    // Return the recipe
    res.json({
      success: true,
      recipe
    });

  } catch (error) {
    console.error('Recipe Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recipe',
      message: error.message 
    });
  }
};

/**
 * Get random recipes for the homepage
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getRandomRecipes = async (req, res) => {
  try {
    // Static random recipes (can be replaced with Groq-generated ones)
    const randomRecipes = [
      {
        recipeName: 'Classic Margherita Pizza',
        cuisine: 'Italian',
        description: 'Traditional Italian pizza with tomato, mozzarella, and fresh basil',
        difficulty: 'Easy',
        cookingTime: '30 minutes'
      },
      {
        recipeName: 'Chicken Tikka Masala',
        cuisine: 'Indian',
        description: 'Creamy and flavorful Indian curry with tender chicken pieces',
        difficulty: 'Medium',
        cookingTime: '45 minutes'
      },
      {
        recipeName: 'Pad Thai',
        cuisine: 'Chinese',
        description: 'Stir-fried rice noodles with eggs, vegetables, and peanuts',
        difficulty: 'Medium',
        cookingTime: '25 minutes'
      },
      {
        recipeName: 'Beef Tacos',
        cuisine: 'Mexican',
        description: 'Seasoned ground beef in crispy tortillas with fresh toppings',
        difficulty: 'Easy',
        cookingTime: '20 minutes'
      },
      {
        recipeName: 'Caesar Salad',
        cuisine: 'Continental',
        description: 'Fresh romaine lettuce with parmesan, croutons, and Caesar dressing',
        difficulty: 'Easy',
        cookingTime: '15 minutes'
      },
      {
        recipeName: 'Chocolate Lava Cake',
        cuisine: 'Continental',
        description: 'Decadent chocolate cake with a molten center',
        difficulty: 'Medium',
        cookingTime: '25 minutes'
      }
    ];

    res.json({
      success: true,
      recipes: randomRecipes
    });

  } catch (error) {
    console.error('Random Recipes Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch random recipes',
      message: error.message 
    });
  }
};
