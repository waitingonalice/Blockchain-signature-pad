import "./text.css";
import React from "react";

export const Text = ({ type, children, className }) => {
  const textMapping = {
    subhead: "h6",
    body: "p",
    caption: "p",
  };

  const textStyleMapping = {
    subhead: "subhead",
    body: "body",
    caption: "caption",
  };

  return React.createElement(
    textMapping[type],
    { className: `${textStyleMapping[type]} ${className ? className : ""}` },
    children
  );
};
