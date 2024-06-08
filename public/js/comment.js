const commentForm = document.querySelector("#comment-form");

const handleCommentSubmit = (event) => {
    event.preventDefault();

    const blog_id = document.querySelector("#blog_id").value;
    const comment = document.querySelector("#comment").value;

    console.log(blog_id)
    console.log(comment)

    fetch("/comment", {
        method: "POST",
        body: JSON.stringify({
            blog_id,
            comment
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.status == 200) {
            // alert("Comment created successfully!")
            window.location.reload();
        } else {
        alert("Comment failed.")
        }
    })


}


commentForm.addEventListener("submit", handleCommentSubmit)