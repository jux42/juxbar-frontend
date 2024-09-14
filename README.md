
# Juxbar - Frontend

This project is the frontend of the **Juxbar** application, an Angular-based web app for managing cocktails, soft drinks, and ingredients. The app provides functionalities for browsing, filtering, and viewing details of drinks, managing user profiles, and creating custom drinks. This README will walk you through the project's structure, features, and usage instructions.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Main Features](#main-features)
- [Routing](#routing)
- [Services](#services)
- [Components](#components)
- [Animations](#animations)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

### Prerequisites
To run this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/) (version 16 or higher recommended)
- [Angular CLI](https://angular.io/cli) (version 15 or higher)
- A modern web browser (e.g., Chrome, Firefox)

### Clone the repository
```bash
git clone https://github.com/yourusername/juxbar-frontend.git
cd juxbar-frontend
```

### Install dependencies
```bash
npm install
```

### Running the development server
To start a local development server, run:
```bash
ng serve
```
The application will be available at `http://localhost:4200`.

### Building the project
To build the project for production:
```bash
ng build
```
The production files will be located in the `dist/` directory.

---

## Project Structure

- **src/app/** : The main directory containing the core application code.
  - **animations.ts** : Defines custom animations used in the app.
  - **core/** : Contains services, guards, and common components like headers and sidebars.
  - **drinks/** : Contains components for cocktails, soft drinks, and ingredients.
    - **cocktails/** : Components related to cocktail management (list and details).
    - **soft-drinks/** : Components related to soft drinks (list and details).
    - **ingredients/** : Components related to ingredient management.
  - **models/** : Defines TypeScript interfaces and models for the app's data structures (e.g., `Cocktail`, `SoftDrink`, `Ingredient`).
  - **app.component.ts** : The root component of the app.
  - **app.routes.ts** : Defines the application routes and lazy-loaded modules.

---

## Main Features

- **Cocktail List**: Browse and filter a wide range of cocktails by name or ingredient.
- **Cocktail Details**: View detailed information about a selected cocktail, including ingredients and instructions.
- **Soft Drinks**: Explore a variety of non-alcoholic drinks with the same functionality as the cocktail management.
- **Ingredient Details**: Look up details about specific ingredients used in cocktails and soft drinks.
- **User Profiles**: Manage user profiles and create personal custom cocktails (requires authentication).
- **Responsive Design**: The app is optimized for mobile, tablet, and desktop viewing.
- **Animations**: Smooth transitions between pages and elements using Angular animations.

---

## Routing

The application uses Angular's built-in routing system. Below are some of the key routes:
- `/` : The landing page.
- `/login` : The login page.
- `/juxbar/cocktailhome` : The homepage for cocktails.
- `/juxbar/softdrinkhome` : The homepage for soft drinks.
- `/juxbar/listall` : Displays all cocktails.
- `/juxbar/listallsofts` : Displays all soft drinks.
- `/juxbar/onecocktail/:id` : Displays the details of a specific cocktail by its ID.
- `/juxbar/onesoftdrink/:id` : Displays the details of a specific soft drink by its ID.
- `/juxbar/profile` : User profile page (protected by `authGuard`).
- `/juxbar/detailledingredient/:strIngredient` : Shows details of a specific ingredient.

Lazy loading is implemented for several components to improve performance.

---

## Services

### CocktailService
- **getAllCocktails()** : Fetches all cocktails.
- **getOneCocktailById(id: number)** : Fetches details of a specific cocktail.
- **getCocktailsByIngredient(ingredient: string)** : Filters cocktails by ingredient.

### SoftDrinkService
- **getAllSoftDrinks()** : Fetches all soft drinks.
- **getOneSoftDrinkById(id: number)** : Fetches details of a specific soft drink.
- **getSoftDrinksByIngredient(ingredient: string)** : Filters soft drinks by ingredient.

### IngredientService
- **getAllIngredients()** : Fetches all available ingredients.
- **getIngredientDetails(ingredient: string)** : Fetches details of a specific ingredient.

### AuthGuard
- Protects routes that require authentication.

### AuthService
- Manages authentication and user sessions.

---

## Components

### Cocktail Components
- **CocktailListComponent** : Displays the list of cocktails with search and filter options.
- **SingleCocktailComponent** : Displays the details of a selected cocktail, including ingredients.

### Soft Drink Components
- **SoftDrinkListComponent** : Displays the list of soft drinks with search and filter options.
- **SingleSoftDrinkComponent** : Displays the details of a selected soft drink, including ingredients.

### Common Components
- **HeaderComponent** : The main header/navigation bar, conditionally displayed based on the route.
- **LandingPageComponent** : The main landing page when the app is first loaded.
- **ProfileComponent** : Displays and manages user profile information.

All components are modular and use Angular's **standalone component** feature for ease of reuse.

---

## Animations

The project uses custom Angular animations to enhance the user experience. Some key animations include:
- **slideInAnimation** : Used for smooth page transitions.
- **fadeInAnimation** : Provides a fade-in effect when elements appear on the page.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Thank you for checking out the Juxbar Frontend project! Feel free to reach out if you have any questions or suggestions.
