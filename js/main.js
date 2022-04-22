let orderedList = document.querySelector("ol");

const links = [
    {label: "Week1 notes",
     url: "week1/index.html"}
]

links.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.appendChild(item);
})