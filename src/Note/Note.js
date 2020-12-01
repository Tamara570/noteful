import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import PropTypes from 'prop-types'
import config from '../config'
import  {withRouter } from 'react-router-dom'
import './Note.css'



function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
    history: {
      push: () => { }
    },
  }
  

  static propTypes = {
    handleClickDelete: PropTypes.any, 
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    modified: PropTypes.string
}

  state = {
    loading: false
  }

  static contextType = NoteContext;

  handleClickDelete = (e) => {
    e.preventDefault()
    const noteId = this.props.id
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
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
        this.props.history.goBack()
        return res.json()
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() {
    const modified = formatDate(new Date(this.props.modified));
    const { name, id, } = this.props;
    return (
      <li className="Note">
        <Link to={`/notes/${id}`} className="name">{name}</Link>
        <div>
          <p>Last modified: {modified}</p>

          <button
            className='delete'
            type='button'
            onClick={this.handleClickDelete}
            to="/"
          >
            Delete Note
          </button>
        </div>
      </li>
    );
  }
}

export default withRouter(Note);