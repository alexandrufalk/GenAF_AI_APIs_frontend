import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./Components/Navigation/NavigationBar";

function App() {
  return (
    <div className="App">
      <div className="navigationbar">
        <NavigationBar />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>AI Tools</p>
      </header>
    </div>
  );
}

export default App;
