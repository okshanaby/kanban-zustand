import "./App.css";
import Column from "./components/column";

function App() {
  return (
    <div className="App text-white flex justify-center gap-6 items-start p-10">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}

export default App;
