import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware Configuration
 */

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * API Routes
 */
app.use('/api', apiRoutes);

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Cookify API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Root Endpoint
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Cookify API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      generateRecipe: 'POST /api/generate-recipe',
      randomRecipes: 'GET /api/random-recipes',
      nutrition: 'POST /api/nutrition'
    }
  });
});

/**
 * Error Handling Middleware
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path 
  });
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Cookify Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
  
  // Check if API keys are configured
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️  WARNING: GROQ_API_KEY not configured');
  }
  if (!process.env.NUTRITION_API_KEY) {
    console.warn('⚠️  WARNING: NUTRITION_API_KEY not configured (will use mock data)');
  }
});

export default app;
