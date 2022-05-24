function filterBookmarksBySearch(allBookmarks = true)
{
    let filteredBookmarks = {};

    for (bookmark of Object.entries(((allBookmarks) ? bookmarks : sortedBookmarks)))
        if (isStringInBookmark(bookmark))
            filteredBookmarks[bookmark[0]] = bookmark[1];   
            
    sortedBookmarks = filteredBookmarks;
}

function isStringInBookmark(bookmark)
{
    if (searchString === "")
        return true;

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

// function isSubstringInString()