const updatePostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-body").value.trim();
  const id = document.querySelector("#post-id").innerHTML;

  if (title && content && id) {
    // Send a PUT request to the API endpoint
    const response = await fetch("/api/posts/" + id, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dash");
    } else {
      alert(response.statusText);
    }
  }
};

const deletePostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const id = document.querySelector("#post-id").innerHTML;

  if (id) {
    // Send a PUT request to the API endpoint
    const response = await fetch("/api/posts/" + id, {
      method: "DELETE",
    });

    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dash");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".up-post-form")
  .addEventListener("submit", updatePostFormHandler);

document
  .querySelector(".del-post-form")
  .addEventListener("submit", deletePostFormHandler);
