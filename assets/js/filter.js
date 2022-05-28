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
    // WIP 1 - start
    if (searchString === "")
        return true;
    // WIP 1 - end

    let regexString = searchString.replace(/\s+/g, ".*");

    console.log(regexString);

    console.log(bookmark[1].title);
    
    const regExp = ((caseSensitive) ? new RegExp(regexString) : new RegExp(regexString, "i"))

    console.log(regExp.test(bookmark[1].title));


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
