"use client";
import "../mymovielist/myMovieList.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchContext } from "./Search";
import { useContext } from "react";

function SearchIcon() {
  const { setShow } = useContext(searchContext)!;
  const handlSearch = () => {
    setShow(false);
  };
  return (
    <FontAwesomeIcon onClick={handlSearch} className="icon" icon={faSearch} />
  );
}

export default SearchIcon;
