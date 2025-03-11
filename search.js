var ApiUrl = "https://script.google.com/macros/s/AKfycbz8XzBqxfwH2Bkg2NJ6_SmkcpmLQIVbMux3NtwLkoSqx7ZvfGcvGsGAAHIRl0wMjMlX/exec";

//編輯解鎖
function enableEdit() {
  //全部的Input 解除readonly
  //document.getElementById('parkingSpot').removeAttribute('readonly');
  var x = document.getElementsByTagName("input");
  for (var counter = 0; counter < x.length; counter++) {
    x.item(counter).readOnly = "";
  }
  document.getElementById("editBtn").classList.add("d-none");
  document.getElementById("saveBtn").classList.remove("d-none");
}

function saveEdit() {
  //document.getElementById('parkingSpot').setAttribute('readonly', true);
  var x = document.getElementsByTagName("input");
  for (var counter = 0; counter < x.length; counter++) {
    x.item(counter).readOnly = "readonly";
  }
  document.getElementById("saveBtn").classList.add("d-none");
  document.getElementById("editBtn").classList.remove("d-none");
  const params = new URLSearchParams(window.location.search);
  const parkingLot = params.get("sheetDropdown");
  const spaceNumber = params.get("queryValue");
  var data = {
    action: "update",
    parkingLot: parkingLot,
    spaceNumber: spaceNumber,
    nuber: document.getElementById("number").value,
    name: document.getElementById("name").value,
    startdate: document.getElementById("startdate").value,
    enddate: document.getElementById("enddate").value,
    period: document.getElementById("period").value,
    amount: document.getElementById("amount").value,
    deposit: document.getElementById("deposit").value,
    note: document.getElementById("note").value,
  };

  if (!parkingLot || !spaceNumber) {
    alert("請填寫停車場名稱和車位號！");
    return;
  }
 //儲存按鈕先顯示請稍候
    document.getElementById("saveBtn").innerHTML = "請稍候...";
    document.getElementById("saveBtn").disabled = true;

  fetch(
    ApiUrl,
    {
      method: "POST",
      //mode: 'cors',  // 確保 CORS 模式開啟
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("回應:", data);
      if (data.status == "success") {
        alert("更新成功");
        document.getElementById("saveBtn").innerHTML = "儲存";
        document.getElementById("saveBtn").disabled = false;
      } else {
        alert("更新失敗：" + data.message);
        document.getElementById("saveBtn").innerHTML = "儲存";
        document.getElementById("saveBtn").disabled = false;
      }
    })
    .catch((error) => console.error("錯誤:", error));
}

// 這裡保留原來從 URL 參數獲取的 sheetDropdown
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const sheetDropdown = params.get("sheetDropdown"); // 改變變數名稱
  const queryValue = params.get("queryValue");

  if (!sheetDropdown || !queryValue) {
    alert("缺少必要參數！");
    return;
  }

  fetchGoogleSheetData(sheetDropdown, queryValue);
});

