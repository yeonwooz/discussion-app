const username = document.querySelector("#username");
const title = document.querySelector("#title");
const story = document.querySelector("#story");
const submitButton = document.querySelector("#submit__button");

submitButton.addEventListener("click", submit);

function submit() {
  if (!username.value) {
    alert("이름은 필수입니다.");
    return;
  }

  if (!title.value) {
    alert("제목을 적어주세요.");
    return;
  }

  if (!story.value) {
    alert("질문할 내용을 적어주세요.");
    return;
  }

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
  render();
  removeItem("updatedItems");
  username.value = "";
  title.value = "";
  story.value = "";
}
