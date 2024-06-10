const blogForm = document.querySelector("#blog-form");
const deleteButton = document.querySelector("#delete");

const handleBlogUpdate = (event) => {
  event.preventDefault();

  const blog_id = window.location.href.split("/")[5];

  const title = document.querySelector("#new-title").value;
  const content = document.querySelector("#newblog").value;
  try {
    fetch(`/blog/edit/${blog_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        window.location.href = "/dashboard";
      } else {
        //  alert("blog update failed.");
      }
    });
  } catch (err) {
    console.error(err);
  }
};


const handleBlogDelete = () => {
    const blog_id = window.location.href.split("/")[5];
   
    try {
      fetch(`/blog/delete/${blog_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          window.location.href = "/dashboard";
        } else {
          //  alert("blog update failed.");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };



blogForm.addEventListener("submit", handleBlogUpdate);
deleteButton.addEventListener("click", handleBlogDelete)
