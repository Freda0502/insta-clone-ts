import React, { useState, useEffect } from 'react'
import './App.css'
import Post from './posts/Post'
import { db, auth } from './firebase'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core'
import ImageUpload from './upload/ImageUpload'
import InstagramEmbed from 'react-instagram-embed'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

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

interface Post {
  id: string
  post: firebase.firestore.DocumentData
}

function App() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser: firebase.User | null) => {
        if (authUser) {
          console.log(authUser)
          setUser(authUser)
          if (authUser.displayName) {
          } else {
            return authUser.updateProfile({
              displayName: username,
            })
          }
        } else {
          setUser(null)
        }
      }
    )
    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      })
  }, [])

  const signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser?.user?.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false)
  }

  const signIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className='app'>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signUp' onSubmit={signUp}>
            {/* <center> */}
            <img
              className='app__headerimage'
              alt='abc'
              src='https://i.ibb.co/kmrPzLL/Screen-Shot-2021-05-25-at-10-42-21-AM.png'
            ></img>
            {/* </center> */}
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
            <Button type='submit'>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signUp' onSubmit={signIn}>
            {/* <center> */}
            <img
              className='app__headerimage'
              alt='abc'
              src='https://i.ibb.co/kmrPzLL/Screen-Shot-2021-05-25-at-10-42-21-AM.png'
            ></img>
            {/* </center> */}
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
            <Button type='submit'>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className='app__header'>
        <img
          className='app__headerimage'
          alt='abc'
          src='https://i.ibb.co/kmrPzLL/Screen-Shot-2021-05-25-at-10-42-21-AM.png'
        ></img>
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
      </div>

      <div className='app__posts'>
        <div className='app__postsLeft'>
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imgUrl={post.imgUrl}
            />
          ))}
        </div>

        <div className='app_postsRight'>
          {/* <InstagramEmbed
            url='https://www.instagram.com/p/CO5d9M5glvy/?utm_source=ig_web_copy_link'
            clientAccessToken='1244303876015113|5d80273fad83c0c31d5d54b3e91a30fe'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
          <h3>this is suppose to be an instagram embed</h3>
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry, you need to login to upload</h3>
      )}
    </div>
  )
}

export default App