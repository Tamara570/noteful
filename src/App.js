import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
//import STORE from './dummy-store'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteList from './NoteList/NoteList'
import NotePage from './NotePage/NotePage'
import NotePageNav from './NotePageNav/NotePageNav'
import NoteContext from './NoteContext'
import config from './config'


class App extends React.Component {
  //state = STORE
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
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


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <NoteContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>
            <sidebar>
              {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListNav}
                />
              ))}
              <Route
                exact
                path='/notes/:noteId'
                component={NotePageNav}
              />
            </sidebar>

            <main>
              {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteList}
                />
              ))}
              <Route
                exact
                path='/notes/:noteId'
                component={NotePage}
              />
            </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
