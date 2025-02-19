document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById('user-list');
        users.forEach(user => {
          const userItem = document.createElement('div');
          userItem.className = 'user-item';
          userItem.textContent = user.name;
          userItem.dataset.userId = user.id;
          userItem.addEventListener('click', () => {
            window.location.href = `user-detail.html?id=${user.id}`;
          });
          userList.appendChild(userItem);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  });  