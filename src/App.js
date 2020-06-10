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
          {/* Show/hide components in SIDEBAR section based on route */}
          {/* Main Route */}
          <Route
            exact
            path='/'
            render={() =>
              // Pass in the entire folders array from state as a prop
              <NoteListNav folders={this.state.folders} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
            render={(props) =>
              // folders prop will be entire folders array from state
              // selected prop will be the id from the url (:folderId)
              <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
            }
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {

              //find the id of the note that matches the noteId from the url
              const selectedFolderId = this.state.notes.find(
                note => note.id === props.match.params.noteId
              ).folderId

              // find the folder with the id that matches 'selectedFolderId'
              const selectedFolder = this.state.folders.find(
                folder => folder.id === selectedFolderId
              )

              return (
                <NotePageNav {...selectedFolder} />
                // Line 58 is the exact same thing as line 60 without the spread operator (...)
                // <NotePageNav id={selectedFolder.id} name={selectedFolder.name} />
              )
            }}
          />
        </aside>


        <main>
          {/* Show/hide components in 'MAIN' section based on route */}
          {/* Main Route */}
          <Route
            exact
            path='/'
            render={() =>
              // 'notes' prop will be entire notes array from state
              <NoteListMain notes={this.state.notes} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
            render={(props) => {
              return (
                /*
                'notes' prop will be all the notes that have a folderId
                that matches the value passed as :folderId in the url
                */
                <NoteListMain
                  notes={this.state.notes.filter(
                    note => note.folderId === props.match.params.folderId
                  )}
                />
              )
            }}
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              // Find the note that has the same id from the url (:noteId)
              const selectedNote = this.state.notes.find(
                note => note.id === props.match.params.noteId
              )
              return (
                <NotePageMain {...selectedNote}/>
                // Line 104 is the exact same thing as line 102 without the spread operator (...)
                // <NotePageMain id={selectedNote.id} folderId={selectedNote.folderId} content={selectedNote.content} name={selectedNote.name} modified={selectedNote.modified}/>
              )
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
