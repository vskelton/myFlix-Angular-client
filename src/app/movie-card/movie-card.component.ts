import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      (response) => {
        this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000});
        console.log('Added to davorites:', movieId);
      },
      (error) => {
        this.snackBar.open('Error adding movie to favorites', 'OK', { duration: 3000 });
        console.error('Error adding to favorites:', error);
      }
    );
  }
}
