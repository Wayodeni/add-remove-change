import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import ModalProvider from "./ModalContext";
import { theme } from "./theme";
import TreeShema from "./Tree";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <ModalProvider>
          <TreeShema />
        </ModalProvider>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
