import { createContext, useContext, useReducer } from "react";

export const ModalContext = createContext(initState);
export const DispatchContext = createContext(() => { });

const initState = {
    isModalOpen: false,
    parentID: 0,
};

const ACTIONS = {
    changeModalOpened: "CHANGE_MODAL_OPENED",
    setParentID: "SET_PARENT_ID",
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.changeModalOpened:
            return { ...state, isModalOpen: !state.isModalOpen };
        case ACTIONS.setParentID:
            return { ...state, parentID: action.id };
        default:
            throw Error("Unknown action: " + action);
    }
};

export const useModal = () => {
    const state = useContext(ModalContext);
    const dispatch = useContext(DispatchContext);

    return {
        changeModalOpened: () => dispatch({ type: ACTIONS.changeModalOpened }),
        setParentID: (id) => dispatch({ type: ACTIONS.setParentID, id }),
        state: state,
    };
};

const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, initState);

    return (
        <DispatchContext.Provider value={dispatch}>
            <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
        </DispatchContext.Provider>
    );
};

export default ModalProvider;
