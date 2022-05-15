function checkVersionChanges()
{
    chrome.storage.local.get("version", (data) => 
    {
        const currVersion = getVersion();
    
        if (currVersion != data.version) 
        {
            if (typeof data.version == 'undefined') 
                onInstall();
    
            // else 
            //     onUpdate();
            chrome.storage.local.set({"version" : currVersion});
        }
    })

}

function getVersion() 
{
    return chrome.runtime.getManifest().version;
}

function onInstall() 
{
    chrome.storage.local.set({"bookmarks" : {}, 
        "tagsList" : {"Undefined": {id: 0, useCount: 0}}, 
        "lastTagIdUsed" : 0});
}
