document.addEventListener('DOMContentLoaded', function () {
    const peregrinacionTableBody = document.getElementById('peregrinacionTableBody');

    // Cargar peregrinaciones inicialmente
    loadPeregrinaciones();

    // Filtrar peregrinaciones
    document.getElementById('filterReceiverUserName').addEventListener('input', function () {
        filterPeregrinaciones();
    });

    document.getElementById('filterState').addEventListener('input', function () {
        filterPeregrinaciones();
    });

    document.getElementById('filterReplicaOwnerName').addEventListener('input', function () {
        filterPeregrinaciones();
    });

    document.getElementById('filterReplicaName').addEventListener('input', function () {
        filterPeregrinaciones();
    });

    document.getElementById('filterCity').addEventListener('input', function () {
        filterPeregrinaciones();
    });

    async function loadPeregrinaciones() {
        try {
            const response = await axios.get('http://localhost:8080/pilgrimage/get-all');
            const peregrinaciones = response.data.data;

            renderPeregrinaciones(peregrinaciones);
        } catch (error) {
            console.error('Error cargando las peregrinaciones:', error);
        }
    }

    function renderPeregrinaciones(peregrinaciones) {
        peregrinacionTableBody.innerHTML = '';

        peregrinaciones.forEach(peregrinacion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${peregrinacion.id}</td>
                <td>${peregrinacion.state}</td>
                <td>${peregrinacion.city}</td>
                <td>${peregrinacion.receiver_user_name}</td>
                <td>${peregrinacion.receiver_user_email}</td>
                <td>${peregrinacion.receiver_user_telephone}</td>
                <td>${peregrinacion.replica_owner_name_id}</td>
                <td>${peregrinacion.replica_owner_user_email}</td>
                <td>${peregrinacion.replica_owner_user_telephone}</td>
                <td>${peregrinacion.replica_name}</td>
                <td>${peregrinacion.replica_code}</td>

            `;
            peregrinacionTableBody.appendChild(row);
        });
    }

    async function filterPeregrinaciones() {
        const filterReceiverUserName = document.getElementById('filterReceiverUserName').value.toLowerCase();
        const filterState = document.getElementById('filterState').value.toLowerCase();
        const filterReplicaOwnerName = document.getElementById('filterReplicaOwnerName').value.toLowerCase();
        const filterReplicaName = document.getElementById('filterReplicaName').value.toLowerCase();
        const filterCity = document.getElementById('filterCity').value.toLowerCase();

        try {
            const response = await axios.get('http://localhost:8080/pilgrimage/get-all');
            const peregrinaciones = response.data.data;

            const filteredPeregrinaciones = peregrinaciones.filter(peregrinacion => {
                return (
                    (peregrinacion.receiver_user_name.toLowerCase().includes(filterReceiverUserName) || filterReceiverUserName === '') &&
                    (peregrinacion.state.toLowerCase().includes(filterState) || filterState === '') &&
                    (peregrinacion.replica_owner_name_id.toLowerCase().includes(filterReplicaOwnerName) || filterReplicaOwnerName === '') &&
                    (peregrinacion.replica_name.toLowerCase().includes(filterReplicaName) || filterReplicaName === '') &&
                    (peregrinacion.city.toLowerCase().includes(filterCity) || filterCity === '')
                );
            });

            renderPeregrinaciones(filteredPeregrinaciones);
        } catch (error) {
            console.error('Error filtrando las peregrinaciones:', error);
        }
    }
});
