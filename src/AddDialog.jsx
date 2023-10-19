import React, { useState } from "react";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import styles from "./AddDialog.module.css";
import { useModal } from "./ModalContext"

export const AddDialog = (props) => {
  const [text, setText] = useState("");
  const [fileType, setFileType] = useState("text");
  const [parent, setParent] = useState(0);
  const [droppable, setDroppable] = useState(false);

  const { changeModal, state } = useModal()

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const { isModalOpened } = state

  const handleChangeParent = (e) => {
    setParent(Number(e.target.value));
  };

  const handleChangeDroppable = (e) => {
    setDroppable(e.target.checked);
  };

  const handleChangeFileType = (e) => {
    setFileType(e.target.value);
  };

  if (!isModalOpened) return null

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Add New Node</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField label="Text" onChange={handleChangeText} value={text} />
        </div>
        <div>
          <FormControl className={styles.select}>
            <InputLabel>Parent</InputLabel>
            <Select label="Parent" onChange={handleChangeParent} value={state.parentID}>
              <MenuItem value={0}>(root)</MenuItem>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={droppable}
                onChange={handleChangeDroppable}
                color="primary"
              />
            }
            label="Droppable"
          />
        </div>
        {!droppable && (
          <div>
            <FormControl className={styles.select}>
              <InputLabel>File type</InputLabel>
              <Select
                label="FileType"
                onChange={handleChangeFileType}
                value={fileType}
              >
                <MenuItem value="text">TEXT</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="image">IMAGE</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={changeModal}>Cancel</Button>
        <Button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable,
              data: {
                fileType
              }
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
