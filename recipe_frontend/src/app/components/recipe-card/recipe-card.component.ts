import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../services/recipe.service';

/**
 * PUBLIC_INTERFACE
 * RecipeCard component displays a recipe summary with image, title, and tags
 * Used in the recipe grid on the home page
 */
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
