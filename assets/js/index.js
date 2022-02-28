checkVersionChanges();

let url;
let selectedTags = [];

document.querySelector("button.confirm").addEventListener("click", createBookmark);

chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
{
    document.querySelector("input#name").value = tabs[0].title;
    url = tabs[0].url;

    getTagsAsOptions();
});
