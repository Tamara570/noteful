import React, { Component } from 'react'
import NoteForm from '../NoteForm/NoteForm'
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'
import config from '../config'

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NoteContext;

  static propTypes = {
    history: PropTypes.any.isRequired
  }
 

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      note_name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders = [] } = this.context
    return (
      <div className='AddNote'>
        <h2>Create a note</h2>
        <NoteForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' required />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' required />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id} required>
                  {folder.folder_name}
                </option>
              )}
            </select>
          </div>
          <div className='button'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NoteForm>
      </div>
    )
  }
}