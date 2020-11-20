import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import { findNote, findFolder } from '../notes-helpers'

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NoteContext;
    
  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)

    return (
      <div className="Sidebar">
        <Link to='/'>Go Back</Link>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    );
  }

}

export default NotePageNav;