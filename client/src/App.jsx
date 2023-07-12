import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import { SignaturePad } from "./components/SignaturePad";
import { useRef } from "react";
import { Button } from "./components/Button";

function App() {
  const strokesRef = useRef([]);

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <hr />
          <Demo />
          <hr />
          <SignaturePad strokes={strokesRef} />
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
