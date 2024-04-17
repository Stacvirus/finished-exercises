import Blogs from './components/Blogs'
import Users from './routes/Users'
import User from './routes/User'

import { allUsers, getUser } from './hooks/loaders'

import { CombineProvider } from './reducers/combineContext'

// routes
import {
  Route,
  NavLink,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

import Blog from './routes/Blog'
import Header from './routes/Navigation'
import Comment from './routes/Comment'

import { styles } from './Styles'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route path="/" element={<Blogs />} />
      <Route path="users" element={<Users />} loader={allUsers} />
      <Route path="users/:id" element={<User />} loader={getUser} />
      <Route path=":id" element={<Blog />}>
        <Route path="" element={<Comment />} />
      </Route>
    </Route>
  )
)

const { Main } = styles

function App() {
  return (
    <Main>
      <CombineProvider>
        <RouterProvider router={router} />
      </CombineProvider>
    </Main>
  )
}

export default App
