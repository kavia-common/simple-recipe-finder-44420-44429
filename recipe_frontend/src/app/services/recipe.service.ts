import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl: string;
  tags: string[];
}

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiBase: string;
  private mockRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil',
      ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Salt'],
      instructions: [
        'Preheat oven to 475°F (245°C)',
        'Roll out pizza dough on a floured surface',
        'Spread tomato sauce evenly',
        'Add fresh mozzarella slices',
        'Bake for 12-15 minutes until crust is golden',
        'Top with fresh basil and drizzle with olive oil'
      ],
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      tags: ['Italian', 'Vegetarian', 'Pizza']
    },
    {
      id: 2,
      title: 'Chicken Stir Fry',
      description: 'Quick and healthy Asian-inspired chicken with vegetables',
      ingredients: ['Chicken breast', 'Bell peppers', 'Broccoli', 'Soy sauce', 'Garlic', 'Ginger', 'Sesame oil'],
      instructions: [
        'Cut chicken into bite-sized pieces',
        'Heat sesame oil in a wok or large pan',
        'Cook chicken until golden brown',
        'Add vegetables and stir fry for 5 minutes',
        'Add soy sauce, garlic, and ginger',
        'Serve hot over rice'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 3,
      imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      tags: ['Asian', 'Quick', 'Healthy', 'Chicken']
    },
    {
      id: 3,
      title: 'Caesar Salad',
      description: 'Crisp romaine lettuce with classic Caesar dressing and croutons',
      ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Lemon', 'Black pepper'],
      instructions: [
        'Wash and dry romaine lettuce',
        'Tear lettuce into bite-sized pieces',
        'Toss with Caesar dressing',
        'Add croutons and grated parmesan',
        'Squeeze fresh lemon juice',
        'Season with black pepper'
      ],
      prepTime: 10,
      cookTime: 0,
      servings: 2,
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
      tags: ['Salad', 'Vegetarian', 'Quick']
    },
    {
      id: 4,
      title: 'Beef Tacos',
      description: 'Seasoned ground beef in soft tortillas with fresh toppings',
      ingredients: ['Ground beef', 'Taco seasoning', 'Tortillas', 'Lettuce', 'Tomatoes', 'Cheese', 'Sour cream'],
      instructions: [
        'Brown ground beef in a skillet',
        'Add taco seasoning and water, simmer for 5 minutes',
        'Warm tortillas',
        'Fill tortillas with beef',
        'Top with lettuce, tomatoes, cheese',
        'Add sour cream and enjoy'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
      tags: ['Mexican', 'Quick', 'Beef']
    },
    {
      id: 5,
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies with gooey chocolate chips',
      ingredients: ['Flour', 'Butter', 'Brown sugar', 'White sugar', 'Eggs', 'Vanilla', 'Chocolate chips', 'Baking soda', 'Salt'],
      instructions: [
        'Preheat oven to 375°F (190°C)',
        'Cream butter and sugars together',
        'Beat in eggs and vanilla',
        'Mix in flour, baking soda, and salt',
        'Fold in chocolate chips',
        'Drop spoonfuls onto baking sheet',
        'Bake for 10-12 minutes'
      ],
      prepTime: 15,
      cookTime: 12,
      servings: 24,
      imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
      tags: ['Dessert', 'Baking', 'Sweet']
    },
    {
      id: 6,
      title: 'Grilled Salmon',
      description: 'Fresh salmon fillet with lemon and herbs',
      ingredients: ['Salmon fillet', 'Lemon', 'Dill', 'Olive oil', 'Garlic', 'Salt', 'Pepper'],
      instructions: [
        'Preheat grill to medium-high heat',
        'Brush salmon with olive oil',
        'Season with salt, pepper, and minced garlic',
        'Place salmon skin-side down on grill',
        'Grill for 4-5 minutes per side',
        'Top with fresh dill and lemon juice'
      ],
      prepTime: 5,
      cookTime: 10,
      servings: 2,
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      tags: ['Seafood', 'Healthy', 'Quick']
    },
    {
      id: 7,
      title: 'Vegetable Curry',
      description: 'Aromatic Indian curry with mixed vegetables and coconut milk',
      ingredients: ['Mixed vegetables', 'Coconut milk', 'Curry powder', 'Onion', 'Garlic', 'Ginger', 'Tomatoes', 'Oil'],
      instructions: [
        'Sauté onions, garlic, and ginger in oil',
        'Add curry powder and cook for 1 minute',
        'Add chopped tomatoes and cook until soft',
        'Add mixed vegetables and coconut milk',
        'Simmer for 15-20 minutes',
        'Serve over rice or with naan'
      ],
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      tags: ['Indian', 'Vegetarian', 'Vegan', 'Curry']
    },
    {
      id: 8,
      title: 'Pancakes',
      description: 'Fluffy buttermilk pancakes perfect for breakfast',
      ingredients: ['Flour', 'Buttermilk', 'Eggs', 'Baking powder', 'Sugar', 'Salt', 'Butter', 'Vanilla'],
      instructions: [
        'Mix dry ingredients in a bowl',
        'Whisk together wet ingredients',
        'Combine wet and dry ingredients',
        'Heat a griddle or pan over medium heat',
        'Pour batter to form pancakes',
        'Flip when bubbles form on surface',
        'Serve with syrup and butter'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400',
      tags: ['Breakfast', 'Sweet', 'Vegetarian']
    }
  ];

  constructor(private http: HttpClient) {
    // Read API base from environment variables with fallback
    this.apiBase = this.getEnvironmentVariable('NG_APP_API_BASE') || 
                   this.getEnvironmentVariable('NG_APP_BACKEND_URL') || 
                   '';
  }

  /**
   * Helper to read environment variables
   * Note: In Angular, environment variables need to be accessed differently
   * For now, we'll use mock data as primary source
   */
  private getEnvironmentVariable(key: string): string {
    // Environment variables in Angular need to be configured in environment files
    // For this implementation, we default to mock data
    return '';
  }

  /**
   * PUBLIC_INTERFACE
   * Get all recipes, attempts API call with fallback to mock data
   */
  getAllRecipes(): Observable<Recipe[]> {
    if (this.apiBase) {
      return this.http.get<Recipe[]>(`${this.apiBase}/api/recipes`).pipe(
        catchError((error: HttpErrorResponse) => {
          console.warn('API call failed, using mock data:', error.message);
          return of(this.mockRecipes);
        })
      );
    }
    return of(this.mockRecipes);
  }

  /**
   * PUBLIC_INTERFACE
   * Get a single recipe by ID
   */
  getRecipeById(id: number): Observable<Recipe | undefined> {
    if (this.apiBase) {
      return this.http.get<Recipe>(`${this.apiBase}/api/recipes/${id}`).pipe(
        catchError(() => {
          return of(this.mockRecipes.find(r => r.id === id));
        })
      );
    }
    return of(this.mockRecipes.find(r => r.id === id));
  }

  /**
   * PUBLIC_INTERFACE
   * Search recipes by query string (searches title, ingredients, and tags)
   */
  searchRecipes(query: string): Observable<Recipe[]> {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      return this.getAllRecipes();
    }

    return this.getAllRecipes().pipe(
      map(recipes => recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      ))
    );
  }
}
