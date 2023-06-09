import { useState } from 'react';
import './App.css';
import Mint from './components/Mint';
import NavBar from './components/NavBar';
import CardCarousel from './components/CardCarousel';
import Common from './components/Common.js'

function App() {
  const [accounts, setAccounts] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  return (
    <div className="App">
      <div className="moving-background">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <Common></Common>
        <CardCarousel currentCardIndex={currentCardIndex} setCurrentCardIndex={setCurrentCardIndex}></CardCarousel>
        <Mint accounts={accounts} currentCardIndex={currentCardIndex}/>
      </div>
    </div>
  );
}

export default App;
