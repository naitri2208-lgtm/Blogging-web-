// ==================================================
// HOME PAGE
// ==================================================

function showMessage() {

    window.location.href = "blogs.html";

}



// ==================================================
// BLOG PAGE - SEARCH & CATEGORY FILTER
// ==================================================

const searchInput = document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const blogContainer =
    document.getElementById("blogContainer");


let selectedCategory = "All";



// ==================================================
// LOAD SAVED BLOGS
// ==================================================

function loadSavedBlogs() {

    if (!blogContainer) {
        return;
    }


    const savedBlogs =
        JSON.parse(localStorage.getItem("myBlogs")) || [];


    savedBlogs.forEach(function (blog) {

        createBlogCard(blog);

    });

}



// ==================================================
// CREATE BLOG CARD
// ==================================================

function createBlogCard(blog) {

    const card = document.createElement("div");

    card.classList.add("blog-card");


    // Create image section

    const imageDiv =
        document.createElement("div");

    imageDiv.classList.add("blog-image");


    // If user added image

    if (blog.image) {

        imageDiv.style.backgroundImage =
            `url("${blog.image}")`;

        imageDiv.style.backgroundSize = "cover";

        imageDiv.style.backgroundPosition = "center";

    }


    // Category

    const category =
        document.createElement("span");

    category.textContent =
        blog.category;


    imageDiv.appendChild(category);



    // Create content section

    const contentDiv =
        document.createElement("div");

    contentDiv.classList.add("blog-content");



    // Title

    const title =
        document.createElement("h3");

    title.textContent =
        blog.title;



    // Description

    const description =
        document.createElement("p");

    description.textContent =
        blog.content.substring(0, 120) + "...";



    // Author

    const author =
        document.createElement("small");

    author.textContent =
        "By " + blog.author;



    // Read More

const readMore =
    document.createElement("a");

readMore.href =
    "blog-details.html?id=" + blog.id;

readMore.textContent =
    "Read More →";



    // Add elements

    contentDiv.appendChild(title);

    contentDiv.appendChild(description);

    contentDiv.appendChild(author);

    contentDiv.appendChild(
        document.createElement("br")
    );

    contentDiv.appendChild(readMore);


    card.appendChild(imageDiv);

    card.appendChild(contentDiv);


    // Add new blog to page

    blogContainer.appendChild(card);

}



// ==================================================
// SEARCH
// ==================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            filterBlogs();

        }
    );

}



// ==================================================
// CATEGORY BUTTONS
// ==================================================

categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {


            // Remove active class

            categoryButtons.forEach(
                function (btn) {

                    btn.classList.remove("active");

                }
            );


            // Add active class

            button.classList.add("active");


            // Get category

            selectedCategory =
                button.textContent.trim();


            filterBlogs();

        }
    );

});



// ==================================================
// FILTER BLOGS
// ==================================================

function filterBlogs() {

    if (!blogContainer) {
        return;
    }


    const searchText =
        searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const cards =
        blogContainer.querySelectorAll(".blog-card");


    cards.forEach(function (card) {


        const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();


        const description =
            card.querySelector("p")
            .textContent
            .toLowerCase();


        const category =
            card.querySelector(
                ".blog-image span"
            )
            .textContent
            .trim();



        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);


        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;



        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}



// ==================================================
// CREATE BLOG FORM
// ==================================================

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            // Get values

            const title =
                document
                .getElementById("blogTitle")
                .value
                .trim();


            const author =
                document
                .getElementById("blogAuthor")
                .value
                .trim();


            const category =
                document
                .getElementById("blogCategory")
                .value;


            const image =
                document
                .getElementById("blogImage")
                .value
                .trim();


            const content =
                document
                .getElementById("blogContent")
                .value
                .trim();



            // Validation

            if (
                !title ||
                !author ||
                !category ||
                !content
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }



            // Blog object

            const newBlog = {

                id: Date.now(),

                title: title,

                author: author,

                category: category,

                image: image,

                content: content

            };



            // Get existing blogs

            let blogs =
                JSON.parse(
                    localStorage.getItem("myBlogs")
                ) || [];



            // Add new blog

            blogs.push(newBlog);



            // Save

            localStorage.setItem(
                "myBlogs",
                JSON.stringify(blogs)
            );



            // Success

            alert(
                "Your blog has been published successfully!"
            );



            // Clear form

            blogForm.reset();



            // Open blogs page

            window.location.href =
                "blogs.html";

        }
    );

}



// ==================================================
// RUN WHEN PAGE LOADS
// ==================================================

loadSavedBlogs();

loadBlogDetails();
// ==================================================
// BLOG DETAILS PAGE
// ==================================================

function loadBlogDetails() {

    const blogDetails =
        document.getElementById("blogDetails");


    // Stop if we are not on details page

    if (!blogDetails) {
        return;
    }


    // Get blog ID from URL

    const urlParams =
        new URLSearchParams(window.location.search);


    const blogId =
        urlParams.get("id");


    // Get saved blogs

    const blogs =
        JSON.parse(
            localStorage.getItem("myBlogs")
        ) || [];


    // Find selected blog

    const blog =
        blogs.find(function (item) {

            return item.id.toString() === blogId;

        });


    // Blog not found

    if (!blog) {

        blogDetails.innerHTML = `

            <div class="no-blog">

                <h2>Blog Not Found</h2>

                <p>
                    Sorry, this blog does not exist.
                </p>

                <br>

                <a href="blogs.html">
                    ← Back to Blogs
                </a>

            </div>

        `;

        return;
    }


    // Create image style

    let imageStyle = "";

    if (blog.image) {

        imageStyle = `
            background-image: url("${blog.image}");
        `;

    }


    // Display blog

    blogDetails.innerHTML = `

        <div
            class="details-image"
            style="${imageStyle}"
        >

            <span>
                ${blog.category}
            </span>

        </div>


        <div class="details-content">

            <h1>
                ${blog.title}
            </h1>


            <p class="blog-author">

                Written by
                <strong>${blog.author}</strong>

            </p>


            <div class="blog-full-content">

                ${blog.content}

            </div>


            <a
                href="blogs.html"
                class="back-button"
            >
                ← Back to Blogs
            </a>

        </div>

    `;

}