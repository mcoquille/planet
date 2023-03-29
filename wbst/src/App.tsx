import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GenerateHeatMap } from "./view/pages";

import './index.css';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenerateHeatMap />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
