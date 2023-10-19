import { createContext, useReducer } from "react"

const ModalContext = createContext()

const reducer = (state, action) => {
    switch (action) {
        case "changeModal":
            return {
                ...state,
                isModalOpened: !state.isModalOpened,
            }
        case "changeParentID":
            return (parentID) => ({
                ...state,
                parentID,
            })
        default:
            throw new Error(`action type ${action} not supported`)
    }
}

const ModalContextProvider = ({ children }) => {
    const { state } = useModal()



    console.log("modal context provider state: ", state)
    return <ModalContext.Provider value={{ ...state }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
    const [state, dispatch] = useReducer(reducer, {
        isModalOpened: false,
        parentID: 0,
    });
    return {
        changeModal: () => dispatch("changeModal"),
        changeParentID: (id) => dispatch("changeParentID")(id),
        state: state,
    }
}

export default ModalContextProvider