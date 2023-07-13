export const initializeCanvas = ({ width, height, ref }) => {
  const canvas = ref.current;
  const canvasContext = canvas.getContext("2d");
  // width and height of canvas must match css style and increase scale for higher resolution for higher res displays, else it will be pixelated
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvasContext.scale(2, 2);
  canvasContext.lineCap = "round";
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = "black";
  return canvasContext;
};
