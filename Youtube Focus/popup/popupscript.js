
var list = ["Sam Procrastinates", "3FS", "DotoDoya"];

const addButton = document.getElementById("add-to-list");
const remButton = document.getElementById("remove-from-list");
const bannedList = document.getElementById("banned-list");

startup();

function startup() {
    chrome.storage.local.get(['list'], (val) => {
        list = val.list;

        if (list == null) list = [];

        buildHTMLList();
    });
}



addButton.onclick = function() {
    const textf = document.getElementById("add-text-field");
    if (textf.value == "") return;

    updateList(textf.value, false);
    buildHTMLList();
    
    textf.value = "";
};

remButton.onclick = function () {
    updateList("", true);
    buildHTMLList();
    // console.log(list);
};



// creates an item in the unodered list
function buildHTMLListItem(name) {
    const newLiItem = document.createElement("li")
    newLiItem.innerHTML = name

    return newLiItem;
};

// builds the banned items list in the html file
function buildHTMLList() {
    const a = bannedList.getElementsByTagName("li");
    // remove all current list items if any
    if (a[0] != null) {
        for (var i=a.length-1; i>-1 ;i--) {
            bannedList.removeChild(a[i]);
        }
    }

    for (el in list) {
        it = buildHTMLListItem(list[el]);
        bannedList.appendChild(it);
    }
}

// updates list var
function updateList(value, remove) {
    if (!remove) {
        if (list != null && list.includes(value)) return;
        list.push(value);
    } else {
        list.pop();
    }
    chrome.storage.local.set({ list, });
};

// function buildList() {
//     const docListItems = bannedList.getElementsByTagName("li");

//     for (var i = 0; i < docListItems.length; i++) {
//         if (list.includes(docListItems[i].innerHTML)) continue;
//         list.push(docListItems[i].innerHTML);
//     }
// };