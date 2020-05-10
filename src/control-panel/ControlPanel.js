// Core
import React from "react";

// Styles
import "./ControlPanel.css";

export default function ControlPanel({
  onBold,
  onUnderline,
  onItalic,
  onClick,
}) {
  return (
    <div id="control-panel" onClick={onClick}>
      <div id="format-actions">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBold();
          }}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onItalic();
          }}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUnderline();
          }}
        >
          <u>U</u>
        </button>
      </div>
    </div>
  );
}
