import React, { useState } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, SelectionState, Modifier } from "draft-js";
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
  })

  const styleMap = {
    'RED': {
      color: 'red',
    },
    'H1': {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '10px 0'
    },
    'CODE': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  const editorRef = useRef(null);

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const blockKey = selection.getStartKey()
    const currentBlock = content.getBlockForKey(blockKey);
    const currentText = currentBlock.getText()

    let updatedState;

    if (chars === " " && currentText.split(" ")[0] == "*") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 1,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(content, newSelection, 'backspace')
      const newEditorState = EditorState.push(editorState, newContent, 'remove-range');
      updatedState = RichUtils.toggleInlineStyle(newEditorState, "BOLD");
    }
    else if (chars === " " && currentText.split(" ")[0] == "**") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 2,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(content, newSelection, 'backspace')
      const newEditorState = EditorState.push(editorState, newContent, 'remove-range');
      updatedState = RichUtils.toggleInlineStyle(newEditorState, "RED");
    }
    else if (chars === " " && currentText.split(" ")[0] == "***") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 3,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(content, newSelection, 'backspace')
      const newEditorState = EditorState.push(editorState, newContent, 'remove-range');
      updatedState = RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE");
    }
    else if (chars === " " && currentText.split(" ")[0] == "#") {
      const newSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length - 1,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });

      const newContent = Modifier.removeRange(content, newSelection, 'backspace')
      const newEditorState = EditorState.push(editorState, newContent, 'remove-range');
      updatedState = RichUtils.toggleInlineStyle(newEditorState, "H1");
    }

    if (updatedState) {
      const updatedSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: currentText.length,
        focusKey: blockKey,
        focusOffset: currentText.length,
      });
      updatedState = EditorState.forceSelection(updatedState, updatedSelection);
      setEditorState(updatedState);
      return "handled";
   }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  return (
    <div className="relative">
      <button className="border-2 rounded-md border-gray-300 absolute right-0 px-6 active:bg-gray-500 active:text-gray-200">
        Save
      </button>
      <br />
      <br />
      <div className="border-gray-300 border-2 p-4">
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          ref={editorRef}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
        />
      </div>
    </div>
  );
}

export default MyEditor;
