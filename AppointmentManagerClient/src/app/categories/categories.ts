import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {

  categories: any[] = [];

  newCategory = {
    name: ''
  };

  private apiUrl = 'https://localhost:7191/api/Categories';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  addCategory() {
    if (!this.newCategory.name.trim()) {
      return;
    }

    this.http.post(this.apiUrl, {
      name: this.newCategory.name
    }).subscribe({
      next: () => {
        this.newCategory.name = '';
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error adding category:', error);
      }
    });
  }

  deleteCategory(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      }
    });
  }
}