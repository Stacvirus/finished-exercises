import { useState } from 'react'
import { styles } from '../Styles'

const { Form, FormBtn, Input } = styles

function AddBlog({ Save }) {
  const [blogInfos, setBlogInfos] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })

  function saveblog(e) {
    e.preventDefault()
    Save(blogInfos)
    setBlogInfos({
      title: '',
      author: '',
      url: '',
      likes: '',
    })
  }

  return (
    <div className="formDiv">
      <h2>Add blogs</h2>
      <Form onSubmit={saveblog}>
        <Input
          placeholder="title"
          id="text"
          type="text"
          name="title"
          value={blogInfos.title}
          data-testid="title"
          onChange={({ target }) =>
            setBlogInfos({ ...blogInfos, title: target.value })
          }
        />{' '}
        <Input
          placeholder="author"
          id="text"
          type="text"
          name="author"
          value={blogInfos.author}
          data-testid="author"
          onChange={({ target }) =>
            setBlogInfos({ ...blogInfos, author: target.value })
          }
        />
        <Input
          placeholder="url"
          id="text"
          type="text"
          name="url"
          value={blogInfos.url}
          data-testid="url"
          onChange={({ target }) =>
            setBlogInfos({ ...blogInfos, url: target.value })
          }
        />
        <Input
          id="number"
          type="number"
          name="likes"
          value={blogInfos.likes}
          placeholder="number of likes"
          data-testid="likes"
          onChange={({ target }) =>
            setBlogInfos({ ...blogInfos, likes: target.value })
          }
        />
        <FormBtn type="submit">Save</FormBtn>
      </Form>
    </div>
  )
}

export default AddBlog
