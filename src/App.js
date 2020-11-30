import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
//import STORE from './dummy-store'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteList from './NoteList/NoteList'
import NotePage from './NotePage/NotePage'
import NotePageNav from './NotePageNav/NotePageNav'
import NoteContext from './NoteContext'
import AddNote from './AddNote/addNote'
import AddFolder from './AddFolder/addFolder'
import config from './config'


class App extends Component {
  static contextType = NoteContext;
  //state = STORE
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
      console.log('fetching notes and folders')
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
    console.log(this.state.notes)
    console.log(noteId)
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    }

    return (
      <NoteContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>
            <sidebar>
              {['/', '/folders/:folder_Id'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListNav}
                />
              ))}
              <Route
                path='/notes/:note-id'
                component={NotePageNav}
              />
              <Route
                path='/add-folder'
                component={NotePageNav}
              />
              <Route
                path='/add-note'
                component={NotePageNav}
              />
            </sidebar>

            <main>
              {['/', '/folders/:folder_id'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteList}
                />
              ))}
              <Route
                path='/notes/:note-Id'
                component={NotePage}
              />
              <Route
                path='/add-folder'
                component={AddFolder}
              />
              <Route
                path='/add-note'
                component={AddNote}
              />
            </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
