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

function filterBookmarksBySearch(bookmarks)
{
    let filteredBookmarks = {};

    for (bookmark of Object.entries(bookmarks))
        if (isStringInBookmark(bookmark))
            filteredBookmarks[bookmark[0]] = bookmark[1];   
            
    sortedBookmarks = filteredBookmarks;
}

function isStringInBookmark(bookmark)
{
    const regExp = ((caseSensitive) ? new RegExp(searchString) : new RegExp(searchString, "i"))


    switch (searchMode) {
        case 0:
            return regExp.test(bookmark[0]);

        case 1:
            return regExp.test(bookmark[1].title);

        case 2:
            return (regExp.test(bookmark[0]) || regExp.test(bookmark[1].title));
            
        default:
            break;
    }
} 

function filterAllBookmarksByTagsAndSearch()
{
    filterAllBookmarksByTags();
    filterBookmarksBySearch(sortedBookmarks);
}
