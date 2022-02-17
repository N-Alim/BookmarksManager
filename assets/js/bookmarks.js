function addBookmark()
{
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    const bookmark = 
    {
        title:document.querySelector("input#name").value,
        url: url,        
        tags: selectedTags
    };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

}
