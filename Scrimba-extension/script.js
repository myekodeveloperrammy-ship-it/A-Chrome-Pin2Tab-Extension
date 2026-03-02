let myLeads = [];
let oldLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// localStorage.clear()
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// getting rendered list from localStorage
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  // Grabing the active tab from chrome
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li class="list">
        
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>`;
  }

  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);

  // console.log(localStorage.getItem("myLeads"));
});
