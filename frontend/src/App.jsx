import { useState } from 'react'
import './App.css'

import Navigation from './components/navigation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navigation />
      <h1>Site</h1>
    </div>
  );
}

export default App
