import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  console.log('app');
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  console.log(movies);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovies(movies.filter(movie => movie.id !== res.data));
        window.location = '/';
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path='/' render={props => <MovieList {...props} movies={movies} />} />
      <Route
        path='/movies/:id'
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />;
        }}
      />
      <Route
        path='/update/movie/:id'
        render={props => {
          return <UpdateMovie {...props} list={movies} setMovies={setMovies} />;
        }}
      />
    </>
  );
};

export default App;
