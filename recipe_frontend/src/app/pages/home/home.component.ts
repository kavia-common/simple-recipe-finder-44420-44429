import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { HeaderComponent } from '../../components/header/header.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

/**
 * PUBLIC_INTERFACE
 * Home page component displaying recipe grid with search functionality
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  /**
   * Load all recipes from the service
   */
  private loadRecipes(): void {
    this.isLoading = true;
    this.error = '';
    
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load recipes. Please try again later.';
        this.isLoading = false;
        console.error('Error loading recipes:', err);
      }
    });
  }

  /**
   * PUBLIC_INTERFACE
   * Handle search query from header component
   */
  onSearch(query: string): void {
    this.isLoading = true;
    
    this.recipeService.searchRecipes(query).subscribe({
      next: (recipes) => {
        this.filteredRecipes = recipes;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Search failed. Please try again.';
        this.isLoading = false;
        console.error('Error searching recipes:', err);
      }
    });
  }
}
