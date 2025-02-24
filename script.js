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
    alert("資料已同步Google表單");
});

//index查詢按鈕
document.getElementById("searchBtn").addEventListener("click", function () {
    alert("查詢 Google Sheets（之後串接 API）");
});

//google sheet api串接
const apiKey = "AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I"; 
const spreadsheetId = "1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA"; 
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const sheets = data.sheets;
    const dropdown = document.getElementById("sheetDropdown");

    sheets.forEach(sheet => {
      const option = document.createElement("option");
      option.value = sheet.properties.title;
      option.textContent = sheet.properties.title;
      dropdown.appendChild(option);
    });
  })
  .catch(error => console.error("Error fetching sheet data:", error));

  //工作表選取
  
  function loadSheetHeaders() {
    const sheetName = document.getElementById("sheetDropdown").value; // 取得選擇的工作表
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:Z1?key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const headers = data.values[0]; // 第一列是標題
        console.log("試算表標題:", headers);
  
        const form = document.getElementById("dynamicForm");
        form.innerHTML = ""; // 清空舊內容
  
        headers.forEach(header => {
          const label = document.createElement("label");
          label.textContent = header;
  
          const input = document.createElement("input");
          input.type = "text"; 
          input.name = header; // 讓 input 名稱對應標題
  
          form.appendChild(label);
          form.appendChild(input);
          form.appendChild(document.createElement("br"));
        });
      })
      .catch(error => console.error("讀取標題失敗:", error));
  }
  
  // 頁面載入時，預設載入第一個選項的工作表
  window.onload = loadSheetHeaders;

  let queryResults = []; // 儲存查詢結果

// 查詢數據
function queryData() {
  const queryField = document.getElementById("queryField").value; // 查詢的欄位名稱
  const queryValue = document.getElementById("queryValue").value; // 查詢的內容

  // 讀取 Google 試算表的資料範圍
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const headers = data.values[0]; // 第一列是標題
      const rowData = data.values.slice(1); // 從第二列開始是資料

      const queryIndex = headers.indexOf(queryField); // 找到查詢欄位在標題列的位置
      if (queryIndex === -1) {
        console.error("查無此欄位");
        return;
      }

      queryResults = rowData.filter(row => row[queryIndex] && row[queryIndex].includes(queryValue)); // 查詢資料
      showResults(queryResults);
    })
    .catch(error => console.error("查詢錯誤:", error));
}

// 顯示查詢結果
function showResults(results) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // 清空結果

  if (results.length === 0) {
    resultDiv.innerHTML = "無符合條件的資料";
  } else {
    const table = document.createElement("table");

    // 建立表格頭
    const headerRow = document.createElement("tr");
    const headers = results[0]; // 取得結果的第一列作為標題行

    headers.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // 顯示資料列
    results.forEach(row => {
      const rowElement = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        rowElement.appendChild(td);
      });
      table.appendChild(rowElement);
    });

    resultDiv.appendChild(table);
  }
}

// 提交查詢結果到 Google 試算表
function submitData() {
  if (queryResults.length === 0) {
    alert("沒有查詢結果可提交！");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A2:append?valueInputOption=RAW&key=${apiKey}`;

  // 準備提交的資料
  const valuesToSubmit = queryResults.map(row => row); // 這裡的 row 是查詢的結果

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: valuesToSubmit })
  })
  .then(response => response.json())
  .then(data => {
    console.log("提交成功:", data);
    alert("查詢結果已成功提交到 Google 試算表！");
  })
  .catch(error => {
    console.error("提交失敗:", error);
    alert("提交失敗，請稍後再試。");
  });
}