import React, { useState } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
  const [movie, setMovie] = useState(props.list.find(movie => `${movie.id}` === props.match.params.id) || {});
  console.log(movie);
  const updateMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie, { id: props.match.params.id })
      .then(res => {
        console.log(res);
        props.setMovies(
          props.list.map(movie => {
            return movie.id === res.data.id ? res.data : movie;
          })
        );
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChange = e => {
    console.log(e.target.name, e.target.value);
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={e => updateMovie(e)}>
      <input type='text' name='title' defaultValue={movie.title} onChange={handleChange} placeholder={movie.title} />
      <input
        type='text'
        name='director'
        defaultValue={movie.director}
        onChange={handleChange}
        placeholder={movie.director}
      />
      <input type='submit' value='Update Movie' />
    </form>
  );
};

export default UpdateMovie;
