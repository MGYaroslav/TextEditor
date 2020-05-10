// Core
import React from "react";

// Styles
import "./FileZone.css";

export default function FileZone({
  children,
  onClick,
  onPaste,
  updateContent,
}) {
  return (
    <div id="file-zone" onClick={onClick}>
      <div
        id="file"
        className="content-box"
        role="textbox"
        aria-multiline="true"
        contentEditable="true"
        suppressContentEditableWarning="true"
        onClick={onClick}
        onPaste={() => {
          navigator.clipboard.readText().then(() => onPaste());
        }}
      >
        {children}
      </div>
    </div>
  );
}
