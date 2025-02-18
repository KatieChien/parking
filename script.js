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
// 設定租約開始日為當天日期
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startdate").value = new Date().toISOString().split("T")[0];
});
//新增按鈕資料同步google sheet
document.getElementById("addRecord").addEventListener("click", function () {
    alert("點擊後會新增資料到 Google Sheets（之後串接 API）");
});

//index查詢按鈕
document.getElementById("searchBtn").addEventListener("click", function () {
    alert("查詢 Google Sheets（之後串接 API）");
});


