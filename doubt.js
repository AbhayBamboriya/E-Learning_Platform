function addDoubt() {
    const doubtInput = document.getElementById('doubtInput');
    const doubtText = doubtInput.value;

    if (doubtText.trim() === '') {
        alert('Please enter your doubt.');
        return;
    }

    const postsContainer = document.getElementById('posts');

    // Create a new post element
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h3>${doubtText}</h3>
        <div class="comment-section">
            <h4>Comments:</h4>
            <div class="comments"></div>
            <div class="comment-input">
                <textarea rows="2" placeholder="Add a comment..."></textarea>
                <button onclick="addComment(this)">Comment</button>
            </div>
        </div>
    `;

    // Append the post to the posts container
    postsContainer.appendChild(postElement);

    // Clear the input
    doubtInput.value = '';
}

function addComment(commentButton) {
    const commentInput = commentButton.previousElementSibling;
    const commentText = commentInput.value;

    if (commentText.trim() === '') {
        alert('Please enter a comment.');
        return;
    }

    const commentsContainer = commentButton.closest('.comment-section').querySelector('.comments');

    // Create a new comment element
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.textContent = commentText;

    // Append the comment to the comments container
    commentsContainer.appendChild(commentElement);

    // Clear the input
    commentInput.value = '';
}