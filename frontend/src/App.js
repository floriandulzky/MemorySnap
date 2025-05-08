import './App.css';
import {PrimeReactProvider} from "primereact/api";
import {Main} from "./pages/Main";

function App() {
  return (
      <PrimeReactProvider>
        <Main />
      </PrimeReactProvider>
  );
}

export default App;
