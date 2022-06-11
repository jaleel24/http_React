import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  // ***********************************************************************************

  const [movies, setMovies] = useState([]);
  //! creating the below state to take care of the promise wait buffer
  //! every promise requires a milliseconds wait to get the result/response
  //! to cater that we are creating a new state
  const [isLoading, setIsLoading] = useState(false);
  //! to Handle error we need a third state
  const [error, setError] = useState(null);
  // function fetchMoviesHandler(){
  //   // we are gonna use FetchAPI here which is available in all browser
  //   fetch('https://swapi.dev/api/films').then((response) => {
  //     return response.json();
  //   }).then( (data) => {

  //     const transformedMovies = data.results.map((movie_data) => {
  //       return {
  //         id: movie_data.episode_id,
  //         title: movie_data.title,
  //         openingText: movie_data.opening_crawl,
  //         releaseDate:movie_data.release_date,
  //         director: movie_data.director

  //       }
  //     });
  //     setMovies(transformedMovies);
  //   });
  // }
    
  const fetchMoviesHandler = useCallback(async ()=> {
    setIsLoading(true);
    setError(null)
    //? we are going to use the fetch API since it is available in all web browsers
    //? and can be used to fetch data from the backend api , not only that but also
    //? send the data.
    //! sending an HTTP request is an asyncronious as it does not finish immediately
    //! it takes some time , milliseconds, basically it returns a promise
    //! which yields some data and then we use that data according to our use
    // JSON stands for JavaScript Object Notation
    // JSON is a text format for storing and transporting data
    // JSON is "self-describing" and easy to understand 

    try {
        const response = await fetch("https://reacthttp-e48f0-default-rtdb.firebaseio.com/movies.json")
        if(!response.ok){
          throw new Error('Something Went wrong');
        }
        const data = await response.json();
        const loadedArray = [];
        for (const key in data){
          loadedArray.push({
            id:key,
            title:data[key].title,
            openingText: data[key].openingText,
            releaseDate:data[key].releaseDate

          })
        }
        // const transformedMovies= data.results.map((movie_data)=>{
        //       return {
        //         id:movie_data.episode_id,
        //         title:movie_data.title,
        //         openingText: movie_data.opening_crawl,
        //         director: movie_data.director,
        //         releaseDate:movie_data.release_datet
        //       };
        //     });
            setMovies(loadedArray);
           
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);


  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie){
     const response = await fetch('https://reacthttp-e48f0-default-rtdb.firebaseio.com/movies.json',
      {
        method:'POST',
        body:JSON.stringify(movie),
        header:{
          'Content-Type':'application/json'
        }

      });
      const data = await response.json();
      console.log(data);
    }

  let content = <p>Found no movies</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }
  if(error){
    content= <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>     
         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>   
      <section>  
        {/* the above if block has replace the code below
         { !isLoading && movies.length > 0 && }
        { !isLoading && movies.length === 0 && !error && <p class="font-serif text-purple-900">No movies Found </p>}
        { !isLoading && error && <p>{error}</p>}
        { isLoading && <button disabled type="button" class="text-white bg-purple-900 hover:bg-purple-900 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
   
    Loading...
</button> } */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
