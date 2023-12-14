import React, { useContext } from "react";
import "../mymovielist/myMovieList.css";
import { searchContext } from "../component/Search";
import searchMovie from "@/libs/searchMovie";

function SearchInput() {
  const { setData , setShow } = useContext(searchContext)!; 
  const search = async (formData:FormData)=>{
    let data = await searchMovie(formData.get("movieName") as string)
    setData(data)
    setShow(false)
  }

  return (
    <form action={search}>
       <input
      placeholder="Search for a movie"
      className="searchInput"
        type="text"
        name="movieName"
      />
      <button style={{display:"none"}} type="submit"></button>
   </form>
  );
}

export default SearchInput;
