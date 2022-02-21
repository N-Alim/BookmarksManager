function addBookmark()
{
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    bookmarks[url] = 
    {
        "title": document.querySelector("input#name").value,
        "tags": getSelectedTagsID()
    };

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    incrementTagsCount();
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

function incrementTagsCount()
{
    const tagsList = JSON.parse(localStorage.getItem("tagsList"));

    for ([, tagName] of selectedTags)
    {
        tagsList[tagName].useCount++;
    }

    localStorage.setItem("tagsList", JSON.stringify(tagsList));

}

function getBookmarks()
{
    const bookmarksContainer = document.querySelector("main");

    let bookmarks = Object.entries(JSON.parse(localStorage.getItem("bookmarks")));

    bookmarks = bookmarks.sort(sortBookmarksAlphabetically);
    
    for (const bookmark of bookmarks) 
    {
        bookmarksContainer.appendChild(createBookmarkCard(bookmark));  
    }
}

function sortBookmarksAlphabetically(first, second)
{ 
    if (first[1].title < second[1].title) 
        return -1;
    
    if (first[1].title < second[1].title) 
        return 1;
   
    else 
    {
        if (first[0] < second[0]) 
            return -1;
    
        return 1;
    }
}

function createBookmarkCard([key, value])
{
    const bookmark = document.createElement("div");
    bookmark.className = "bookmarkCard";
    
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = value.title;

    bookmark.appendChild(cardTitle);

    bookmark.appendChild(getTags(value.tags));

    const linkToBookmark = document.createElement("a");
    linkToBookmark.href = key;
    linkToBookmark.target = "_blank";
    linkToBookmark.className = "bookmarkLink";
    linkToBookmark.appendChild(bookmark);

    return linkToBookmark;
}

function getTags(tagsID)
{
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "tagsMain";

    // let tagsList = Object.entries(JSON.parse(localStorage.getItem("tagsList")));
    // tagsList = tagsList.sort(sortTagsAlphabetically);
    
    tagsID = replaceTagsIDByName(tagsID);
    tagsID.sort();

    for (const value of tagsID) 
    {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = value;

        tagsContainer.appendChild(tag);  
    }

    return tagsContainer;
}

function replaceTagsIDByName(tagsID)
{
    const tagsNameList = [];
    for (id of tagsID)
    {
        for ([key, value] of Object.entries(JSON.parse(localStorage.getItem("tagsList"))))
            if (value.id === id)
                tagsNameList.push(key);
    }

    return tagsNameList;

}