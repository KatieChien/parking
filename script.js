function enableEdit() {
    //全部的Input 解除readonly
    //document.getElementById('parkingSpot').removeAttribute('readonly');
    var x = document.getElementsByTagName("input");
    for ( var counter = 0; counter < x.length; counter++)
    {
       x.item(counter).readOnly = "";
    }  
    document.getElementById('editBtn').classList.add('d-none');
    document.getElementById('saveBtn').classList.remove('d-none');
}

function saveEdit() {
    //document.getElementById('parkingSpot').setAttribute('readonly', true);
    var x = document.getElementsByTagName("input");
    for ( var counter = 0; counter < x.length; counter++)
    {
       x.item(counter).readOnly = "readonly";
    }
    document.getElementById('saveBtn').classList.add('d-none');
    document.getElementById('editBtn').classList.remove('d-none');
}