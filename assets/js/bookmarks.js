function addBookmark()
{
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    const bookmark = 
    {
        "title": document.querySelector("input#name").value,
        "url": url,        
        "tags": getSelectedTagsID()
    };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

}

function getSelectedTagsID()
{
    tagsID = [];

    for ([tagID, ] of selectedTags)
    {
        tagsID.push(tagID);
    }

    if (tagsID.length === 0)
        tagsID.push(0);

    return tagsID;
}