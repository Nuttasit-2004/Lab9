const postParams = new URLSearchParams(window.location.search);
const postUserId = postParams.get('userId');
const userName = postParams.get('name');

document.getElementById('user-name').textContent = userName;

fetch(`https://jsonplaceholder.typicode.com/users/${postUserId}/posts`)
  .then(response => response.json())
  .then(posts => {
    const postsList = document.getElementById('posts-list');
    posts.forEach(post => {
      const postItem = document.createElement('div');
      postItem.className = 'post-item';
      postItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="toggle-comments-btn" data-post-id="${post.id}">ดูความคิดเห็น</button>
        <div id="comments-${post.id}" class="comments" style="display: none;"></div>
      `;
      postsList.appendChild(postItem);
    });

    document.querySelectorAll('.toggle-comments-btn').forEach(button => {
      button.addEventListener('click', () => toggleComments(button));
    });
  });

function toggleComments(button) {
  const postId = button.dataset.postId;
  const commentsDiv = document.getElementById(`comments-${postId}`);

  if (commentsDiv.style.display === 'none') {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(comments => {
        commentsDiv.innerHTML = comments.map(comment => `
          <p><strong>${comment.name}</strong>: ${comment.body}</p>
        `).join('');
        commentsDiv.style.display = 'block';
        button.textContent = 'ซ่อนความคิดเห็น';
      });
  } else {
    commentsDiv.style.display = 'none';
    button.textContent = 'ดูความคิดเห็น';
  }
}
