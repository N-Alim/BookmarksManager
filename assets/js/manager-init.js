let bookmarks;
let sortedBookmarks;
let tagsList;
let lastTagIdUsed;
let selectedTags = [];

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


