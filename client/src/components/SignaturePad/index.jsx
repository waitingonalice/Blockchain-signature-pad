import "./signaturePad.css";
import { useEffect, useRef, useState } from "react";

export const SignaturePad = ({ strokes: strokesRef }) => {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // set up canvas
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    // width and height of canvas must match css style and increase scale for higher resolution for higher res displays, else it will be pixelated
    canvas.width = 600 * 2;
    canvas.height = 300 * 2;
    canvasContext.scale(2, 2);
    canvasContext.lineCap = "round";
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = "black";
    canvasContextRef.current = canvasContext;
  }, []);

  const startDrawing = (e) => {
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    canvasContextRef.current.stroke();
    setIsDrawing(true);
  };

  const stopDrawing = (e) => {
    canvasContextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    canvasContextRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    canvasContextRef.current.stroke();
    // store strokes to be sent to backend
    const strokes = [...strokesRef.current];
    strokesRef.current = [
      ...strokes,
      { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
    ];
  };
  return (
    <canvas
      className="canvasContainer"
      onMouseUp={stopDrawing}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};
