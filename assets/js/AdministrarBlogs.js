document.addEventListener('DOMContentLoaded', function () {
    const blogTableBody = document.getElementById('blogTableBody');
    const filterAuthorInput = document.getElementById('filterAuthor');
    const filterTitleInput = document.getElementById('filterTitle');
    const filterStatusSelect = document.getElementById('filterStatus');

    // Cargar blogs inicialmente
    loadBlogs();

    // Agregar listeners para los filtros
    filterAuthorInput.addEventListener('input', applyFilters);
    filterTitleInput.addEventListener('input', applyFilters);
    filterStatusSelect.addEventListener('change', applyFilters);

    async function loadBlogs() {
        try {
            const response = await axios.get('http://localhost:8080/blogposts');
            const blogs = response.data;

            renderBlogs(blogs);
        } catch (error) {
            console.error('Error cargando los blogs:', error);
        }
    }

    function renderBlogs(blogs) {
        blogTableBody.innerHTML = '';

        blogs.forEach(blog => {
            if (passesFilters(blog)) {
                const row = createBlogRow(blog);
                blogTableBody.appendChild(row);
            }
        });
    }

    function passesFilters(blog) {
        const authorFilter = filterAuthorInput.value.toLowerCase();
        const titleFilter = filterTitleInput.value.toLowerCase();
        const statusFilter = filterStatusSelect.value;

        const matchesAuthor = blog.autor.toLowerCase().includes(authorFilter);
        const matchesTitle = blog.title.toLowerCase().includes(titleFilter);
        const matchesStatus = statusFilter === '' || blog.status === (statusFilter === 'true');

        return matchesAuthor && matchesTitle && matchesStatus;
    }

    function createBlogRow(blog) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${blog.id}</td>
            <td>${blog.title}</td>
            <td>${blog.autor}</td>
            <td>${blog.email}</td>
            <td>${blog.status ? 'Activo' : 'Inactivo'}</td>
            <td>
                <button class="btn btn-primary btn-edit" data-blog-id="${blog.id}">Editar Estado</button>
            </td>
        `;

        const editButton = row.querySelector('.btn-edit');
        editButton.addEventListener('click', async () => {
            const newStatus = !blog.status;

            try {
                const response = await axios.put(`http://localhost:8080/blogposts/${blog.id}`, {
                    title: blog.title,
                    content: blog.content,
                    imageUrl: blog.imageUrl,
                    userId: blog.userId,
                    createdAt: blog.createdAt,
                    autor: blog.autor,
                    email: blog.email,
                    status: newStatus
                });

                if (response.data) {
                    alert('Estado del blog actualizado correctamente');
                    loadBlogs();
                } else {
                    alert('Error al actualizar el estado del blog');
                }
            } catch (error) {
                console.error('Error actualizando el estado del blog:', error);
                alert('Error al actualizar el estado del blog. Por favor, intenta nuevamente más tarde.');
            }
        });

        return row;
    }

    function applyFilters() {
        const filteredBlogs = blogs.filter(passesFilters);
        renderBlogs(filteredBlogs);
    }
});
