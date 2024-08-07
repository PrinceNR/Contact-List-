import React from "react";
import Header from "./Components/Header";
import Contacts from "./Components/contacts";
import Pagination from "./Components/pagination.jsx";
import "./Home.css";

function Home() {
  return (
    <div className="container main-divider">
      <div className="">
        <Header />

        <Contacts />

        <Pagination />
      </div>
    </div>
  );
}

export default Home;
