const { localStorage } = window;

function setItem(key, value) {
  if (typeof key !== "string") {
    key = JSON.stringify(key);
  }

  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }

  localStorage.setItem(key, value);
}

function getItem(key) {
  return localStorage.getItem(key);
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}
function detectLocalStorageUpdate() {
  console.log("detecting");
  if (!getItem("updatedItems")) {
    return false;
  }
  console.log("updated detected");

  let prevData;
  const lastRendered = getItem("lastRendered");

  if (lastRendered) {
    prevData = JSON.parse(lastRendered);
  } else {
    prevData = agoraStatesDiscussions;
  }

  const updatedItems = JSON.parse(getItem("updatedItems"));

  for (let item of updatedItems) {
    prevData.unshift({
      // id?
      author: item?.author || "작성자 정보 없음",
      createdAt: item?.createdAt || "날짜 기록 없음",
      title: item?.title || "제목 없음",
      bodyHTML: `<div>${item?.story || ""}</div>`,
      avatarUrl: item?.avatarUrl,
    });
  }
  return prevData;
}
