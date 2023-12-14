"use client";
import "../alreadyWatched/alreadyWatched.css";
import React, { useState, createContext, useEffect } from "react";
import SearchIcon from "./SearchIcon";
import SearchInput from "./SearchInput";
import { Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckSquare, faBackward } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const searchContext = createContext<context | undefined>(undefined);
export { searchContext };

type context = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  data: [{
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

  }] | null;
  setData: Dispatch<
    SetStateAction<[{
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
  
    }] | null>
  >;
};
type children = {
  children: ReactNode;
};
type movies = {
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
type x = SetStateAction<[{
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

}] | null>

function Search({ children }: children) {
  const [show, setShow] = useState(true);
  const [data, setData] = useState<[{
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
  }] | null>(null);


  function handlToWatch(id:string) {
    setData((prev:x )=> 
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
  function handlAlreadyWatched(id:string) {
    setData((prev:x) => 
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
  if (data) {
    const filtredData = data.filter(e => e.watched || e.alreadyWatched === true);
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
}, [data]);

  function back() {
  setShow(true)
}

  return (
    <searchContext.Provider value={{ show, setShow, data, setData }}>
      <div className="iconAndInput">
        <SearchIcon />
        <SearchInput />
      </div>
      {show ? (
        children
      ) : (
          <div className="searching">
            <FontAwesomeIcon onClick={back} className="backMovieList" icon={faBackward}/>
          {data !== undefined && data !== null && data[0].Response === "True" ? (
            data.map((e: movies) => {
              if (e.Poster !== "N/A") {
                return (
                  <div className="searchMovie" key={e.id}>
                    <FontAwesomeIcon onClick={()=>handlToWatch(e.id)}  className={e.alreadyWatched?"star yellowStar":"star"} icon={faStar} /> 
                    <FontAwesomeIcon onClick={()=>handlAlreadyWatched(e.id)} className={e.watched?"correct yellowCorrect" : "correct"} icon={faCheckSquare} />
                    <Image
                      className="movie"
                      src={e.Poster}
                      alt="movie img"
                      width={170}
                      height={250}
                    />
                  </div>
                );
              }
            })
          ) : (
            <div className="noResults">No results ...</div>
          )}
        </div>
      )}
    </searchContext.Provider>
  );
}

export default Search;
