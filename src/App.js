import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./Components/Navigation/NavigationBar";
import SideNav from "./Components/Navigation/SideNav";
import Main from "./Components/Main/Main";

function App() {
  return (
    <div className="App">
      <div className="navigationbar">
        <NavigationBar />
      </div>
      <div className="sidebar">
        <SideNav />
      </div>
      <div className="maincontainer">
        <Main />
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>AI Tools</p>
      </header> */}
    </div>
  );
}

export default App;
