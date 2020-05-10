// Core
import React, { useState, useEffect } from "react";
import cn from "classnames";

// Styles
import "./App.css";

// Components
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import Synonyms from "./synonyms/Synonyms";

// Data
import getMockText from "./text.service";
import { getSynonyms } from "./synonyms.service";

export default function App() {
  const [pageText, setPageText] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [store, setStore] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [, setBold] = useState(false);
  const [, setUnderline] = useState(false);
  const [, setItalic] = useState(false);

  const [synonyms, setSynonyms] = useState([]);

  const getText = () => {
    getMockText().then(function (result) {
      setPageText(result);
    });
  };

  useEffect(() => {
    getText();
  }, []);

  const getSelectedWord = () => {
    if (window.getSelection) {
      setSelectedWord(window.getSelection().toString());
    }
  };

  const onBold = (key) => {
    const currentValue = store[key] || store;
    currentValue.bold = !currentValue.bold;
    setStore({ ...store, [key]: currentValue });
  };

  const onItalic = (key) => {
    const currentValue = store[key] || store;
    currentValue.italic = !currentValue.italic;
    setStore({ ...store, [key]: currentValue });
  };

  const onUnderline = (key) => {
    const currentValue = store[key] || store;
    currentValue.underline = !currentValue.underline;
    setStore({ ...store, [key]: currentValue });
  };

  const removeActiveControls = () => {
    setBold(false);
    setItalic(false);
    setUnderline(false);
    setSelectedWord("");
  };

  const getOptions = (wordToFind) => {
    setSynonyms([]);
    getSynonyms(
      wordToFind.includes(".")
        ? `${wordToFind.slice(0, -1)}`
        : wordToFind.includes(",")
        ? `${wordToFind.slice(0, -1)}`
        : wordToFind.includes("’")
        ? `${wordToFind.replace(/[’]/, "'")}`
        : `${wordToFind}`
    ).then((res) => setSynonyms(res));
  };

  const replaceWord = (wordToReplace) => {
    setPageText((prevWords) => {
      const newContent = prevWords.split(" ");
      newContent[selectedWord.split("-")[1]] = wordToReplace;
      setSynonyms([]);
      removeActiveControls();
      return newContent.join(" ");
    });
  };

  return (
    <div className="App">
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel
          onBold={() => onBold(selectedWord)}
          onItalic={() => onItalic(selectedWord)}
          onUnderline={() => onUnderline(selectedWord)}
          onClick={removeActiveControls}
        />
        <FileZone
          pageText={pageText}
          setSelection={getSelectedWord}
          onClick={removeActiveControls}
        >
          {pageText.split(" ").map((word, i) => {
            const wordState = store[`${word}-${i}`] || {};
            const classes = cn({
              bold: !!wordState.bold,
              italic: !!wordState.italic,
              underline: !!wordState.underline,
            });
            return (
              <span
                key={`${word}-${i}`}
                onDoubleClick={() => {
                  setSelectedWord(`${word}-${i}`);
                  getOptions(word);
                }}
                className={classes}
              >
                {word}{" "}
              </span>
            );
          })}
        </FileZone>
        <Synonyms synonyms={synonyms} onClick={replaceWord} />
      </main>
    </div>
  );
}
