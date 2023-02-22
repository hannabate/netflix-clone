import React from "react";
import { useState, useEffect } from "react";

import "./Row.css";
import axios from "./axios";

import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, largeRow }) {
  const [movies, setmovies] = useState([]);
  
  const [traileUrl, setTraileUrl] = useState("");
  

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
       //console.log(request)
      setmovies(request.data.results);
       //console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies)
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (traileUrl) {
      setTraileUrl ("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTraileUrl(urlParams.get("v"))
        })
        .catch((error) => console.log(error));
    }
  }

   console.log(movies)

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={()=> handleClick(movie)}
            className={`row__poster ${largeRow && "row__posterLarge"}`}
            src={`${base_url}${ largeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {traileUrl && <YouTube videoId= {traileUrl} opts={opts}/>}
      </div>
    </div>
  );
}

export default Row;
