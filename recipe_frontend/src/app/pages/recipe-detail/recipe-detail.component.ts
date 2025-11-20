import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService, Recipe } from '../../services/recipe.service';

/**
 * PUBLIC_INTERFACE
 * Recipe detail page component showing full recipe information
 */
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.loadRecipe(id);
    } else {
      this.error = 'Invalid recipe ID';
      this.isLoading = false;
    }
  }

  /**
   * Load recipe details by ID
   */
  private loadRecipe(id: number): void {
    this.isLoading = true;
    this.error = '';

    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.recipe = recipe;
        } else {
          this.error = 'Recipe not found';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load recipe. Please try again later.';
        this.isLoading = false;
        console.error('Error loading recipe:', err);
      }
    });
  }

  /**
   * PUBLIC_INTERFACE
   * Navigate back to home page
   */
  goBack(): void {
    this.router.navigate(['/']);
  }
}
