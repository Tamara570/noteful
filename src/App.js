import React from 'react';
import './App.css';
import STORE from './dummy-store'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Switch, Link } from 'react-router-dom';


class App extends React.Component {
  state = STORE
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>

        <aside>
          
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
        </aside>


        <main>
          <Route
            exact
            path='/'
            render={() =>
              <NoteListMain notes={this.state.notes} />
            }
          />
          <Route
            exact
            path='/folders/:folderId' 
            render={(props) => {
              return (
            
                <NoteListMain
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
                <NotePageMain {...selectedNote}/>
                
              )
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
