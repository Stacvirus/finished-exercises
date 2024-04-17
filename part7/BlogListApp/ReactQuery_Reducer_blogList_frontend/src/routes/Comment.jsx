import { useParams } from 'react-router-dom'
import useComment from '../hooks/useComment'

import { styles } from '../Styles'
const { List, Form, FormBtn, Input, Cmt } = styles

export default function Comment() {
  const [comments, cmtServices] = useComment({
    url: '/api/blogs/comments/',
    id: useParams().id,
  })

  async function handleCommentForm(e) {
    e.preventDefault()
    const content = e.target.comment.value
    e.target.comment.value = ''
    await cmtServices.postComment({ content })
  }
  return (
    <div>
      <h2>Comments</h2>

      <Form onSubmit={handleCommentForm}>
        <Input type="text" name="comment" required placeholder="comment" />
        <FormBtn type="submit">submit</FormBtn>
      </Form>

      <List>
        {comments.length > 0 ? (
          comments.map((c) => <Cmt key={c.id}>{c.content}</Cmt>)
        ) : (
          <p>No comments for this blog</p>
        )}
      </List>
    </div>
  )
}
