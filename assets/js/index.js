function getTagsAsOptions()
{
    resetOptions();
    const tagsSelect = document.querySelector("select#tags");
    let tagsListEntries = Object.entries(tagsList);
    tagsListEntries = tagsListEntries.sort(sortTagsAlphabetically);

    for (const [key, value] of tagsListEntries) 
    {
        if (!isTagSelected(key))
        {
            const option = document.createElement("option");
            option.value =  value.id;
            option.innerText = key;
            tagsSelect.appendChild(option);
        }
    }
}

function isTagSelected(tagName)
{
    for (const [, selectedTagName] of selectedTags)
    {
        if (selectedTagName === tagName)
            return true;
    }
    return false;
}

function resetOptions()
{
    const oldTagsSelect = document.querySelector("select#tags");
    const newTagsSelect = createTagsSelect();
    oldTagsSelect.replaceWith(newTagsSelect);
}

function createTagsSelect()
{
    const filledTagsSelect = document.createElement("select");
    filledTagsSelect.range = "tags";
    filledTagsSelect.id = "tags";
    filledTagsSelect.name = "tags";

    filledTagsSelect.addEventListener("change", function(){addTag(this)});
    filledTagsSelect.addEventListener("focus", (event) =>
    {
        event.target.value = -1;
        event.target.blur();
    });

    return filledTagsSelect;
}

function addTag(select)
{
    const selectedOption = document.querySelector("option[value='" + select.value + "']");
    
    selectedTags.push([parseInt(selectedOption.value), selectedOption.innerText]);

    const tagsContainer = document.querySelector("div.tagsMain");

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerText = selectedOption.innerText;

    tag.appendChild(createCross());

    tagsContainer.appendChild(tag);

    select.removeChild(document.querySelector("option[value='" + selectedOption.value + "']"));
}

function createCross()
{
    const crossButton = document.createElement("div");
    crossButton.className = "cross-button";
    crossButton.addEventListener("click", function(){ removeTag(this); });
    
    const crossTop = document.createElement("div");
    crossTop.className = "cross-top";    
    
    const crossBottom = document.createElement("div");
    crossBottom.className = "cross-bottom";
    
    crossButton.appendChild(crossTop);
    crossButton.appendChild(crossBottom);

    return crossButton;
}

function removeTag(cross)
{
    const tag = cross.parentElement;

    tag.parentElement.removeChild(tag);
    selectedTags = selectedTags.filter(function(element) { return element[1] !== tag.innerText });

    getTagsAsOptions();
}

function createBookmark()
{
    chrome.storage.local.get("bookmarks", (data) => 
    {
        data.bookmarks[url] = 
        {
            "title": document.querySelector("input#name").value,
            "tags": [0],
            "favIconUrl" : favIconUrl
        };
    
        chrome.storage.local.set({"bookmarks" : data.bookmarks}, () => 
        {
            incrementTagsCount();   
            chrome.action.setIcon({ path: "assets/img/fav-16-full.png" });
        });
    })
}

function editBookmark()
{
    chrome.storage.local.get("bookmarks", (data) => 
    {
        data.bookmarks[url].title = document.querySelector("input#name").value;
        data.bookmarks[url].tags =  getSelectedTagsID();
    
        chrome.storage.local.set({"bookmarks" : data.bookmarks}, () => 
        {
            incrementTagsCount();   
        });
    })
    window.close();
}

function getSelectedTagsID()
{
    tagsID = [];

    for ([tagID, ] of selectedTags)
    {
        tagsID.push(tagID);
    }

    if (tagsID.length === 0)
    {
        tagsID.push(0);
        selectedTags.push([0, "Undefined"])
    }

    return tagsID;
}

function incrementTagsCount()
{
    chrome.storage.local.get("tagsList", (data) => 
    {
        for ([, tagName] of selectedTags)
        {
            data.tagsList[tagName].useCount++;
        }
    
        chrome.storage.local.set({"tagsList" : data.tagsList});
    })
}

function deleteBookmark() /* WIP */
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
    window.close();
}

function decrementTagsCount() /* WIP */
{
    chrome.storage.local.get("tagsList", (data) => 
    {
        for ([, tagName] of selectedTags)
        {
            data.tagsList[tagName].useCount--;
        }
    
        chrome.storage.local.set({"tagsList" : data.tagsList});
    })
}