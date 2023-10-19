import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import { useDragOver } from "@minoru/react-dnd-treeview";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "./ModalContext"

export const CustomNode = (props) => {
  const [hover, setHover] = useState(false);
  const { id, text, droppable, data } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const { changeModal } = useModal()

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div>
        <TypeIcon droppable={droppable} fileType={data?.fileType} />
      </div>
      <div className={styles.labelGridItem}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <TextField
              className={`${styles.textField}`}
              value={labelText}
              onChange={handleChangeText}
            />
            <IconButton
              className={styles.editButton}
              onClick={handleSubmit}
              disabled={labelText === ""}
            >
              <CheckIcon className={styles.editIcon} />
            </IconButton>
            <IconButton className={styles.editButton} onClick={handleCancel}>
              <CloseIcon className={styles.editIcon} />
            </IconButton>
          </div>
        ) : (
          <div className={styles.labelGridItem}>
            <Typography variant="body2">{props.node.text}</Typography>
          </div>
        )}
      </div>
      {hover && !visibleInput && (
        <>
          <div className={styles.actionButton}>
            <IconButton size="small" onClick={() => props.onDelete(id)}>
              <Delete fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleShowInput}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => { console.log(123); changeModal() }}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
