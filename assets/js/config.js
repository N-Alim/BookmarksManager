function checkVersionChanges()
{
    const currVersion = getVersion();
    const prevVersion = localStorage['version']

    if (currVersion != prevVersion) 
    {
        if (typeof prevVersion == 'undefined') 
            onInstall();

        // else 
        //     onUpdate();

        localStorage['version'] = currVersion;
    }
}

function getVersion() 
{
    return chrome.runtime.getManifest().version;
}

function onInstall() 
{
    localStorage["bookmarks"] = JSON.stringify({});
    localStorage["tagsList"] = JSON.stringify({"Undefined": {id: 0, useCount: 0}});
    localStorage["lastTagIDUsed"] = JSON.stringify(0);  
}
