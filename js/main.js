let orderedList = document.querySelector("ol");

const links = [
    {
        label: "Week-1",
        url: "week1/index.html"
    },
    {
        label: "Week-2",
        url: "week2/index.html"
    }
]

links.forEach((item) => {
    console.log(item["label"]);
    const listItem = document.createElement("li");
    const itemLink = document.createElement("a");

    itemLink.setAttribute('href', item['url']);
    itemLink.innerHTML = item['label']

    listItem.appendChild(itemLink);

    orderedList.appendChild(listItem);
})