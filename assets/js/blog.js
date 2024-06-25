document.addEventListener('DOMContentLoaded', function() {
  const blogPostsContainer = document.getElementById('blog-posts-container');

  fetch('http://localhost:8080/blogposts')
    .then(response => response.json())
    .then(posts => {
      // Filtrar los posts con status true
      const filteredPosts = posts.filter(post => post.status === true);
      
      filteredPosts.forEach(post => {
        const postElement = createPostElement(post);
        blogPostsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching blog posts:', error));

  function createPostElement(post) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-4');

    const article = document.createElement('article');

    const postImgDiv = document.createElement('div');
    postImgDiv.classList.add('post-img');
    const img = document.createElement('img');
    img.src = post.imageUrl || 'default-image.jpg';
    img.alt = '';
    img.classList.add('img-fluid');
    postImgDiv.appendChild(img);

    const postCategoryP = document.createElement('p');
    postCategoryP.classList.add('post-category');
    postCategoryP.textContent = 'Category';

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('title');
    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = post.title;
    titleLink.addEventListener('click', function(event) {
      event.preventDefault();
      showPostInModal(post);
    });
    titleH2.appendChild(titleLink);

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('d-flex', 'align-items-center');
    const authorImg = document.createElement('img');
    authorImg.src = 'assets/img/blog/blog-author.jpg';
    authorImg.alt = '';
    authorImg.classList.add('img-fluid', 'post-author-img', 'flex-shrink-0');
    authorDiv.appendChild(authorImg);

    const postMetaDiv = document.createElement('div');
    postMetaDiv.classList.add('post-meta');
    const postAuthorP = document.createElement('p');
    postAuthorP.classList.add('post-author');
    postAuthorP.textContent = post.autor;
    const postDateP = document.createElement('p');
    postDateP.classList.add('post-date');
    const time = document.createElement('time');
    time.dateTime = post.createdAt;
    time.textContent = new Date(post.createdAt).toLocaleDateString();
    postDateP.appendChild(time);
    postMetaDiv.appendChild(postAuthorP);
    postMetaDiv.appendChild(postDateP);

    authorDiv.appendChild(postMetaDiv);

    article.appendChild(postImgDiv);
    article.appendChild(postCategoryP);
    article.appendChild(titleH2);
    article.appendChild(authorDiv);

    colDiv.appendChild(article);

    return colDiv;
  }

  function showPostInModal(post) {
    const modalTitle = document.getElementById('blogPostModalLabel');
    const modalImage = document.getElementById('modalPostImage');
    const modalAuthor = document.getElementById('modalPostAuthor');
    const modalDate = document.getElementById('modalPostDate');
    const modalEmail = document.getElementById('modalPostEmail');
    const modalContent = document.getElementById('modalPostContent');

    modalTitle.textContent = post.title;
    modalImage.src = post.imageUrl || 'default-image.jpg';
    modalAuthor.textContent = post.autor;
    modalDate.textContent = new Date(post.createdAt).toLocaleDateString();
    modalEmail.textContent = post.email;
    modalContent.textContent = post.content;

    const modal = new bootstrap.Modal(document.getElementById('blogPostModal'));
    modal.show();
  }
});
