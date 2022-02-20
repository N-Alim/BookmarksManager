function addBookmark()
{
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks[url] = 
    {
        "title": document.querySelector("input#name").value,
        "tags": getSelectedTagsID()
    };

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
