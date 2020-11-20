import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './dummy-store'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteList from './NoteList/NoteList'
import NotePage from './NotePage/NotePage'
import NotePageNav from './NotePageNav/NotePageNav'


class App extends React.Component {
  state = STORE
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>

        <sidebar>
          <Route
            exact
            path='/'
            render={() =>
              <NoteListNav folders={this.state.folders} />
            }
          />
          <Route
            exact
            path='/folders/:folderId' 
            render={(props) =>
              <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
            }
          />
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              const selectedFolderId = this.state.notes.find(
                note => note.id === props.match.params.noteId
              ).folderId
              const selectedFolder = this.state.folders.find(
                folder => folder.id === selectedFolderId
              )

              return (
                <NotePageNav {...selectedFolder} />
              )
            }}
          />
        </sidebar>


        <main>
          <Route
            exact
            path='/'
            render={() =>
              <NoteList notes={this.state.notes} />
            }
          />
          <Route
            exact
            path='/folders/:folderId' 
            render={(props) => {
              return (
            
                <NoteList
                  notes={this.state.notes.filter(
                    note => note.folderId === props.match.params.folderId
                  )}
                />
              )
            }}
          />
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              const selectedNote = this.state.notes.find(
                note => note.id === props.match.params.noteId
              )
              return (
                <NotePage {...selectedNote}/>
                
              )
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
