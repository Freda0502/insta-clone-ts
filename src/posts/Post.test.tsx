import { render } from '@testing-library/react'
import Post from './Post'
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { mocked } from 'ts-jest/utils'

// it('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(
//     <Post
//       key='2vRwMFoS08VSLJCYbXmh'
//       postId='2'
//       user='auser'
//       username='aname'
//       caption='jfeiuwahfuw'
//       imgUrl='https://firebasestorage.googleapis.com/v0/b/instagram-react-d8ca5.appspot.com/o/images%2FScreen%20Shot%202021-05-10%20at%208.03.46%20AM.png?alt=media&token=dc43cd7e-e6d9-420d-b025-f6cb8f4473c8'
//     />,
//     div
//   )
// })

// ---------------------------------------------------------------------------------------------------------------

jest.mock('firebase')
const fakePost = [
  {
    key: '2vRwMFoS08VSLJCYbXmh',
    postId: '2',
    user: 'auser',
    username: 'aname',
    caption: 'jfeiuwahfuw',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/instagram-react-d8ca5.appspot.com/o/images%2FScreen%20Shot%202021-05-10%20at%208.03.46%20AM.png?alt=media&token=dc43cd7e-e6d9-420d-b025-f6cb8f4473c8',
  },
]

describe('my function or component', () => {
  test('it should display a post', async () => {
    //  const mockedFirebase = mocked(firebase.get)
    //  mockedFirebase.mockResolvedValue({ data: fakePost });

    const { debug } = render(<Post {...fakePost[0]} />)
    debug()
  })
})

// expect(screen.getByText(fakePost.caption)).toBeInTheDocument();

// const userImage = screen.getByAltText(fakePost.key)
// expect(userImage).toBeInTheDocument()
// expect(userImage).toHaveAttribute('src', fakePost.imgUrl)

//-----------------------------------------------------------------------------------------------------------------------

// test('post component renders', () => {
//   render(
//     <Post
//       key='2vRwMFoS08VSLJCYbXmh'
//       postId='2'
//       user='auser'
//       username='aname'
//       caption='jfeiuwahfuw'
//       imgUrl="https://firebasestorage.googleapis.com/v0/b/instagram-react-d8ca5.appspot.com/o/images%2FScreen%20Shot%202021-05-10%20at%208.03.46%20AM.png?alt=media&token=dc43cd7e-e6d9-420d-b025-f6cb8f4473c8"
//     />
// )

//   })
// })
