import "./App.css";
import Select, { SingleValue } from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Input from "./Input";

enum TypeEnum {
  CARDIO = "cardio",
  OLYMPIC_WEIGHTLIFTING = "olympic_weightlifting",
  PLYOMETRICS = "plyometrics",
  POWERLIFTING = "powerlifting",
  STRENGTH = "strength",
  STRETCHING = "stretching",
  STRONGMAN = "strongman",
}

enum MuscleEnum {
  ABDOMINALS = "abdominals",
  ABDUCTORS = "abductors",
  ADDUCTORS = "adductors",
  BICEPS = "biceps",
  CALVES = "calves",
  CHEST = "chest",
  FOREARMS = "forearms",
  GLUTES = "glutes",
  HAMSTRINGS = "hamstrings",
  LATS = "lats",
  LOWER_BACK = "lower_back",
  MIDDLE_BACK = "middle_back",
  NECK = "neck",
  QUADRICEPS = "quadriceps",
  TRAPS = "traps",
  TRICEPS = "triceps",
}

enum DifficultyEnum {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert",
}

interface FormInput extends Record<string, string> {
  name: string;
  type: TypeEnum;
  muscle: MuscleEnum;
  difficulty: DifficultyEnum;
}

const getOptions = (obj: Record<string, string>): Option[] =>
  Object.values(obj).map((el) => ({
    value: el,
    label: el.at(0)?.toUpperCase() + el.slice(1).replace("_", " "),
  }));

const typeOptions = getOptions(TypeEnum);
const muscleOptions = getOptions(MuscleEnum);
const difficultyOptions = getOptions(DifficultyEnum);

console.log(typeOptions);

function App() {
  const exercise = {
    name: "Incline Hammer Curls",
    type: "strength",
    muscle: "biceps",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions:
      "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
  };
  const { register, control, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    fetch(
      "https://api.api-ninjas.com/v1/exercises?" + new URLSearchParams(data),
      { headers: { "X-Api-Key": "Ki4FMpaQO+n/s6/U/KEH+A==Q28TbJT63fqzCaii" } }
    )
      .then((res) => res.json())
      .then(console.log);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>Name</div>
        <div>
          Type:
          <Input />
        </div>
        <div>
          Muscle:
          <input className="input" {...register("muscle")} />
        </div>
        <div>
          Difficulty:
          <input className="input" {...register("difficulty")} />
        </div>
        <br />
        <button type="submit" value="submit">
          Submit
        </button>
      </form>
      <div className="exerciseCard">
        <div>Exercise: {exercise.name}</div>
        <div>Type: {exercise.type}</div>
        <div>Muscle: {exercise.muscle}</div>
        <div>Equipment: {exercise.equipment}</div>
        <div>Difficulty: {exercise.difficulty}</div>
        <div>Instruction: {exercise.instructions}</div>
      </div>
    </>
  );
}

export default App;
