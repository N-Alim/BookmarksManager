function getTagsAsButtons()
{
    const tagsContainer = document.querySelector("aside.tagsMain");

    const tags = JSON.parse(localStorage.getItem("tags"));

    for (let cnt = 0; cnt < tags.length; cnt++) {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.innerText = Object.keys(tags[cnt])[0];

        tag.addEventListener("click", () => {
            this.classList.toggle("selected");
        })

        tagsContainer.appendChild(tag);    
    }
}

function getTagsAsOptions()
{
    let tagsSelect = document.querySelector("select#tags");
    const tags = JSON.parse(localStorage.getItem("tags"));

    for (let cnt = 0; cnt < tags.length; cnt++) 
    {
        const option = document.createElement("option");
        option.value =  cnt;
        option.innerText = Object.keys(tags[cnt])[0];
        tagsSelect.appendChild(option);
    }
}

function addTag()
{
    const tagValue = parseInt(document.querySelector('select#tags').value);
    
    selectedTags.push(tagValue);

    const tagsContainer = document.querySelector("div.tagsMain");

    document.querySelector('select#tags').removeChild(document.querySelector("option[value='" + tagValue + "']"));

    const tags = JSON.parse(localStorage.getItem("tags"));

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerText = Object.keys(tags[tagValue])[0];

    tag.appendChild(createCross());

    tagsContainer.appendChild(tag);
}

function removeTag()
{
    
}

function createCross()
{
    const crossButton = document.createElement("div");
    crossButton.className = "cross-button";
    crossButton.addEventListener("click", removeTag())
    
    const crossTop = document.createElement("div");
    crossTop.className = "cross-top";    
    
    const crossBottom = document.createElement("div");
    crossBottom.className = "cross-bottom";
    
    crossButton.appendChild(crossTop);
    crossButton.appendChild(crossBottom);

    return crossButton;
}
