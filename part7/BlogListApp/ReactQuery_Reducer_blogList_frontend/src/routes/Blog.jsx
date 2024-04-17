import useServer from '../hooks/useServer'
import { Outlet, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { styles } from '../Styles'

const { Btn, BlogS, Lk } = styles

export default function Blog() {
  // const blog = useLoaderData()
  const [response, service] = useServer('/api/blogs/')
  const { id } = useParams()

  function handleLike() {
    likeMutation.mutate({ ...blog, likes: (blog.likes += 1) })
  }

  async function firstFetch() {
    const res = await service.getBlog(id)
    return res
  }

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: service.updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog'], updatedBlog)
    },
  })

  const res = useQuery({
    queryKey: ['blog'],
    queryFn: firstFetch,
    retry: 1,
  })

  if (res.isLoading) {
    return <div>loading...</div>
  }

  const blog = res.data

  return (
    <div>
      <BlogS>{blog.title}</BlogS>
      <Lk href="#">{blog.url}</Lk>

      <p>
        {blog.likes} likes <Btn onClick={handleLike}>like</Btn>
      </p>
      <p>added by {blog.user.username}</p>

      <Outlet />
    </div>
  )
}
