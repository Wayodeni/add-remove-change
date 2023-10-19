import { createContext, useReducer } from "react"

const ModalContext = createContext({
    isModalOpen: false,
    parentID: null,
    setIsModalOpen: () => { },
    setParentID: () => { },
})

export default ModalContext