import { EthProvider } from "./contexts/EthContext";
import { SignaturePad } from "./components/Signature-pad";
import { PreviewSignature } from "./components/Preview";
import { useState } from "react";

function App() {
  const [signature, setSignature] = useState(null);
  return (
    <EthProvider>
      <div className="container">
        <div className="content">
          <SignaturePad setSignature={setSignature} />
          <PreviewSignature data={signature} />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
