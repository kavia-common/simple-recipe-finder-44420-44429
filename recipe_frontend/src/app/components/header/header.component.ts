import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * Header component with app branding and search functionality
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchQuery = new EventEmitter<string>();
  searchTerm: string = '';

  /**
   * PUBLIC_INTERFACE
   * Emit search query when user types in search box
   */
  onSearchChange(): void {
    this.searchQuery.emit(this.searchTerm);
  }

  /**
   * PUBLIC_INTERFACE
   * Clear search and emit empty query
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.searchQuery.emit('');
  }
}
