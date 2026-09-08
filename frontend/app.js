// Grab the elements from your HTML
const generateButton = document.getElementById("generateButton");
const urlInput = document.getElementById("youtubeUrlInput");
const blogContainerDiv = document.getElementById("blogContainer");

// POST a request to generate the blog
generateButton.addEventListener("click", async () => {
    const youtubeUrl = urlInput.value;

    if (!youtubeUrl) {
        blogContainerDiv.textContent = "Please enter a YouTube URL.";
        return;
    }

    // Show a loading message while the backend processes
    blogContainerDiv.textContent = "Generating blog... This might take a moment.";

    try {
        const response = await fetch("/api/generate-blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: youtubeUrl
            })
        });

        const result = await response.json();

        // Handle FastAPI HTTPExceptions (400 or 500 errors)
        if (!response.ok) {
            blogContainerDiv.textContent = `Error: ${result.detail}`;
            return;
        }

        // Handle success
        if (result.success) {
            blogContainerDiv.innerHTML = ""; // Clear the loading text

            const videoIdHeading = document.createElement("h3");
            videoIdHeading.textContent = `Video ID: ${result.video_id}`;
            
            const blogContentDiv = document.createElement("div");
            // If the LLM returns Markdown or HTML, you might want to render it accordingly. 
            // textContent is used here for safety against script injection.
            blogContentDiv.textContent = result.blog_content;

            blogContainerDiv.appendChild(videoIdHeading);
            blogContainerDiv.appendChild(blogContentDiv);
            
            // Clear the input
            urlInput.value = "";
        }

    } catch (error) {
        // Handle network errors (e.g., server is down)
        blogContainerDiv.textContent = `Network Error: ${error.message}`;
    }
});