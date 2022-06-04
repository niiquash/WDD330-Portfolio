let orderedList = document.querySelector("ol");

const links = [
    {
        label: "Week-1",
        url: "week1/index.html"
    },
    {
        label: "Week-2",
        url: "week2/index.html"
    },
    {
        label: "Week-3",
        url: "week3/index.html"
    },
    {
        label: "Week-4",
        url: "week4/index.html"
    },
    {
        label: "Week-5",
        url: "week5/index.html"
    },
    {
        label: "Week-6",
        url: "week6/index.html"
    },
    {
        label: "Week-7",
        url: "week7/index.html"
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