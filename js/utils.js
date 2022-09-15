// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  let { author, avatarUrl, title, bodyHTML, id, createdAt, url, answer } = obj;
  title = obj.title || "제목 없음";
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // header info
  const headerInfoArea = document.createElement("div");
  const headerInfoLeft = document.createElement("div");
  const headerInfoRight = document.createElement("div");
  const headerInfoRightTop = document.createElement("div");

  const avatarWrapper = document.createElement("div");
  const userId = document.createElement("div");
  const discussionDate = document.createElement("time");
  const discussionTitle = document.createElement("h3");

  headerInfoRight.classList.add("header__info__right");
  headerInfoRightTop.classList.add("header__info__right--top");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerHTML = `<img class='discussion__avatar--img' src=${avatarUrl}  alt="user ${author}'s avatar">`;
  discussionDate.classList.add("discussion__date");
  discussionDate.textContent = convertDate(new Date(createdAt));
  userId.classList.add("user__id");
  userId.textContent = `${author}`;
  headerInfoArea.classList.add("header__info__area");
  discussionTitle.classList.add("discussion__title__wrapper");
  if (url) {
    discussionTitle.innerHTML = `
      <div class="discussion__title">
        <h2 class="discussion__title--text">${title}</h2>
        <a class="discussion__link" href=${url}>게시글로 이동</a>
      </div>`;
  } else {
    discussionTitle.innerHTML = `
      <div class="discussion__title">
        <div class="discussion__title--text">${title}</div>
      </div>`;
  }

  headerInfoLeft.append(avatarWrapper);
  headerInfoRightTop.append(userId, discussionDate);
  headerInfoRight.append(headerInfoRightTop, discussionTitle);
  headerInfoArea.append(headerInfoLeft, headerInfoRight);

  const spreadButton = document.createElement("button");
  spreadButton.innerHTML = "<div>...</div>";

  if (bodyHTML) {
    spreadButton.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
    const toggleSpreadButton = (function (id) {
      let spread = false;

      return function () {
        spread = !spread;
        if (spread) {
          spreadButton.innerHTML = `<i class="fa-solid fa-caret-down"></i>`;
          li.append(bottomArea);
        } else {
          spreadButton.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
          li.removeChild(bottomArea);
        }
      };
    })();

    spreadButton.addEventListener("click", toggleSpreadButton.bind(null, id));

    spreadButton.classList.add("spread__button");
    headerInfoArea.append(spreadButton);
  }

  // question
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.innerHTML = `${bodyHTML}`;

  // answer
  const discussionAnswered = document.createElement("div");

  if (answer) {
    discussionAnswered.className = "discussion__answered";
    discussionAnswered.appendChild(convertToDiscussion(answer));
  }

  const bottomArea = document.createElement("div");
  bottomArea.append(discussionContent, discussionAnswered);

  li.append(headerInfoArea);
  return li;
};

function convertDate(fullDate) {
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();
  const hour = fullDate.getHours();
  const min = fullDate.getMinutes();
  const sec = fullDate.getSeconds();

  return `${year}년 ${month}월 ${date}일 ${hour}시 ${min}분에 작성`;
}
