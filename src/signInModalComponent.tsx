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

const SignInModalComponenet = ({
  class_name,
  submit,
  text,
  isOpen,
  onClose,
}: ModalProps) => {
  const [email, setEmail] = useState('')
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

export default SignInModalComponenet
