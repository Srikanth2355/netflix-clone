import React, {useState, useEffect} from 'react';
import axios from "./axios";
import requests from './request';
import './Banner.css';
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"


function Banner() {
    const [movie, setmovie]= useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=> {
        async function fetchData(){
            const request = await axios.get(requests.fetchTrending);
            setmovie(
                request.data.results[Math.floor(Math.random()*request.data.results.length-1)]
            )
            return request;
        }
        fetchData()
    },[])
    const opts = {
        height:"390",
        width:"100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        // console.log(movie)
        if (trailerUrl){
            setTrailerUrl("");
        }else {
            // console.log(movie.name)
            movieTrailer(movie?.name || movie?.title || movie?.original_title)
             .then((url) => {
                //  console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
             })
             .catch(error => console.log(error))
        }
    }

    return (
        <header className='banner' 
            style={{
                backgroundSize:'cover',
                backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition:"center center",
            }}
        >
            <div className='banner__contents'>
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}  </h1>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => handleClick(movie)} >Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{movie?.overview}</h1>
            </div>
            <div className="banner--fadebottom"></div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </header>
    )
}

export default Banner
