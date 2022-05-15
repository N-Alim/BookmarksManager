chrome.tabs.onActivated.addListener(function () 
{
    chrome.storage.local.get("bookmarks", (data) => 
    {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
        {
            currentTab = tabs[0];
            if (data.bookmarks[currentTab.url])
            {
                chrome.action.setIcon({ path: "../img/fav-16-full.png" });
            }
    
            else
            {
                chrome.action.setIcon({ path : "../img/fav-16.png" });
            }
        })    
    })
});    

chrome.tabs.onUpdated.addListener(function () 
{
    chrome.storage.local.get("bookmarks", (data) => 
    {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs)
        {
            currentTab = tabs[0];
            if (data.bookmarks[currentTab.url])
            {
                chrome.action.setIcon({ path: "../img/fav-16-full.png" });
            }
    
            else
            {
                chrome.action.setIcon({ path : "../img/fav-16.png" });
            }
        })    
    })
});    