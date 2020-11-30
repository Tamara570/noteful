import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'



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
  }

  

  state = {
    loading: false
  }

  static contextType = NoteContext;

  

  render() {
    const modified = formatDate(new Date(this.props.modified));
    const { name, id } = this.props;
    // console.log(modified)
    return (
      <li className="Note">
        <Link to={`/notes/${id}`}>{name}</Link>
        <div>
          <p>Last modified: {modified}</p>

          <button
            className='delete'
            type='button'
            onClick={() => this.props.handleClickDelete(id)}
          >
            Delete Note
          </button>
        </div>
      </li>
    );
  }

}

export default Note;