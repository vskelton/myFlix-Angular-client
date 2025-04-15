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
  genreMovies: any[] =[];
  directorMovies: any[] = [];
  movieDescription: string = '';
  constructor(public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * This will return a list of movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * 
   * @param genreName 
   * This will return the genre of the movie
   */
  getGenre(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
      this.genreMovies = resp;
      console.log(this.genreMovies);
      return this.genreMovies
    })
  }

/**
 * 
 * @param directorName 
 * This will return the name of the director
 */
  getDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((resp: any) => {
      this.directorMovies = resp;
      console.log(this.directorMovies);
      return this.directorMovies
    })
  }

/**
 * 
 * @param movieId 
 * This will allow users to add a movie to thier favorites list
 */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      (response) => {
        this.snackBar.open('Movie added to favorites', 'OK', { duration: 2000 });
        console.log('Added to davorites:', movieId);
      },
      (error) => {
        this.snackBar.open('Error adding movie to favorites', 'OK', { duration: 3000 });
        console.error('Error adding to favorites:', error);
      }
    );
  }
}
