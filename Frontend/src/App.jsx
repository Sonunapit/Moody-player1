import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";
import './App.css';
import { useState } from "react";

const App = () => {

  const [Songs, setSong] = useState([
    
  ])
  return (
    <div>
      <FacialExpression setSongs={setSong} />
      <MoodSongs Songs={Songs} />
    </div>
  )
}

export default App
