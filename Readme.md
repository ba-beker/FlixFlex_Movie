# Web Application Backend

The backend documentation for the FlixFlex platform built with Node.js. This backend provides a RESTful API to support various features for managing movies and series.

## Features

1. **User Authentication:**
   - Users can create an account with a username and password.

2. **Viewing Movies and Series:**
   - Users can view the list of movies and series on dedicated pages.
   - A dedicated section on the movies and series pages displays the top 5 movies/series.

3. **Pagination:**
   - Movies and series are displayed in batches of 20 on the movies and series pages.

4. **Favorites:**
   - Users can add a movie or a series to their favorites list.
   - Users can delete a movie or a series from their favorites list.
   - Users can view the list of their favorite movies and series.

5. **Search:**
   - Users can search for movies and series.

6. **Details and Trailers:**
   - Users can view the details of a movie or series.
   - Users can watch the trailer of a movie or series.

## API Endpoints

### 1. Authentication

#### 1.1 Create an Account

- **Endpoint:** `/api/signup`
- **Method:** `POST`
- **Parameters:**
  - `username` (string): User's username.
  - `password` (string): User's password.

### 2. Movies and Series

#### 2.1 Get List of Movies and Series

- **Endpoint:** `/api/movies`
- **Endpoint:** `/api/series`
- **Method:** `GET`

#### 2.2 Get Top 5 Movies/Series

- **Endpoint:** `/api/top/movies`
- **Endpoint:** `/api/top/series`
- **Method:** `GET`

#### 2.3 Paginated Movies/Series

- **Endpoint:** `/api/movies/{pageNumber}`
- **Endpoint:** `/api/series/{pageNumber}`
- **Method:** `GET`

#### 2.5 Search Movies/Series

- **Endpoint:** `/api/search`
- **Method:** `GET`
- **Parameters:**
  - `query` (string): Search query.

### 3. Favorites

#### 3.1 Add to Favorites

- **Endpoint:** `/api/wishlist`
- **Method:** `POST`
- **Parameters:**
  - `userId` (string): User's ID.
  - `movieId` (string): Movie or series ID.

#### 3.2 Remove from Favorites

- **Endpoint:** `/api/wishlist/{productId}/{userId}`
- **Method:** `DELETE`
- **Parameters:**
  - `userId` (string): User's ID.
  - `movieId` (string): Movie or series ID.

#### 3.3 View Favorites

- **Endpoint:** `/api/wishlist/{userId}`
- **Method:** `GET`

### 4. Trailers

#### 4.1 Watch Trailer

- **Endpoint:** `/api/trailer/movie/{movieId}`
- **Endpoint:** `/api/trailer/serie/{serieId}`
- **Method:** `GET`

## Conclusion

This documentation provides a comprehensive overview of the backend API, built with Node.js, enabling developers to integrate and utilize the described features in the web application.
