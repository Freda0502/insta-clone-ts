import React, { useState, useEffect, ReactNode } from 'react'
import { Input } from '@material-ui/core'
import ModalComponenet from './modal_component'

type ModalProps = {
  class_name: string
  submit: any
  text: string
  isOpen: boolean
  onClose: () => void
}

const SignUpModalComponenet = ({
  class_name,
  submit,
  text,
  isOpen,
  onClose,
}: ModalProps) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ModalComponenet
      class_name={class_name}
      submit={submit}
      text={text}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type='text'
        placeholder='username'
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      <Input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <Input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
    </ModalComponenet>
  )
}

export default SignUpModalComponenet
