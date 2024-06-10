const blogForm = document.querySelector("#blog-form");

const handleBlogSubmit = (event) => {
    event.preventDefault();

    const title = document.querySelector("#new-title").value;
    const content = document.querySelector("#newblog").value;

    fetch("/blog-form", {
        method: "POST",
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.status == 200) {
            // alert("blog created successfully!")
            window.location.href = "/dashboard"
        } else {
        alert("blog failed.")
        }
    })


}

blogForm.addEventListener("submit", handleBlogSubmit)