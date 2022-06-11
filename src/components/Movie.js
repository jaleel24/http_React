import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <h3>{props.director}</h3>
      <p>{props.openingText}</p>
    </li>

/* <tbody>
                <tr className={classes.movie}>
                   
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Description</th>
                </tr>
               
                    
                        <td>{props.title}</td>
                        <td>{props.releaseDate}</td>
                        <td>{props.openingText}</td>
                       
                   
               
            </tbody> */
  );
};

export default Movie;
