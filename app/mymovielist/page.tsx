import Image from "next/image";
import Link from "next/link";
import "../mymovielist/myMovieList.css";
import Search from "../component/Search";
import MovieContainer from "../component/MovieContainer";
import getMovie from "@/libs/getMovie";
import Name from "../component/Name";
const movies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Schindler's List",
  "Forrest Gump",
  "The Matrix",
  "The Silence of the Lambs",
  "Inception",
  "Titanic",
  
];
const series = [
  'Breaking Bad',
  'Stranger Things',
  'Game of Thrones',
  'The Mandalorian',
  'The Witcher',
  'Friends',
  'The Crown',
  'Black Mirror',
  'Westworld',
  'The Office',
];

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

async function page() {
  let postersM:MovieOrSeries[] =[]
  let postersS:MovieOrSeries[] =[]
 
    const moviePromisesM = movies.map(async (e) => {
      let r: MovieOrSeries = await getMovie(e);
      return r;
    });
    postersM = await Promise.all(moviePromisesM);
    
  
    const moviePromises = series.map(async (e) => {
      let r: MovieOrSeries = await getMovie(e);
      return r;
    });
  postersS = await Promise.all(moviePromises);
  


  return (
    <main className="cccontainer">
      {/* <Image layout="fill" src="/background2.jpg" alt="backgroundImg" /> */}
      <div className="sssearchContainer">
        <div className="nnnavBar">
          <Name/>
          <Link className="lllinks" href="toWatch">
             To Watch
          </Link>
          <Link className="lllinks" href="alreadyWatched">
            Already Watched
          </Link>
        </div>
        <Search>
          <MovieContainer postersM={postersM} postersS={postersS} />
        </Search>
      </div>
    </main>
  );
}

export default page;
