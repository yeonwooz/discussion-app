const username = document.querySelector("#username");
const title = document.querySelector("#title");
const story = document.querySelector("#story");
const submitButton = document.querySelector("#submit__button");

submitButton.addEventListener("click", submit);

function submit() {
  console.log("submit");
  const isoDate = new Date().toISOString();
  let updatedItems = getItem("updatedItems");
  if (updatedItems) {
    updatedItems = JSON.parse(updatedItems);
  } else {
    updatedItems = [];
  }

  updatedItems.unshift({
    author: username.value,
    createdAt: isoDate,
    title: title.value,
    story: story.value,
    avatarUrl: "https://picsum.photos/64/64",
  });
  setItem("updatedItems", JSON.stringify(updatedItems));
  console.log("updatedItems", updatedItems);
}
