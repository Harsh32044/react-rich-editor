import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  SelectionState,
  Modifier,
  convertFromRaw,
  convertToRaw,
  getDefaultKeyBinding,
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

  const styleText = (editorState, style) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlockKey = selection.getStartKey();
    const currentBlock = contentState.getBlockForKey(currentBlockKey);
    const blockText = currentBlock.getText();
    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: 0,
        focusOffset: blockText.length,
      }),
      ""
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "remove-text"
    );
    const newStateWithBold = RichUtils.toggleInlineStyle(newEditorState, style);
    setEditorState(newStateWithBold);
    return "handled";
  };

  const handleKeyCommand = (command, editorState) => {
    if (command === "bold-current-line") {
      return styleText(editorState, "BOLD");
    } else if (command === "red-current-line") {
      return styleText(editorState, "RED");
    } else if (command === "underline-current-line") {
      return styleText(editorState, "UNDERLINE");
    } else if (command === "h1-current-line") {
      return styleText(editorState, "H1");
    } else if (command == "code-current-line") {
      return styleText(editorState, "CODE");
    } else if (command === "split-block") {
      removeAllInlineStyles(editorState, setEditorState);
      return "not-handled";
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const removeAllInlineStyles = (editorState) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const ALL_STYLES = ["RED", "BOLD", "CODE", "H1", "UNDERLINE"];

    ALL_STYLES.forEach((style) => {
      if (currentStyle.has(style)) {
        console.log(`Editor has ${style} style`);
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
      }
    });
  };

  const keyBindingFn = (e) => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selectionState.getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);

    const lineText = block.getText();
    if (e.key === " " && lineText == "*") {
      return "bold-current-line";
    } else if (e.key === " " && lineText == "**") {
      return "red-current-line";
    } else if (e.key === " " && lineText == "***") {
      return "underline-current-line";
    } else if (e.key === " " && lineText == "#") {
      return "h1-current-line";
    } else if (e.key === " " && lineText == "```") {
      return "code-current-line";
    }
    return getDefaultKeyBinding(e);
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      const serializedState = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      localStorage.setItem("editorState", serializedState);
    } catch (error) {
      console.error("Error saving editor state to localStorage:", error);
    }
  };

  return (
    <div className="">
      <button
        className="rounded-md shadow-md shadow-blue-500 px-4 py-2 active:bg-gray-300"
        onClick={handleClick}
      >
        Save
      </button>
      <br />
      <br />
      <div className="shadow-md border-2 shadow-blue-500 p-4">
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          ref={editorRef}
          onChange={setEditorState}
          // handleBeforeInput={handleBeforeInput}
          placeholder="Your Ideas Go Here..."
          spellCheck={true}
        />
      </div>
    </div>
  );
}

export default MyEditor;
