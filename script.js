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

document.addEventListener("DOMContentLoaded", function () {
    const deleteBtn = document.getElementById("deleteTenant"); // 確保這裡拼對了
    const modal = document.getElementById("deleteModal");
    const confirmDeleteBtn = document.getElementById("confirmDelete");
    const cancelDeleteBtn = document.getElementById("cancelDelete");

    if (!deleteBtn) {
        console.error("找不到 #deleteTenant，請檢查 HTML");
        return;
    }

    // 點擊「刪除該租客資料」，顯示彈跳視窗
    deleteBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止 <a> 的默認行為（防止頁面跳轉）
        modal.style.display = "flex";
    });

    // 點擊「取消」，關閉彈跳視窗
    cancelDeleteBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 點擊「確認刪除」，請求 Google Sheets 刪除資料
    confirmDeleteBtn.addEventListener("click", function () {
        const tenantId = "12345"; // 這裡要換成你的租客 ID

        fetch("你的Google Apps Script API網址", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "deleteTenant", tenantId: tenantId }) // 確保 action 名稱正確
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("租客資料已刪除！");
                modal.style.display = "none";
                location.reload(); // 刷新頁面
            } else {
                alert("刪除失敗：" + data.message);
            }
        })
        .catch(error => {
            alert("刪除過程中發生錯誤：" + error);
        });
    });
});



