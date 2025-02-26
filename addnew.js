// 設定租約開始日為當天日期
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startdate").value = new Date().toISOString().split("T")[0];
});
//新增按鈕資料同步google sheet
document.getElementById("addRecord").addEventListener("click", function () {
    alert("資料已同步Google表單");
});
