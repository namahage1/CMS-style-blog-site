const blogForm = document.querySelector("#blog-form");

const handleBlogUpdate = (event) => {
    event.preventDefault();

    const title = document.querySelector("#new-title").value;
    const content = document.querySelector("#newblog").value;
try{
    fetch("/edit-blog-form", {
        method: "PUT",
        body: JSON.stringify({
            title:title,
            content:content,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(res.status == 200) {
            window.location.href = "/dashboard"
        } else {
      //  alert("blog update failed.");
        }
    })
}catch(err){
    console.error(err);
}

}
blogForm.addEventListener("submit", handleBlogUpdate)