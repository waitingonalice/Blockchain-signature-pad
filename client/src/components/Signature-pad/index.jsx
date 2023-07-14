import "./signaturePad.css";
import { useEffect, useRef, useState } from "react";
import { Text } from "../Text";
import { Button } from "../Button";
import { initializeCanvas } from "../../utils/formatting";
import { useEth } from "../../contexts/EthContext";

export const SignaturePad = ({ setSignature }) => {
  const strokesRef = useRef([]);
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    state: { contract, accounts, address },
  } = useEth();

  const reset = () => {
    strokesRef.current = [];
    const canvasContext = initializeCanvas({
      width: 600,
      height: 300,
      ref: canvasRef,
    });
    canvasContextRef.current = canvasContext;
    setIsDisabled(true);
  };

  useEffect(() => reset(), []);

  /** Resets the canvas */
  const handleOnClear = () => {
    strokesRef.current = [];
    reset();
  };

  const handleStartDrawing = (e) => {
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    const strokes = [...strokesRef.current];
    strokesRef.current = [
      ...strokes,
      { moveToX: e.nativeEvent.offsetX, moveToY: e.nativeEvent.offsetY },
    ];
    canvasContextRef.current.stroke();
    setIsDrawing(true);
    setIsDisabled(false);
  };

  const handleStopDrawing = () => setIsDrawing(false);

  const handleDraw = (e) => {
    if (!isDrawing) return;
    canvasContextRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    canvasContextRef.current.stroke();
    const strokes = [...strokesRef.current];

    strokesRef.current = [
      ...strokes,
      { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
    ];
  };

  const handleOnSubmit = async () => {
    const serializeStrokes = JSON.stringify(strokesRef.current);
    if (!serializeStrokes) return;
    try {
      const transactionData = {};

      setIsDisabled(true);

      await contract.methods
        .set(serializeStrokes)
        .send({ from: accounts[0] })
        .on("receipt", (receipt) => {
          transactionData.storedHash = receipt.blockHash;
          transactionData.transactionHash = receipt.transactionHash;
        });

      const signature = await contract.methods
        .get()
        .call({ from: accounts[0] });

      setSignature({
        ...transactionData,
        strokes: signature,
        contractAddress: address,
      });
      reset();
    } catch (err) {
      console.error(err);
      setIsDisabled(false);
    }
  };

  return (
    <div className="padContainer">
      <div className="header">
        <Text type="subhead">Signature</Text>
        <Button onClick={handleOnClear} type="clear">
          Clear
        </Button>
      </div>
      <canvas
        className="canvasContainer"
        onMouseUp={handleStopDrawing}
        onMouseLeave={handleStopDrawing}
        onMouseDown={handleStartDrawing}
        onMouseMove={handleDraw}
        ref={canvasRef}
      />
      <Button disabled={isDisabled} onClick={handleOnSubmit} type="submit">
        Submit
      </Button>
    </div>
  );
};
