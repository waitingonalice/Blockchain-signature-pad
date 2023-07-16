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
  const offSetRef = useRef({ x: 0, y: 0 });
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
    strokesRef.current.push({
      moveToX: e.nativeEvent.offsetX,
      moveToY: e.nativeEvent.offsetY,
    });
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

    strokesRef.current.push({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const handleOnTouchStart = (e) => {
    // for touch screen we need to track the first touch point in a signature.
    const touch = e.changedTouches[0];
    offSetRef.current.x = canvasRef.current.getBoundingClientRect().left;
    offSetRef.current.y = canvasRef.current.getBoundingClientRect().top;
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(
      touch.clientX - offSetRef.current.x,
      touch.clientY - offSetRef.current.y
    );
    strokesRef.current.push({
      moveToX: touch.clientX - offSetRef.current.x,
      moveToY: touch.clientY - offSetRef.current.y,
    });
    setIsDrawing(true);
    setIsDisabled(false);
  };

  const handleOnTouchMove = (e) => {
    if (!isDrawing) return;
    const touch = e.changedTouches[0];
    canvasContextRef.current.lineTo(
      touch.clientX - offSetRef.current.x,
      touch.clientY - offSetRef.current.y
    );
    canvasContextRef.current.stroke();
    strokesRef.current.push({
      x: touch.clientX - offSetRef.current.x,
      y: touch.clientY - offSetRef.current.y,
    });
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
        onTouchStart={handleOnTouchStart}
        onTouchEnd={handleStopDrawing}
        onTouchMove={handleOnTouchMove}
        onTouchCancel={handleStopDrawing}
        ref={canvasRef}
      />
      <Button disabled={isDisabled} onClick={handleOnSubmit} type="submit">
        {isDisabled && strokesRef.current.length > 0
          ? "Submitting..."
          : "Submit"}
      </Button>
    </div>
  );
};