//讀取 Google Sheets 資料
async function fetchGoogleSheetData(sheetDropdown, queryValue) {
  const sheetId = "1iIdv3ETO9ZFbRyGfIymX21To02LyV30jy9bD-MFN2cA";
  const apiKey = "AIzaSyA13JzQbEfos7UR8PuYSrxpnBBiqdkuE8I";
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
    const tenantData = rows.find((row) => row[0] == queryValue);

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

// 儲存按鈕點擊事件
// document.getElementById("saveBtn").addEventListener("click", async function() {
//     const params = new URLSearchParams(window.location.search)
//     const parkingLot = params.get("sheetDropdown");
//     const spaceNumber = params.get("queryValue");

//     if (!parkingLot || !spaceNumber) {
//         alert("請填寫停車場名稱和車位號！");
//         return;
//     }

//     const updatedData = [
//         document.getElementById("number").value,
//         document.getElementById("name").value,
//         document.getElementById("startdate").value,
//         document.getElementById("enddate").value,
//         document.getElementById("period").value,
//         document.getElementById("amount").value,
//         document.getElementById("deposit").value,
//         document.getElementById("note").value
//     ];

//     try {
//         // 取得對應行號
//         const rowResponse = await fetch("https://script.google.com/macros/s/AKfycby9sAT751p2ViYsumirw2pfX1we8Srj7LBpkLBzJwe8Omc_1VNtkcQnL9X7WdWdbv76/exec", {
//             method: "POST",
//             headers: { "Content-Type": "text/plain;charset=utf-8" },
//             body: JSON.stringify({
//                 parkingLot: parkingLot,
//                 spaceNumber: spaceNumber
//             })
//         });

//         const rowData = await rowResponse.json();
//         const row = rowData.row;

//         if (!row) {
//             alert("找不到對應的資料！");
//             return;
//         }

//     // 更新 Google Sheets
//     const updateResponse = await fetch("https://script.google.com/macros/s/AKfycby9sAT751p2ViYsumirw2pfX1we8Srj7LBpkLBzJwe8Omc_1VNtkcQnL9X7WdWdbv76/exec", {
//         method: "POST",
//         headers: { "Content-Type": "text/plain;charset=utf-8" },
//         body: new URLSearchParams({
//             sheet: parkingLot,
//             row: row,
//             values: JSON.stringify(updatedData)
//         })
//     });

//     const result = await updateResponse.text();
//     console.log("更新成功", result);
//     alert("資料已更新！");

//     // 鎖定輸入框
//     saveEdit();

// } catch (error) {
//     console.error("更新失敗", error);
//     alert("更新失敗，請檢查錯誤！");
// }
// });

var button = document.querySelector(".popup");
var showtxt = document.querySelector(".show");

function popup2(e) {
  var userConfirmed = confirm("確定要刪除該租客資料嗎？");

  if (userConfirmed) {

    const params = new URLSearchParams(window.location.search);
        const parkingLot = params.get("sheetDropdown");
        const spaceNumber = params.get("queryValue");
        let data = {
          action: "delete",
          parkingLot: parkingLot,
          spaceNumber: spaceNumber,
          nuber: document.getElementById("number").value,
       }
       fetch(
        ApiUrl,
        {
          method: "POST",
          //mode: 'cors',  // 確保 CORS 模式開啟
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("回應:", data);
          if (data.status == "success") {
            alert("已刪除!");
            // 0.5 秒後跳轉到指定頁面
    setTimeout(function () {
        window.location.href = "index.html"; // 替換為你的跳轉頁面
      }, 500);

          } else {
            alert("更新失敗：" + data.message);

          }
        })
        .catch((error) => console.error("錯誤:", error));

    
  } else {
    alert("不刪除"); // 顯示彈跳視窗
  }
}

button.addEventListener("click", popup2);

function paynow() {

    var userConfirmed = confirm("確定要更新繳費嗎？");
    
    if (userConfirmed) {
        const params = new URLSearchParams(window.location.search);
        const parkingLot = params.get("sheetDropdown");
        const spaceNumber = params.get("queryValue");
        let data = {
          action: "pay",
          parkingLot: parkingLot,
          spaceNumber: spaceNumber,
          nuber: document.getElementById("number").value,
       }
       document.getElementById("pay").innerHTML = "請稍候...";
       document.getElementById("pay").disabled = true;
       fetch(
        ApiUrl,
        {
          method: "POST",
          //mode: 'cors',  // 確保 CORS 模式開啟
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("回應:", data);
          if (data.status == "success") {
            //alert("更新成功");
            modalContent.textContent = data.notificationText;
            modal.classList.add("show");
            modal.style.display = "block";

            document.getElementById("pay").innerHTML = "繳費";
            document.getElementById("pay").disabled = false;
          } else {
            alert("更新失敗：" + data.message);
            document.getElementById("pay").innerHTML = "繳費";
            document.getElementById("pay").disabled = false;
          }
        })
        .catch((error) => console.error("錯誤:", error));
    }
}

var modal;
var closeBtns;
var modalContent;
document.addEventListener("DOMContentLoaded", async function () {
   modal = document.getElementById("myModal");
  //const backdrop = document.getElementById("modalBackdrop");
  //const openBtn = document.getElementById("pay");
   closeBtns = document.querySelectorAll("#closeModalBtn, #closeModalBtn2");
   modalContent = document.getElementById("modalContent");

  const scriptURL = "https://script.google.com/macros/s/AKfycbwEc7oIgRC5ORO8gIx-znF0nh-VXtpXw3uBNWGOukPWQdlqjmML7d_xi4v9-yuBz-2y/exec";

  // 打開 Modal
  // openBtn.addEventListener("click", async function () {
  //   modal.classList.add("show");
  //   modal.style.display = "block";
  //   backdrop.classList.add("show");
  // });

  // try {
  //     const response = await fetch(scriptURL);
  //     const data = await response.json();  // 轉成 JSON 格式
  //     console.log("取得的數據:", data); // 偵錯用，看看 data 的內容
  //     modalContent.textContent = data.text || "沒有數據";  // 確保 API 回傳正確
  //   } catch (error) {
  //     modalContent.textContent = "數據載入失敗";
  //     console.error("Error fetching data:", error);
  //   }


  // 關閉 Modal
  closeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      //複製modalContent的文字到剪貼簿
      var copyText = modalContent.textContent;
      var temp = document.createElement("textarea");
      temp.value = copyText;
      document.body.appendChild(temp);
      temp.select();
      temp.setSelectionRange(0, 99999); // For mobile devices
      // Copy the text inside the text field
      navigator.clipboard.writeText(temp.value);
      document.body.removeChild(temp);


      modal.classList.remove("show");
      modal.style.display = "none";
      location.reload();
      //backdrop.classList.remove("show");
    });
  });

  // 點擊遮罩關閉 Modal
  // backdrop.addEventListener("click", function () {
  //   modal.classList.remove("show");
  //   modal.style.display = "none";
  //   backdrop.classList.remove("show");
  // });
});
