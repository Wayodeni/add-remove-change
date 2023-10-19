import React, { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { theme } from "./theme";
import styles from "./App.module.css";
import SampleData from "./sample_data.json";
import ModalContextProvider, { useModal } from "./ModalContext"

const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);

  const { changeModal } = useModal()

  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
  };

  const handleSubmit = (newNode) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);

    setOpen(false);
  };

  const handleTextChange = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          text: value
        };
      }

      return node;
    });

    setTreeData(newTree);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <ModalContextProvider>
          <div className={styles.app}>
            <div>
              <Button onClick={changeModal} startIcon={<AddIcon />}>
                Add Node
              </Button>
              <AddDialog
                tree={treeData}
                onSubmit={handleSubmit}
              />
            </div>
            <Tree
              tree={treeData}
              rootId={0}
              render={(node, options) => (
                <CustomNode
                  node={node}
                  {...options}
                  onDelete={handleDelete}
                  onTextChange={handleTextChange}
                />
              )}
              dragPreviewRender={(monitorProps) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDrop={handleDrop}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
            />
          </div>
        </ModalContextProvider>
      </DndProvider>
    </ThemeProvider >
  );
}

export default App;
