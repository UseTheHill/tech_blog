const newCommentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const content = document.querySelector('#comment-body').value.trim();
  const post_id = document.querySelector('#post-id').innerHTML;

  if (content && post_id) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/post/'+post_id);
    } else {
      alert(response.statusText);
    }
  }
};

document
.querySelector('.comment-form')
.addEventListener('submit', newCommentFormHandler);