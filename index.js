const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    //2
    const recipe = new Recipe({
      title: "Ovos Mexidos",
      level: "Easy Peasy",
      ingredients: "Ovos, Sal, Pimenta",
      cuisine: "Mexe os ovos e acrescenta sal e pimenta",
      dishType: "breakfast",
      image:
        "https://feelgoodfoodie.net/wp-content/uploads/2022/02/How-to-Make-Scrambled-Eggs-08.jpg",
      duration: 10,
      creator: "Chef",
    });
    const savedRecipe = await recipe.save();
    console.log(savedRecipe.title);
    //3
    const createAllRecipes = await Recipe.insertMany(data);
    createAllRecipes.forEach((recipe) => console.log(recipe.title));
    //4
    const updatedRecipe = await Recipe.updateOne(
      { duration: 220 },
      { duration: 100 }
    );
    console.log("Recipe Updated");
    //5
    const removeRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe Deleted");
    //6
    dbConnection.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
