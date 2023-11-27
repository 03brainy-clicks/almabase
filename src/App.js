import React from "react";
import Editor from "./pages";
import Landing from "./pages/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
