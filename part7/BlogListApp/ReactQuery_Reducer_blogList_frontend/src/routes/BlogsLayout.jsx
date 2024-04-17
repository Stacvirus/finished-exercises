export default function blogLayout() {
  const handleSaveBlogs = (blogObject) => {
    newBlogMutation.mutate(blogObject)

    blogFormRef.current.handleVisibility()
  }

  function showAddBlogs() {
    return <AddBlog Save={handleSaveBlogs} />
  }

  return <div>buto</div>
}
