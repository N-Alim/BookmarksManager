let url;
let selectedTags = [];

document.querySelector("select#tags").addEventListener("change", function(){addTag(this)});
document.querySelector("select#tags").addEventListener("focus", () =>
{
    document.querySelector("select#tags").value=-1;
    document.querySelector("select#tags").blur();
});

document.querySelector("button.confirm").addEventListener("click", addBookmark);

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    document.querySelector("input#name").value = tabs[0].title;
    url = tabs[0].url;

    getTagsAsOptions();
});
