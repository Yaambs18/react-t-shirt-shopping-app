import './App.css';
import Header from './components/Layouts/Header';
import Tshirts from './components/Tshirts/Tshirts';

function App() {
  return (
    <div className="App">
      <Header className="header" />
      <Tshirts />
    </div>
  );
}

export default App;
