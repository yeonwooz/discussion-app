let queryString = document.location.search?.slice(1);
const { pathname } = document.location;

const pagination = document.querySelector(".pagination");
let data = "";
function loadData() {
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
}

function showPagination() {
  pagination.innerHTML = "";
  const cnts = Math.ceil(data.length / 10);

  for (let i = 0; i < cnts; ++i) {
    const num = document.createElement("button");
    num.textContent = i + 1;
    num.classList.add("page");
    pagination.append(num);

    num.addEventListener("click", routePage.bind(null, i + 1));
  }
  // pagination.innerHTML
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = () => {
  loadData();
  showPagination();

  // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  const ul = document.querySelector("ul.discussions__container");
  const currentPageNumber = !queryString
    ? 1
    : Number(queryString.split("=")[1]);
  let from = (currentPageNumber - 1) * 10;
  let to = currentPageNumber * 10 - 1;

  ul.innerHTML = "";

  for (let i = from; i < data.length && i < to; i++) {
    ul.append(convertToDiscussion(data[i]));
  }
  if (data.length > 1) {
    setItem("lastRendered", JSON.stringify(data));
  }
  return;
};

function routePage(targetPageNumber) {
  // if (targetPageNumber === 1) {
  //   document.location.pathname = "/";
  // } else {
  //   document.location.pathname = targetPageNumber.toString();
  // }
  let currentPageNumber =
    !queryString || pathname === "/index.html"
      ? 1
      : Number(queryString.split("=")[1]);

  if (currentPageNumber === targetPageNumber) return;

  document.location.href =
    document.location.origin + `?page=${targetPageNumber}`;

  // document.location.search = `?page=${targetPageNumber}`;
}
