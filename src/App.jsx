import MyEditor from "./components/MyEditor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col justify-start h-dvh">
      <Navbar />
      <div className="m-8">
      <MyEditor />
      </div>
    </div>
  );
}

export default App;
