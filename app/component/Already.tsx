"use client";
import React, { SetStateAction, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faBackward } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

type x = SetStateAction<
  | [
      {
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
        Type: "movie" | "series";
        totalSeasons?: string;
        Response: "True" | "False";
        watched: boolean;
        alreadyWatched: boolean;
      }
    ]
  | null
>;
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
  Type: "movie" | "series";
  totalSeasons?: string;
  Response: "True" | "False";
  watched: boolean;
  alreadyWatched: boolean;
};

function Already() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data") as string)||[]
  );
  const[hover,SetHover] = useState("none")
  function handlDelet(id: string) {
    let newData = data.filter((e:movies) => e.id !== id)
    setData((prev:movies[]) => prev.filter(e => e.id !== id))
    localStorage.setItem("data",JSON.stringify(newData))
  }
  function handlHover() {
    SetHover("block")
  }
   function handlOut() {
    SetHover("none")
  }
  return (
    <><Link href="/mymovielist"><FontAwesomeIcon className="backMovieList" icon={faBackward} /></Link>
      {data.map((e: movies) => {
        if (e.watched === true) {
          return (
            <div onMouseOver={handlHover} onMouseOut={handlOut} className="searchMovie" key={e.id}>
              
              <FontAwesomeIcon style={{ display: `${hover}` }} onClick={() => handlDelet(e.id)} className="delet" icon={faTrash} />

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
      })}
    </>
  );
}

export default Already;
