// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const { author, avatarUrl, bodyHTML, createdAt, id, title, url, answer } =
    obj;
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // custom
  const discussionTitle = document.createElement("h3");
  const discussionDate = document.createElement("time");
  const userId = document.createElement("div");

  // TODO: 레이아웃 지정

  avatarWrapper.innerHTML = `<img class='discussion__avatar--img' src=${avatarUrl}  alt="user ${author}'s avatar">`;
  userId.textContent = `${id}`;

  discussionTitle.innerHTML = `<a href=${url}>${title}</a>`;
  discussionDate.textContent = `${createdAt}`;
  discussionContent.innerHTML = `${bodyHTML}`;
  if (answer) {
    discussionAnswered.appendChild(convertToDiscussion(answer));
  }

  li.append(
    avatarWrapper,
    userId,
    discussionTitle,
    discussionDate,
    discussionContent,
    discussionAnswered
  );
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
