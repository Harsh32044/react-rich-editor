import Description from "./components/Description";
import MyEditor from "./components/MyEditor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col justify-start h-dvh">
      <Navbar />
      <div className="m-8">
      <MyEditor />
      </div>
      <Description/>
    </div>
  );
}

export default App;
