function getTagsAsButtons()
{
    const tagsContainer = document.querySelector("aside.tagsMain");

    const tagsList = JSON.parse(localStorage.getItem("tagsList"));

    for (const key of Object.keys(tagsList)) 
    {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = key;

        tag.addEventListener("click", () => 
        {
            this.classList.toggle("selected");
        })

        tagsContainer.appendChild(tag);  
   }
}

function getTagsAsOptions()
{
    let tagsSelect = document.querySelector("select#tags");
    const tagsList = JSON.parse(localStorage.getItem("tagsList"));

    // unselectedTags = tagsList.filter(function(selectedTags) { return selectedTags.includes(Object.keys(tagsList[tagId])[0]) })

    for (const [key, value] of Object.entries(tagsList)) 
    {
        const option = document.createElement("option");
        option.value =  value.id;
        option.innerText = key;
        tagsSelect.appendChild(option);
    }
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

function removeTag()
{

}

function createCross()
{
    const crossButton = document.createElement("div");
    crossButton.className = "cross-button";
    crossButton.addEventListener("click", function(){ removeTag(); });
    
    const crossTop = document.createElement("div");
    crossTop.className = "cross-top";    
    
    const crossBottom = document.createElement("div");
    crossBottom.className = "cross-bottom";
    
    crossButton.appendChild(crossTop);
    crossButton.appendChild(crossBottom);

    return crossButton;
}
