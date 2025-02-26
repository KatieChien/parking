
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


  document.getElementById("searchBtn").addEventListener("click", function() {
    const parkingLot = document.getElementById("sheetDropdown").value;
    const parkingSlot = document.getElementById("queryValue").value;

    if (!queryValue) {
        alert("請輸入車位號！");
        return;
    }

    // 導向 `search.html` 並帶入查詢參數
    window.location.href = `search.html?sheetDropdown=${encodeURIComponent(parkingLot)}&queryValue=${encodeURIComponent(parkingSlot)}`;
});


