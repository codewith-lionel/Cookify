# 🍳 Cookify - AI-Powered Recipe Generator

Transform your ingredients into delicious recipes with the power of AI! Cookify is a modern web application that generates personalized recipes based on your available ingredients, preferred cuisine, and cooking equipment.

![Cookify](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.1-blue)
![Groq AI](https://img.shields.io/badge/Groq-AI-orange)

## ✨ Features

- 🤖 **AI-Powered Recipe Generation** - Uses Groq AI to create unique recipes
- 🥗 **Smart Ingredient Matching** - Generate recipes using only your available ingredients
- 🌍 **Multiple Cuisines** - Indian, Italian, Chinese, Mexican, Continental, and more
- 🍳 **Cooking Vessel Options** - Tailored recipes for different cooking equipment
- 📊 **Nutrition Information** - Get detailed nutritional facts for your recipes
- 🎲 **Random Recipe Suggestions** - Discover new recipes on the homepage
- 💾 **Save Recipes** - Store your favorite recipes locally
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean and intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Groq AI SDK** - AI-powered recipe generation
- **Axios** - HTTP client for Nutrition API

### APIs
- **Groq AI** - Recipe generation with Mixtral-8x7b model
- **Edamam Nutrition API** - Nutrition information (with fallback)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Groq API Key** - Get from [Groq Console](https://console.groq.com/)
- **Nutrition API Key** (Optional) - Get from [Edamam](https://developer.edamam.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/codewith-lionel/Cookify.git
cd Cookify
```

### 2. Setup Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file and add your API keys:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
NUTRITION_API_KEY=your_nutrition_api_key_here
NUTRITION_APP_ID=your_nutrition_app_id_here
```

### 3. Install Dependencies

**Install Server Dependencies:**
```bash
cd server
npm install
```

**Install Client Dependencies:**
```bash
cd ../client
npm install
```

### 4. Start the Application

**Start the Backend Server (in the server directory):**
```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

**Start the Frontend (in a new terminal, in the client directory):**
```bash
cd client
npm run dev
```

The client will run on `http://localhost:3000`

### 5. Open the Application

Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Cookify/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecipeForm.jsx         # Recipe input form
│   │   │   ├── RecipeResult.jsx       # Display generated recipe
│   │   │   ├── NutritionCard.jsx      # Show nutrition facts
│   │   │   ├── RandomRecipes.jsx      # Featured recipes
│   │   │   └── LoadingSpinner.jsx     # Loading indicator
│   │   ├── App.jsx                    # Main app component
│   │   ├── App.css                    # Global styles
│   │   └── main.jsx                   # React entry point
│   ├── index.html                     # HTML template
│   ├── package.json                   # Client dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind configuration
│   └── postcss.config.js              # PostCSS configuration
│
├── server/                    # Node.js backend
│   ├── routes/
│   │   └── api.js                     # API routes
│   ├── controllers/
│   │   ├── recipeController.js        # Recipe generation logic
│   │   └── nutritionController.js     # Nutrition API logic
│   ├── server.js                      # Express server
│   └── package.json                   # Server dependencies
│
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🎯 Usage

### Generate a Recipe

1. **Enter Ingredients**: Type your available ingredients separated by commas
   - Example: `chicken, tomatoes, onions, garlic, rice`

2. **Select Cuisine**: Choose your preferred cuisine type
   - Options: Any, Indian, Italian, Chinese, Mexican, Continental

3. **Select Cooking Vessel**: Choose your cooking equipment
   - Options: Any, Oven, Gas Stove, Induction, Pressure Cooker, Air Fryer

4. **Generate**: Click "✨ Generate Recipe" button

5. **View Results**: 
   - Recipe details with step-by-step instructions
   - Nutrition information
   - Save recipe for later

## 🔧 API Endpoints

### Recipe Endpoints

#### POST `/api/generate-recipe`
Generate a recipe using AI

**Request Body:**
```json
{
  "ingredients": "chicken, tomatoes, onions",
  "cuisine": "Indian",
  "vessel": "Pressure Cooker"
}
```

**Response:**
```json
{
  "success": true,
  "recipe": {
    "recipeName": "Chicken Curry",
    "cuisine": "Indian",
    "ingredients": ["500g chicken", "2 tomatoes", "1 onion"],
    "steps": ["Step 1...", "Step 2..."],
    "cookingTime": "30 minutes",
    "difficulty": "Medium",
    "vessel": "Pressure Cooker"
  }
}
```

#### GET `/api/random-recipes`
Get featured random recipes

**Response:**
```json
{
  "success": true,
  "recipes": [...]
}
```

### Nutrition Endpoint

#### POST `/api/nutrition`
Get nutrition information for ingredients

**Request Body:**
```json
{
  "ingredients": ["500g chicken", "2 tomatoes", "1 onion"]
}
```

**Response:**
```json
{
  "success": true,
  "nutrition": {
    "calories": 450,
    "protein": 35,
    "carbs": 25,
    "fat": 15,
    "fiber": 5,
    "servings": 1
  }
}
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `GROQ_API_KEY` | Groq AI API key | Yes |
| `NUTRITION_API_KEY` | Edamam Nutrition API key | No* |
| `NUTRITION_APP_ID` | Edamam App ID | No* |

*Note: If nutrition API keys are not provided, the app will use mock nutrition data.

## 🎨 Customization

### Change Primary Colors

Edit `client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#4F46E5',    // Change this
      secondary: '#10B981',  // Change this
    }
  }
}
```

### Modify Cuisine Options

Edit `client/src/components/RecipeForm.jsx`:

```javascript
const cuisines = ['Any', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Continental'];
```

### Modify Cooking Vessels

Edit `client/src/components/RecipeForm.jsx`:

```javascript
const vessels = ['Any', 'Oven', 'Gas Stove', 'Induction', 'Pressure Cooker', 'Air Fryer'];
```

## 🐛 Troubleshooting

### Issue: "GROQ_API_KEY not configured"
**Solution**: Make sure you've created a `.env` file in the `server` directory with your Groq API key.

### Issue: "Port already in use"
**Solution**: Change the PORT in your `.env` file or kill the process using the port:
```bash
# On Linux/Mac
lsof -ti:5000 | xargs kill -9

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Nutrition data shows "estimated values"
**Solution**: This means the Nutrition API is not configured. Add your Edamam API credentials to the `.env` file, or continue using the mock data.

## 📝 Development

### Start Development Server

```bash
# Terminal 1 - Backend (with auto-reload)
cd server
npm run dev

# Terminal 2 - Frontend (with hot reload)
cd client
npm run dev
```

### Build for Production

```bash
# Build frontend
cd client
npm run build

# The build output will be in client/dist/
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Groq AI](https://groq.com/) - For powerful AI capabilities
- [Edamam](https://www.edamam.com/) - For nutrition data
- [React](https://react.dev/) - For the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [Vite](https://vitejs.dev/) - For lightning-fast development

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ and 🍳 by the Cookify Team**
