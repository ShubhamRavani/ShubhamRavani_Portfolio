import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { About, Footer, Header, Skills, Work } from "./container";
import { Navbar } from "./components";
import "./App.scss";

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Footer />
    <Analytics />
  </div>
);

export default App;
