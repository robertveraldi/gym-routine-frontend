import axios from "axios";
import { useEffect, useState } from "react";
import { ExercisesIndex } from "./ExercisesIndex";
import { ExercisesShow } from "./ExercisesShow";
import { Modal } from "./Modal";

export function Home() {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const [exercises, setExercises] = useState([]);

  const [isExercisesShowVisible, setisExercisesShowVisible] = useState(false);

  const [currentExercise, setCurrentExercise] = useState({});

  const handleIndexExercises = () => {
    console.log("handleIndexExercises");
    axios.get("http://localhost:3000/exercises.json").then((response) => {
      console.log(response.data);
      setExercises(response.data);
    });
  };

  useEffect(handleIndexExercises, []);

  const handleShowExercise = (exercise) => {
    console.log("handleShowExercise", exercise);
    setisExercisesShowVisible(true);
    setCurrentExercise(exercise);
  };

  const handleHideExercise = () => {
    console.log("handleHideExercise");
    setisExercisesShowVisible(false);
  };

  return (
    <div className="container">
      <ExercisesIndex exercises={exercises} onSelectExercise={handleShowExercise} />
      <Modal show={isExercisesShowVisible} onClose={handleHideExercise}>
        <ExercisesShow exercise={currentExercise} />
      </Modal>
    </div>
  );
}
