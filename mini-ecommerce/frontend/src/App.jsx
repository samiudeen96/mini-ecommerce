import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <div>
        <Header />
        <div className="container p-8">
            <Home />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
