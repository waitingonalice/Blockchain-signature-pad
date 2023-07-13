import "./signaturePad.css";
import { useEffect, useRef, useState } from "react";
import { Text } from "../Text";
import { Button } from "../Button";
import { initializeCanvas } from "../../utils/formatting";

export const SignaturePad = ({ setSignature }) => {
  const strokesRef = useRef([]);
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

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

  const handleOnSubmit = () => {
    const serializeStrokes = JSON.stringify(strokesRef.current);
    // TODO: Sent to blockchain using web3js and smart contract
    setSignature(serializeStrokes);
    reset();
  };

  return (
    <div>
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
