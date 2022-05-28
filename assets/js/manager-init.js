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
    let newSearchString = event.target.value.trim().replace(/\s+/g, ".*");;

    if (newSearchString === "")
    {
        searchString = newSearchString;
        filterAllBookmarksByTags();
    }

    else if (searchString.length < newSearchString.length) 
    {
        searchString = newSearchString;
        filterBookmarksBySearch(sortedBookmarks);
    }

    else 
    {
        searchString = newSearchString;
        filterAllBookmarksByTagsAndSearch();
    }      

    getBookmarks(sortedBookmarks);                

})

document.querySelector("input#caseSensitive").addEventListener("change", (event) => 
{
    caseSensitive = event.target.checked;
    filterAllBookmarksByTagsAndSearch();
    getBookmarks(sortedBookmarks);                
})

document.querySelector("fieldSet#searchMode").addEventListener("change", (event) => 
{
    searchMode = parseInt(event.target.value);
    filterAllBookmarksByTagsAndSearch();
    getBookmarks(sortedBookmarks);                
})

document.querySelector("button.addButton").addEventListener("click", createTag);
document.querySelector("input#import").addEventListener("change", (event) => 
{
    fileReader = new FileReader();
    fileReader.onload = function(event) { console.log(fileReader.result);   /* loadBookmarksFromJSON */};
    fileReader.readAsText(event.target.files[0]);
});
document.querySelector("button#export").addEventListener("click", downloadBookmarksAsJSON);

chrome.storage.local.get(["bookmarks", "tagsList", "lastTagIdUsed"], (data) => 
{
    bookmarks = data.bookmarks;
    sortedBookmarks = data.bookmarks;
    tagsList = data.tagsList;
    lastTagIdUsed = data.lastTagIdUsed;

    getBookmarks(bookmarks);
    getTagsAsButtons();
});
