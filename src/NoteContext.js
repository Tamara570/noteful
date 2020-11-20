import React from 'react'

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {},
})

export default NoteContext