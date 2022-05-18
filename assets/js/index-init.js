checkVersionChanges();

let url;
let favIconUrl;
let selectedTags = [];
let tagsList;

document.querySelector("button.confirm").addEventListener("click", editBookmark);
document.querySelector("button.remove").addEventListener("click", deleteBookmark);

chrome.storage.local.get("tagsList", (data) => 
{
    tagsList = data.tagsList
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
    {
        currentTab = tabs[0];
        document.querySelector("input#name").value = currentTab.title;
        url = currentTab.url;
        favIconUrl = ((currentTab.favIconUrl !== undefined) ? currentTab.favIconUrl : "assets/img/fav-128-full.png"); 

        getTagsAsOptions();
        createBookmark();
    })
});
