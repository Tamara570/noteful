import React from 'react'

const NoteContext = React.createContext({
    addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {},
})

export default NoteContext