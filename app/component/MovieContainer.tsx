"use client";
import "../mymovielist/myMovieList.css";
import React, { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { searchContext } from "./Search";
import { useContext } from "react";
import Image from "next/image";
import { faStar, faCheckSquare  } from "@fortawesome/free-solid-svg-icons";
type MovieOrSeries = {
  id: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Plot: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[]; 
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series'; 
  totalSeasons?: string; 
  Response: 'True' | 'False';
  watched: boolean;
  alreadyWatched: boolean;
};

type MovieContainer = {
  postersS: MovieOrSeries[];
  postersM: MovieOrSeries[];
};
type movies = {
  Poster: string;
  watched: boolean;
  alreadyWatched: boolean;
  Response: string
  id:string
};


function MovieContainer({ postersS, postersM }: MovieContainer) {
  const { show, setShow,setData,data } = useContext(searchContext)!;
  const [movigMovies, setMovingM] = useState(0);
  const [movingSeries, setMovingS] = useState(0);
  const [dataS,setDataS] = useState([...postersS,...postersM])
  const [hover, SetHover] = useState("none")
  const[hover2,SetHover2] = useState("none")
 
  
  function handlHover() {
    SetHover("block")
  }
   function handlOut() {
    SetHover("none")
  }
  function handlHover2() {
    SetHover2("block")
  }
   function handlOut2() {
    SetHover2("none")
  }
  function handlLeftMovingM() {
    movigMovies === 400 ? setMovingM(0) : setMovingM(movigMovies + 200);
  }

  function handlRightMovingM() {
    movigMovies === -400 ? setMovingM(0) : setMovingM(movigMovies - 200);
  }

  function handlLeftMovingS() {
    movingSeries === 400 ? setMovingS(0) : setMovingS(movingSeries + 200);
  }

  function handlRightMovingS() {
    movingSeries === -400 ? setMovingS(0) : setMovingS(movingSeries - 200);
  }

  function handlToWatch(id:string) {
    setDataS((prev:SetStateAction<MovieOrSeries[]> )=> 
      prev?.map((e:movies) => {
        if (e.id === id) {
          return {
            ...e,
            alreadyWatched: !e.alreadyWatched
          }
        } else {
          return e
        }
      })
      )
 }
  function handlAlreadyWatched(id: string) {
    setDataS((prev:SetStateAction<MovieOrSeries[]>) => 
      prev?.map((e:movies) => {
        if (e.id === id) {
          return {
            ...e,
            watched: !e.watched
          }
        } else {
          return e
        }
      })
    )
  }
  
  useEffect(() => {
    if (dataS) {
      const filtredData = dataS.filter(e => e.watched || e.alreadyWatched === true);
      const existingData = localStorage.getItem("data");
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        
        filtredData.forEach(newItem => {
          const existingItemIndex = parsedData.findIndex((item:movies) => item.id === newItem.id);
          if (existingItemIndex !== -1) {
            parsedData[existingItemIndex] = newItem;
          } else {
            parsedData.push(newItem);
          }
        });
        localStorage.setItem("data", JSON.stringify(parsedData));
      } else {
        localStorage.setItem("data", JSON.stringify(filtredData) || "[]");
      }
    }
  }, [dataS]);

  return (
    <div className="mmmovieContainerContainer">
      <h1 className="hhheading">Movies :</h1>
      <div className="rrrandomMovingMovies">
        <FontAwesomeIcon
          onClick={handlLeftMovingM}
          className="llleft-flech"
          icon={faChevronLeft}
        />
        <FontAwesomeIcon
          onClick={handlRightMovingM}
          className="rrright-flech"
          icon={faChevronRight}
        />
        <div
          style={{
            transform: `translateX(${movigMovies}px)`,
            transition: "all 1s",
          }}
          className="movieCard"
        >
          {dataS.map((e) => 
            {if(e.Type === "movie") 
          {
            return<div onMouseOver={handlHover} onMouseOut={handlOut} className="mmmovieContainer" key={e.id}>
              <FontAwesomeIcon style={{display:`${hover}`}} onClick={()=>handlToWatch(e.id)}  className={e.alreadyWatched ? "star yellowStar":"star"} icon={faStar} />
              <FontAwesomeIcon style={{display:`${hover}`}} onClick={()=>handlAlreadyWatched(e.id)} className={e.watched ? "correct yellowCorrect" : "correct"} icon={faCheckSquare} />
              <Image
                className="movie"
                src={e.Poster}
                alt="movie img"
                width={170}
                height={250}
              />
            </div>}}
          )}
        </div>
      </div>



      <h1 className="hhheading">Series :</h1>
      <div className="rrrandomMovingMovies">
        <FontAwesomeIcon
          onClick={handlLeftMovingS}
          className="llleft-flech"
          icon={faChevronLeft}
        />
        <FontAwesomeIcon
          onClick={handlRightMovingS}
          className="rrright-flech"
          icon={faChevronRight}
        />
        <div
          style={{
            transform: `translateX(${movingSeries}px)`,
            transition: "all 1s",
          }}
          className="movieCard"
        >
          {dataS.map((e) => 
            {if(e.Type === "series") 
          {
            return<div onMouseOver={handlHover} onMouseOut={handlOut} className="mmmovieContainer" key={e.id}>
              <FontAwesomeIcon style={{display:`${hover}`}} onClick={()=>handlToWatch(e.id)}  className={e.alreadyWatched ? "star yellowStar":"star"} icon={faStar} />
              <FontAwesomeIcon style={{display:`${hover}`}} onClick={()=>handlAlreadyWatched(e.id)} className={e.watched ? "correct yellowCorrect" : "correct"} icon={faCheckSquare} />
              <Image
                className="movie"
                src={e.Poster}
                alt="movie img"
                width={170}
                height={250}
              />
            </div>}}
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieContainer;
