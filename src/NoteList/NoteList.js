import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../note-helpers'
import Note from '../Note/Note';
import PropTypes from 'prop-types'
import config from '../config'
import './NoteList.css'


class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static propTypes = {
    match: {
      params:
        { folder_id : PropTypes.string }
    } 
  }


  static contextType = NoteContext;


  handleClickDelete = (id) => {
   
    const noteId = id
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok){
          return res.json().then(e => Promise.reject(e))
        }
        this.context.deleteNote(id)
        return res.json()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const folderId = this.props.match.params.folder_id
   // alert(folderId)
  
    const { notes=[] } = this.context
    console.log(notes)
    const notesForFolder = getNotesForFolder(notes, folderId)
    console.log(notesForFolder)
        return (
        <section className='NoteListMain'>
          <ul>
            {console.log('NOTES1 ', notesForFolder)}
            {notesForFolder.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.note_name}
                  modified={note.date_created}
                  handleClickDelete={this.handleClickDelete}
                />
              </li>
            )}
          </ul>
          <Link
            tag={Link}
            to='/add-note'
            type='button'
          >
            New Note
          </Link>
        </section>
    );
  }
}

// NoteListMain.defaultProps = {
//   notes: []
// }

export default NoteListMain;