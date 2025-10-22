import React from "react";
import Hero from "../components/Layout/Hero";
import CarGrid from "../components/Cars/CarGrid";
import Quality from "../components/Cars/Quality";
import Steps from "../components/Cars/Steps";
import Reviews from "../components/Cars/Reviews";
const Home = () => {
  return (
    <div className="bg-black">
      <Hero />
      <Quality />
      <Steps />
    </div>
  );
};

export default Home;
