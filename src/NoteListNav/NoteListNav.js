import React from 'react';
import NoteContext from '../NoteContext'
import { countNotesForFolder } from '../notes-helpers'
import { NavLink } from 'react-router-dom'


class NoteListNav extends React.Component {
  static contextType = NoteContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className="Sidebar">
        <h2>Folders</h2>
        <ul className="Sidebar-list">
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav_folder'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav_notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.title}
              </NavLink>
            </li>
          )}
        </ul>
        <button>New Folders</button>
      </div>
    );
  }
}

NoteListNav.defaultProps = {
  folders: []
}

export default NoteListNav;