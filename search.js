//編輯解鎖
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

// 這裡保留原來從 URL 參數獲取的 sheetDropdown
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const sheetDropdown = params.get("sheetDropdown"); // 改變變數名稱
    const queryValue = params.get("queryValue");

    if (!sheetDropdown || !queryValue) {
        alert("缺少必要參數！");
        return;
    }

    fetchGoogleSheetData(sheetDropdown, queryValue);
});

async function fetchGoogleSheetData(sheetDropdown, queryValue) {
    const sheetId = "1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA"; 
    const apiKey = "AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I"; 
    const sheetName = sheetDropdown;  // 使用修改過的變數
    const url = `https://sheets.googleapis.com/v4/spreadsheets/1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA/values/${sheetDropdown}!A:Z?key=AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values;

        if (!rows) {
            alert("查無資料");
            return;
        }

        // 找出匹配的租客資料
        const headers = rows[0]; // 標題列
        const tenantData = rows.find(row => row[0] == queryValue);

        if (!tenantData) {
            alert("找不到該車位的租客資料");
            return;
        }

        // 填入 `search.html` 的對應欄位
        document.getElementById("number").value = tenantData[0] || "";
        document.getElementById("name").value = tenantData[1] || "";
        document.getElementById("startdate").value = tenantData[2] || "";
        document.getElementById("enddate").value = tenantData[3] || "";
        document.getElementById("period").value = tenantData[4] || "";
        document.getElementById("amount").value = tenantData[7] || "";
        document.getElementById("deposit").value = tenantData[8] || "";
        document.getElementById("note").value = tenantData[9] || "";

    } catch (error) {
        console.error("載入 Google Sheets 資料失敗", error);
    }
}



// 儲存更新 Google Sheets
document.getElementById("saveBtn").addEventListener("click", async function() {
    const params = new URLSearchParams(window.location.search);
    const sheetDropdown = params.get("sheetDropdown"); // 改變變數名稱
    const queryValue = params.get("queryValue");

    const updatedData = [
        document.getElementById("number").value,
        document.getElementById("name").value,
        document.getElementById("startdate").value,
        document.getElementById("enddate").value,
        document.getElementById("period").value,
        document.getElementById("amount").value,
        document.getElementById("deposit").value,
        document.getElementById("note").value
    ];

    const sheetId = "1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA";
    const apiKey = "AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I";
    const sheetName = sheetDropdown; // 使用修改過的變數

    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA/values/${sheetDropdown}!A:Z?valueInputOption=RAW&key=AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I`;

    try {
        await fetch(updateUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values: [updatedData] })
        });

        alert("資料已更新！");
    } catch (error) {
        console.error("更新 Google Sheets 失敗", error);
    }
});


        var button = document.querySelector('.popup');
        var showtxt = document.querySelector('.show');

function popup2(e) {
    var userConfirmed = confirm('確定要刪除該租客資料嗎？');
    
    if (userConfirmed) {
        alert('已刪除'); // 顯示彈跳視窗
        

        // 0.5 秒後跳轉到指定頁面
        setTimeout(function () {
            window.location.href = 'http://katiechien.github.io/parking'; // 替換為你的跳轉頁面
        }, 500);
    } else {
        alert('不刪除'); // 顯示彈跳視窗
    }
}

    button.addEventListener('click', popup2);
    
    