import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  SelectionState,
  Modifier,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef } from "react";

function MyEditor() {
  const [editorState, setEditorState] = useState(() => {
    const savedState = localStorage.getItem("editorState");
    if (savedState) {
      const contentState = convertFromRaw(JSON.parse(savedState));
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const styleMap = {
    RED: {
      color: "red",
    },
    H1: {
      fontSize: "32px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    CODE: {
      backgroundColor: "#B5C0D0",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: "16px",
      padding: "10px",
      borderRadius: "7px",
    },
  };

  const editorRef = useRef(null);

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const currentBlock = content.getBlockForKey(blockKey);
    const currentText = currentBlock.getText();

    if (chars === " " && currentText.split(" ")[0] == "*") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 1,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(
        content,
        newSelection,
        "backspace"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
      return "handled";
    } else if (chars === " " && currentText.split(" ")[0] == "**") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 2,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(
        content,
        newSelection,
        "backspace"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "RED"));
      return "handled";
    } else if (chars === " " && currentText.split(" ")[0] == "***") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 3,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(
        content,
        newSelection,
        "backspace"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE"));
      return "handled";
    } else if (chars === " " && currentText.split(" ")[0] == "#") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 1,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(
        content,
        newSelection,
        "backspace"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "H1"));
      return "handled";
    } else if (chars === " " && currentText.split(" ")[0] == "```") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 3,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(
        content,
        newSelection,
        "backspace"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "CODE"));
      return "handled";
    }
    return "not-handled";
  };

  const handleKeyCommand = (command, editorState) => {
    if (command === "split-block") {
      return "not-handled";
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleClick = (e) => {
    e.preventDefault()
    try {
      const serializedState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      localStorage.setItem('editorState', serializedState);
    } catch (error) {
      console.error('Error saving editor state to localStorage:', error);
    }
  }

  return (
    <div className="">
      <button className="rounded-md shadow-md shadow-blue-500 px-4 py-2 active:bg-gray-300"
        onClick={handleClick}>
        Save
      </button>
      <br />
      <br />
      <div className="shadow-md border-2 shadow-blue-500 p-4">
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          placeholder="Your Ideas Go Here..."
          spellCheck={true}
        />
      </div>
    </div>
  );
}

export default MyEditor;
