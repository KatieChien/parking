function enableEdit() {
    document.getElementById('parkingSpot').removeAttribute('readonly');
    document.getElementById('editBtn').classList.add('d-none');
    document.getElementById('saveBtn').classList.remove('d-none');
}

function saveEdit() {
    document.getElementById('parkingSpot').setAttribute('readonly', true);
    document.getElementById('saveBtn').classList.add('d-none');
    document.getElementById('editBtn').classList.remove('d-none');
}