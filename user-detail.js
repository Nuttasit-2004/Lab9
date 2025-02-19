const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(response => response.json())
  .then(user => {
    const userDetail = document.getElementById('user-detail');
    userDetail.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
    `;

    document.getElementById('view-posts').addEventListener('click', () => {
      window.location.href = `user-posts.html?userId=${user.id}&name=${user.name}`;
    });
  });
