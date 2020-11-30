import React from 'react';
import NoteContext from '../NoteContext'
// import { countNotesForFolder } from '../../src/note-helpers'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './NoteListNav.css'


class NoteListNav extends React.Component {
  static contextType = NoteContext;

  render() {
    const { folders=[], } = this.context
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul className="Sidebar-list">
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav_folder'
                to={`/folders/${folder.id}`}
              >
                <span className='NoteListNav_notes'>
                  {/* {countNotesForFolder(notes, folder.id)} */}
                </span>
                {folder.folder_name}
              </NavLink>
            </li>
          )}
        </ul>
        <Link
          tag={Link}
          to='/add-folder'
          type='button'
        >
          New Folders
        </Link>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;