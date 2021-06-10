import React, { useState, useEffect, ReactNode } from 'react'
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

type ModalProps = {
  class_name: string
  submit: any
  text: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ModalComponenet = ({
  class_name,
  submit,
  text,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={modalStyle} className={classes.paper}>
        <form className={class_name} onSubmit={submit}>
          <img
            className='app__headerimage'
            alt='abc'
            src='https://i.ibb.co/kmrPzLL/Screen-Shot-2021-05-25-at-10-42-21-AM.png'
          ></img>
          {children}
          <Button type='submit'>{text}</Button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalComponenet
