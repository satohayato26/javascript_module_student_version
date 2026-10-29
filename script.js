const users = [
  {
    id: 1,
    name: "山田 太郎",
    role: "フロントエンドエンジニア",
    description: "UI実装とアクセシビリティ改善が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "佐藤 花子",
    role: "バックエンドエンジニア",
    description: "API設計とデータベース設計を担当しています。",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "鈴木 健",
    role: "デザイナー",
    description: "情報設計とデザインシステム構築が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "高橋 美咲",
    role: "QAエンジニア",
    description: "テスト設計と品質改善を推進しています。",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "伊藤 翔",
    role: "フロントエンドエンジニア",
    description: "JavaScriptのパフォーマンス改善が得意です。",
    imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "中村 葵",
    role: "プロジェクトマネージャー",
    description: "進行管理とチーム連携の最適化を担当しています。",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80"
  }
];

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultCountElement = document.querySelector("#resultCount");
const emptyMessageElement = document.querySelector("#emptyMessage");
const cardListElement = document.querySelector("#cardList");
const profileCardTemplate = document.querySelector("#profileCardTemplate");

function updateResultCount(count) {
  resultCountElement.textContent = `${count}件表示`;
}


function toggleEmptyMessage(shouldShow) {
  emptyMessageElement.classList.toggle("is-hidden", !shouldShow);
}


function createCard(user) {

  const cardFragment = profileCardTemplate.content.cloneNode(true);
  const imageElement = cardFragment.querySelector(".profile-image");
  const roleElement = cardFragment.querySelector(".profile-role");
  const nameElement = cardFragment.querySelector(".profile-name");
  const descriptionElement = cardFragment.querySelector(".profile-description");

  imageElement.src = user.imageUrl;
  imageElement.alt = `${user.name}のプロフィール画像`;
  roleElement.textContent = user.role;
  nameElement.textContent = user.name;
  descriptionElement.textContent = user.description;

  return cardFragment;
}


function renderCards(userList) {

  cardListElement.innerHTML = "";

  userList.forEach((user) => {
    const card = createCard(user);
    cardListElement.appendChild(card);
  });


  updateResultCount(userList.length);
  toggleEmptyMessage(userList.length === 0);
}


function filterUsers(keyword) {

  const normalizedKeyword = keyword.trim().toLowerCase();

  if (normalizedKeyword === "") {
    return users;
  }

  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(normalizedKeyword) ||
      user.role.toLowerCase().includes(normalizedKeyword)
    );
  });
}


function handleSearch() {

  const keyword = searchInput.value;

  const filteredUsers = filterUsers(keyword);
  renderCards(filteredUsers);
}


searchButton.addEventListener("click", handleSearch);
renderCards(users);