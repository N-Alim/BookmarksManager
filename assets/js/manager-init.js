let bookmarks;
let sortedBookmarks;
let tagsList;
let lastTagIdUsed;
let selectedTags = [];
let searchString = "";
let caseSensitive = false;
let searchMode = 0;

document.querySelector("input#search").addEventListener("input", (event) => 
{
    if (searchString.length < event.target.value.length) 
    {
        searchString = event.target.value;
        filterBookmarksBySearch(false);
        getBookmarks(sortedBookmarks);                
    }

    else 
    {
        searchString = event.target.value;
        filterBookmarksBySearch();
        getBookmarks(sortedBookmarks);                
    }
})

document.querySelector("input#caseSensitive").addEventListener("change", (event) => 
{
    caseSensitive = event.target.checked;
    filterBookmarksBySearch();
    getBookmarks(sortedBookmarks);                
})

document.querySelector("fieldSet#searchMode").addEventListener("change", (event) => 
{
    searchMode = parseInt(event.target.value);
    filterBookmarksBySearch();
    getBookmarks(sortedBookmarks);                
})

document.querySelector("button.addButton").addEventListener("click", createTag);

chrome.storage.local.get(["bookmarks", "tagsList", "lastTagIdUsed"], (data) => 
{
    bookmarks = data.bookmarks;
    sortedBookmarks = data.bookmarks;
    tagsList = data.tagsList;
    lastTagIdUsed = data.lastTagIdUsed;

    getBookmarks(bookmarks);
    getTagsAsButtons();
});


