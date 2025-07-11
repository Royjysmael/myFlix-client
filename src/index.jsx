import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MainView from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
