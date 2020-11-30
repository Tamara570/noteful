import React, { Component } from 'react'
import NoteForm from '../NoteForm/NoteForm'
import NoteContext from '../NoteContext'
import config from '../config'
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NoteContext;

  handleSubmit = (e) => {
    e.preventDefault()
    const folder = {
      folder_name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <div className='New-Folder'>
        <h2>Create a folder</h2>
        <NoteForm onSubmit={this.handleSubmit}>
            <div className='field'>
                <label htmlFor='folder-name'>
                    Name
                </label>
                <input type='text' id='folder-name' name='folder-name' required />
            </div>
            <div className='button'>
                <button type='submit'>
                    Add folder
                </button>
            </div>
        </NoteForm>
      </div>
    )
  }
}

AddFolder.defaultProps = {
  folders: [],
  content: "",
  name: "",
  error: null
}

AddFolder.propTypes = {
  folders: PropTypes.array,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  content: PropTypes.string,
  modified: PropTypes.string,
}