import {nanoid} from "nanoid"
type movie = {
  Poster: string;
  Response: string;
};
export default async function searchMovie(search: string) {
  let respons = await fetch(
    `http://www.omdbapi.com/?apikey=7e04df9e&s=${search}`
  );
  if (!respons.ok) {
    throw Error("Problem ....");
  } else {
    let result = await respons.json();
       if (result.Search !== undefined) {
        return result.Search.map((e: movie) => {
            return {
              id:nanoid(),
              Poster: e.Poster,
              watched: false,
              alreadyWatched: false,
              Response: result.Response,
              Type:"search"
            };
          });
       } else {
           return null
        }
    }
}
