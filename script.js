// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const { author, avatarUrl, bodyHTML, createdAt, id, title, url, answer } =
    obj;
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // userInfo
  const avatarWrapper = document.createElement("div");
  const userId = document.createElement("div");
  const userInfoArea = document.createElement("div");
  const discussionDate = document.createElement("time");

  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerHTML = `<img class='discussion__avatar--img' src=${avatarUrl}  alt="user ${author}'s avatar">`;
  discussionDate.classList.add('discussion__date');
  discussionDate.textContent = `${createdAt}`;
  userId.textContent = `${id}`;
  userInfoArea.classList.add("user__info__area");
  userInfoArea.append(avatarWrapper, userId, discussionDate);

  // question
  const discussionContent = document.createElement("div");
  const discussionTitle = document.createElement("h3");
  discussionContent.className = "discussion__content";
  discussionTitle.innerHTML = `<a href=${url}>${title}</a>`;
  discussionContent.innerHTML = `${bodyHTML}`;

  // answer
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  if (answer) {
    discussionAnswered.appendChild(convertToDiscussion(answer));
  }

  li.append(
    userInfoArea,
    discussionTitle,
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
