import React, { useState, PropsWithChildren } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from '../firebase'
import firebase from 'firebase'
import './ImageUpload.css'

// export default ImageUpload

// interface ImgUpload{
//   username: string
//   imgUrl: string
//   caption: string
//   timestamp: firebase.firestore.FieldValue
// }

type Props = PropsWithChildren<{ username: string }>

function ImgUpload(props: Props) {
  const { username } = props
  const [caption, setCaption] = useState<string>('')
  const [image, setImage] = useState<{ name: string } | null>(null)
  //const [url, setUrl] = useState(" ");
  const [progress, setProgress] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target as any).files[0]) {
      setImage((e.target as any).files[0])
    }
  }

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage
        .ref(`images/${image.name}`)
        .put(new Buffer(image.name))
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        (error) => {
          console.log(error)
          alert(error.message)
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url: string) => {
              db.collection('posts').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imgUrl: url,
                username: username,
              })

              setProgress(0)
              setCaption('')
              setImage(null)
            })
        }
      )
    }
  }
  return (
    <div className='ImageUpload'>
      <progress className='ImageUpload__progress' value={progress} max='100' />
      <input
        type='text'
        placeholder='Enter a Caption'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCaption(event.target.value)
        }
      />
      <input type='file' onChange={handleChange} />
      <Button onClick={handleUpload} variant='contained' color='secondary'>
        Upload
      </Button>
    </div>
  )
}

export default ImgUpload
