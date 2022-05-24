function createTag() 
{
    const name = document.querySelector("input.tagInput").value.trim();

    document.querySelector("input.tagInput").value = "";

    lastTagIdUsed += 1;

    tagsList[name] = 
    {
        "id": lastTagIdUsed,
        "useCount": 0
    };

    chrome.storage.local.set({"tagsList" : tagsList, 
        "lastTagIdUsed": lastTagIdUsed})
        .then(() =>
        {
            resetTags();
            getTagsAsButtons();
        });
}

function getTagsAsButtons()
{
    const tagsContainer = document.querySelector("aside.tagsMain");

    let tagsListEntries = Object.entries(tagsList);
    tagsListEntries = tagsListEntries.sort(sortTagsAlphabetically);
    
    for (const [key, value] of tagsListEntries) 
    {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = key;

        tag.addEventListener("click", (event) => 
        {
            const index = selectedTags.indexOf(value.id);
            if (index > -1) 
            {
                selectedTags.splice(index, 1);
                filterAllBookmarksByTags();
                getBookmarks(sortedBookmarks);                
            }

            else 
            {
                selectedTags.push(value.id);
                filterBookmarksByTag(value.id);
                getBookmarks(sortedBookmarks);                
            }
            
            event.target.classList.toggle("selected");
        })

        tagsContainer.appendChild(tag);  
    }
}


function getBookmarks(bookmarks)
{
    resetBookmarks()
    const bookmarksContainer = document.querySelector("div.bookmarksMain");

    bookmarks = Object.entries(bookmarks);

    bookmarks = bookmarks.sort(sortBookmarksAlphabetically);
    
    for (const bookmark of bookmarks) 
    {
        bookmarksContainer.appendChild(createBookmarkCard(bookmark));  
    }
}

function resetBookmarks()
{
    const oldBookmarksContainer = document.querySelector("div.bookmarksMain");
    const bookmarksContainer = document.createElement("div");
    bookmarksContainer.className = "bookmarksMain";
    oldBookmarksContainer.replaceWith(bookmarksContainer);
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

    const cardIcon = document.createElement("img");
    cardIcon.src = value.favIconUrl;

    const cardText = document.createElement("div");
    cardText.className = "bookmarkCardText";
    
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = ((value.title !== "") ? value.title : key);

    cardText.appendChild(cardTitle);

    cardText.appendChild(getTags(value.tags));

    bookmark.appendChild(cardIcon);

    bookmark.appendChild(cardText);

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
        for ([key, value] of Object.entries(tagsList))
            if (value.id === id)
                tagsNameList.push(key);
    }

    return tagsNameList;
}

function filterBookmarksByTag(tagID)
{
    let filteredBookmarks = {};

    for ([url, data] of Object.entries(sortedBookmarks))
        if (data.tags.includes(tagID))
            filteredBookmarks[url] = data;   
            
    sortedBookmarks = filteredBookmarks;
}

function filterAllBookmarksByTags()
{
    let filteredBookmarks = {};
    let containsAllSelectedTags;

    for ([url, data] of Object.entries(bookmarks))
    {
        containsAllSelectedTags = true;
        for (tagID of selectedTags)
        {
            if (!data.tags.includes(tagID))    
            {
                containsAllSelectedTags = false;
                break;
            }
        }

        if (containsAllSelectedTags)
        {
            filteredBookmarks[url] = data;
        }
    }
    
    sortedBookmarks = filteredBookmarks;
}

function resetTags() 
{
    const oldTagsContainer = document.querySelector("aside.tagsMain");
    const tagsContainer = document.createElement("aside");
    tagsContainer.className = "tagsMain";
    oldTagsContainer.replaceWith(tagsContainer);
}

function deleteTag(tagName) /* WIP */
{
    chrome.storage.local.get("bookmarks", (data) => 
    {
        delete data.bookmarks[url];
    
        chrome.storage.local.set({"bookmarks" : data.bookmarks}, () => 
        {    
            decrementTagsCount();   
            chrome.action.setIcon({ path: "assets/img/fav-16.png" });
        });
    })

    delete tagsList[tagName];

    chrome.storage.local.set({"tagsList" : tagsList, 
    "lastTagIdUsed": lastTagIdUsed})
    .then(() =>
    {
        chrome.storage.local.get("tagsList", (data) => 
        {
            tagsList = data.tagsList;

            resetTags();
            getTagsAsButtons();
        });
    });
}