let url;
let selectedTags = [];

document.querySelector("select#tags").addEventListener("change", addTag);
document.querySelector("select#tags").addEventListener("focus", () =>
{
    document.querySelector("select#tags").value=-1;
    document.querySelector("select#tags").blur();
});

document.querySelector("button.confirm").addEventListener("click", addBookmark);

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

    // let value = JSON.stringify({"url": tabs[0].url, "title": tabs[0].title});
    // localStorage.setItem("greetings", value);

    // let results = localStorage.getItem("greetings");
    // document.querySelector("input#name").value = JSON.parse(results).title;
    // document.querySelector(".test").innerText = JSON.parse(results).url;

    // localStorage.setItem("tags", JSON.stringify([{"C": 0}, {"C++": 0}, {"Design": 0}]));

    getTagsAsOptions();

    document.querySelector("input#name").value = tabs[0].title;
    url = tabs[0].url;

    // Affecter les valeurs au moment de la validation, pas avant

});
