import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import { SignaturePad } from "./components/Signature-pad";
import { PreviewSignature } from "./components/Preview";
import { useState } from "react";

function App() {
  const [signature, setSignature] = useState(null);
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <hr />
          <Demo />
          <hr />
          <div className="signatureContainer">
            <SignaturePad setSignature={setSignature} />
            <PreviewSignature data={signature} />
          </div>
          <hr />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
