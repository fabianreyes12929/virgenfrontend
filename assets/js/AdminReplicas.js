document.addEventListener('DOMContentLoaded', function () {
    const replicaTableBody = document.getElementById('replicaTableBody');
    const createReplicaForm = document.getElementById('createReplicaForm');

    // Cargar réplicas
    async function loadReplicas() {
        try {
            const response = await axios.get('http://localhost:8080/replica/get-all');
            const replicas = response.data.data;

            replicaTableBody.innerHTML = '';
            replicas.forEach(replica => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${replica.code}</td>
                    <td>${replica.repl_name}</td>
                    <td>${replica.received_date}</td>
                    <td>${replica.user_name}</td>
                    <td>${replica.isAvailable ? 'Disponible' : 'No Disponible'}</td>
                `;
                replicaTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error cargando las réplicas:', error);
        }
    }

    // Crear réplica
    createReplicaForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(createReplicaForm);
        const replicaData = {
            code: formData.get('code'),
            repl_name: formData.get('repl_name'),
            received_date: formData.get('received_date'),
            user_id: parseInt(formData.get('user_id')),
            required_restore: formData.get('required_restore') === 'true',
            photo_url: formData.get('photo_url')
        };

        try {
            const response = await axios.post('http://localhost:8080/replica/create', replicaData);
            if (response.data.error) {
                alert(response.data.message);
            } else {
                alert('Réplica creada exitosamente');
                $('#createReplicaModal').modal('hide');
                createReplicaForm.reset();
                loadReplicas();
            }
        } catch (error) {
            console.error('Error creando la réplica:', error);
        }
    });

    // Filtrar réplicas
    document.getElementById('filterUser').addEventListener('input', function () {
        filterReplicas();
    });

    document.getElementById('filterAvailable').addEventListener('change', function () {
        filterReplicas();
    });

    document.getElementById('filterDate').addEventListener('input', function () {
        filterReplicas();
    });

    async function filterReplicas() {
        const user = document.getElementById('filterUser').value.toLowerCase();
        const isAvailable = document.getElementById('filterAvailable').value;
        const date = document.getElementById('filterDate').value;

        try {
            const response = await axios.get('http://localhost:8080/replica/get-all');
            const replicas = response.data.data;

            const filteredReplicas = replicas.filter(replica => {
                const matchesUser = user ? replica.user_name.toLowerCase().includes(user) : true;
                const matchesAvailable = isAvailable ? (isAvailable === 'true' ? replica.isAvailable : !replica.isAvailable) : true;
                const matchesDate = date ? replica.received_date === date : true;

                return matchesUser && matchesAvailable && matchesDate;
            });

            replicaTableBody.innerHTML = '';
            filteredReplicas.forEach(replica => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${replica.code}</td>
                    <td>${replica.repl_name}</td>
                    <td>${replica.received_date}</td>
                    <td>${replica.user_name}</td>
                    <td>${replica.isAvailable ? 'Disponible' : 'No Disponible'}</td>
                `;
                replicaTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error filtrando las réplicas:', error);
        }
    }

    // Cargar réplicas inicialmente
    loadReplicas();
});
