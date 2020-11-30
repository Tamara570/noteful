import React from 'react'

export default function NoteForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteform', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}