import { Text } from "../Text";
import { LabelValue } from "./Label-value";
import { useRef, useEffect } from "react";
import { initializeCanvas } from "../../utils/formatting";
import "./previewSignature.css";

const EmptyCanvas = () => (
  <div className="emptyCanvasContainer">
    <Text className="emptyText" type="body">
      No preview yet
    </Text>
  </div>
);

export const PreviewSignature = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    const canvasContext = initializeCanvas({
      width: 600,
      height: 300,
      ref: canvasRef,
    });
    const strokes = JSON.parse(data);
    strokes.forEach((stroke) => {
      if (stroke.moveToX && stroke.moveToY) {
        canvasContext.moveTo(stroke.moveToX, stroke.moveToY);
      }
      canvasContext.lineTo(stroke.x, stroke.y);
      canvasContext.stroke();
    });
  }, [data]);

  return (
    <div id="previewSignature">
      <Text type="subhead">Preview</Text>
      {!data ? (
        <EmptyCanvas />
      ) : (
        <canvas className="previewCanvas" ref={canvasRef} />
      )}

      <LabelValue label="Contract Address" value="123" />
      <LabelValue label="Stored Hash" value="123" />
      <LabelValue label="Transaction Hash" value="123" />
    </div>
  );
};
