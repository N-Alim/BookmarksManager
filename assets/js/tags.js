function getTagsAsButtons()
{
    const tagsContainer = document.querySelector("aside.tagsMain");

    let tagsList = Object.entries(JSON.parse(localStorage.getItem("tagsList")));
    tagsList = tagsList.sort(function(first, second) 
    { 
        if (first[0] < second[0]) 
            return -1;
        
        if (first[0] > second[0]) 
            return 1;
        
        return 0;
    });
    
    for (const [key, ] of tagsList) 
    {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = key;

        tag.addEventListener("click", (event) => 
        {
            event.target.classList.toggle("selected");
        })
        console.log(tag);
        tagsContainer.appendChild(tag);  
    }
}

function getTagsAsOptions()
{
    const tagsSelect = document.querySelector("select#tags");
    let tagsList = Object.entries(JSON.parse(localStorage.getItem("tagsList")));
    tagsList = tagsList.sort(function(first, second) 
    { 
        if (first[0] < second[0]) 
            return -1;
        
        if (first[0] > second[0]) 
            return 1;
        
        return 0;
    });

    const filledTagsSelect = createTagsSelect();

    for (const [key, value] of tagsList) 
    {
        if (!isTagSelected(key))
        {
            const option = document.createElement("option");
            option.value =  value.id;
            option.innerText = key;
            filledTagsSelect.appendChild(option);
        }
    }

    tagsSelect.replaceWith(filledTagsSelect);
}

function createTagsSelect()
{
    const filledTagsSelect = document.createElement("select");
    filledTagsSelect.range="tags";
    filledTagsSelect.id="tags";
    filledTagsSelect.name="tags";

    filledTagsSelect.addEventListener("change", function(){addTag(this)});
    filledTagsSelect.addEventListener("focus", (event) =>
    {
        event.target.value=-1;
        event.target.blur();
    });

    return filledTagsSelect;
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

function removeTag(cross)
{
    const tag = cross.parentElement;

    tag.parentElement.removeChild(tag);
    selectedTags = selectedTags.filter(function(element) { return element[1] !== tag.innerText });

    getTagsAsOptions();
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
