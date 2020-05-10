import React from "react";
import "./Synonyms.css";

export default function Synonyms({ synonyms, onClick }) {
  if (synonyms.length) {
    return (
      <div className="synonyms-container">
        <div className="synonyms">
          <div className="synonyms-title">List of available synonyms</div>
          <ul>
            {synonyms.map((word) => (
              <li key={word} onClick={() => onClick(word)}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
}
