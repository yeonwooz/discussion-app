// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = () => {
  // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  const ul = document.querySelector("ul.discussions__container");

  let data;

  const detectedUpdate = detectLocalStorageUpdate();
  if (detectedUpdate) {
    data = detectedUpdate;
  } else {
    const lastRendered = getItem("lastRendered");
    if (lastRendered) {
      data = JSON.parse(lastRendered);
    } else {
      data = agoraStatesDiscussions;
    }
  }

  setItem("lastRendered", JSON.stringify(data));
  ul.innerHTML = "";
  for (let i = 0; i < data.length; i += 1) {
    ul.append(convertToDiscussion(data[i]));
  }
  return;
};
