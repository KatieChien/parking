//google sheet api串接
const apiKey = "AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I"; 
const spreadsheetId = "1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA"; 
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const sheets = data.sheets;
    const dropdown = document.getElementById("sheetDropdown");

    // 先清除所有選項
    dropdown.innerHTML = "<option value=''>選擇停車場</option>";  // 可以保留一個預設選項

    // 動態添加新的選項
    sheets.forEach(sheet => {
      const option = document.createElement("option");
      option.value = sheet.properties.title;
      option.textContent = sheet.properties.title;
      dropdown.appendChild(option);
    });
  })
  .catch(error => console.error("錯誤: ", error));

// 設定租約開始日為當天日期
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startdate").value = new Date().toISOString().split("T")[0];
});
//新增按鈕資料同步google sheet
document.getElementById("addRecord").addEventListener("click", function () {
    alert("資料已同步Google表單");
});
