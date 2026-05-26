// ═══ 통합 네비게이션 (nav.js) ═══
// 모든 페이지에서 공유하는 최상단 네비게이션 바
(function() {

// ─── 현재 페이지 감지 ───
const currentPath = location.pathname;
const isHome = currentPath === '/' || currentPath === '/index.html';
const isCommunity = currentPath === '/community' || currentPath === '/community.html';

// ─── CSS 주입 ───
const navStyle = document.createElement('style');
navStyle.textContent = `
/* ═══ NAV ═══ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: rgba(255,255,255,0.92); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--gray-200); transition: box-shadow 0.3s;
}
.nav.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 64px;
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 20px; color: var(--navy);
  text-decoration: none; letter-spacing: -0.5px;
}
.nav-logo .logo-icon {
  width: 36px; height: 36px; background: var(--orange);
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 15px; font-weight: 900; letter-spacing: -1px;
}
.nav-links { display: flex; gap: 8px; align-items: center; }
.nav-links a {
  text-decoration: none; color: var(--gray-600);
  font-size: 14px; font-weight: 600; padding: 8px 14px;
  border-radius: var(--radius-sm); transition: all 0.2s;
}
.nav-links a:hover { color: var(--navy); background: var(--gray-100); }
.nav-links a.active { color: var(--orange); background: var(--orange-light); }
.btn-write-review {
  background: var(--orange); color: white !important;
  padding: 8px 18px !important; border-radius: var(--radius-sm) !important;
  font-weight: 700 !important; font-size: 14px !important;
  transition: all 0.2s !important; border: none; cursor: pointer;
  text-decoration: none;
}
.btn-write-review:hover { background: var(--orange-hover) !important; transform: translateY(-1px); }
.nav-login-btn {
  display: flex; align-items: center; gap: 6px; padding: 7px 16px;
  border-radius: 20px; border: 1.5px solid var(--gray-200); background: white;
  font-size: 13px; font-weight: 700; color: var(--navy); cursor: pointer;
  font-family: inherit; transition: all 0.2s;
}
.nav-login-btn:hover { border-color: var(--orange); background: var(--orange-light); color: var(--orange); }
.nav-login-btn svg { width: 16px; height: 16px; }
.nav-profile {
  position: relative; display: none; align-items: center; gap: 8px;
  cursor: pointer; padding: 4px 10px 4px 4px; border-radius: 20px;
  border: 1.5px solid var(--gray-200); background: white; transition: all 0.2s;
}
.nav-profile:hover { border-color: var(--orange); background: var(--orange-light); }
.nav-profile.show { display: flex; }
.nav-profile-img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
.nav-profile-name { font-size: 13px; font-weight: 700; color: var(--navy); max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.nav-profile-dropdown {
  display: none; position: absolute; top: calc(100% + 8px); right: 0;
  background: white; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border: 1px solid var(--gray-200); min-width: 220px; overflow: hidden; z-index: 1001;
}
.nav-profile-dropdown.open { display: block; }
.nav-profile-dropdown-header {
  padding: 16px; border-bottom: 1px solid var(--gray-100);
  display: flex; align-items: center; gap: 12px;
}
.nav-profile-dropdown-header img { width: 40px; height: 40px; border-radius: 50%; }
.nav-profile-dropdown-info { display: flex; flex-direction: column; }
.nav-profile-dropdown-name { font-size: 14px; font-weight: 700; color: var(--navy); }
.nav-profile-dropdown-email { font-size: 12px; color: var(--gray-400); }
.nav-profile-dropdown a, .nav-profile-dropdown button {
  display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 16px;
  font-size: 14px; font-weight: 600; color: var(--gray-600); background: none;
  border: none; text-decoration: none; cursor: pointer; font-family: inherit; transition: background 0.2s;
}
.nav-profile-dropdown a:hover, .nav-profile-dropdown button:hover { background: var(--gray-50); color: var(--navy); }
.nav-profile-dropdown .dropdown-icon { font-size: 16px; width: 20px; text-align: center; }
.nav-profile-dropdown .logout-btn { color: #EF4444; border-top: 1px solid var(--gray-100); }
.nav-profile-dropdown .logout-btn:hover { background: #FEF2F2; }
.nav-notif-badge {
  position: absolute; top: -2px; right: -4px; min-width: 16px; height: 16px;
  background: #EF4444; color: white; font-size: 9px; font-weight: 700;
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  padding: 0 3px; pointer-events: none;
}
.notif-dropdown {
  display: none; position: absolute; top: calc(100% + 8px); right: 0;
  background: white; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border: 1px solid var(--gray-200); min-width: 280px; max-height: 350px;
  overflow-y: auto; z-index: 1001;
}
.notif-dropdown.open { display: block; }
.notif-dropdown-header { padding: 12px 16px; border-bottom: 1px solid var(--gray-100); font-size: 14px; font-weight: 800; color: var(--navy); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: white; z-index: 1; }
.notif-dropdown-header button { background: none; border: none; font-size: 12px; color: var(--gray-400); cursor: pointer; font-family: inherit; }
.notif-close-btn { background: none; border: none; font-size: 16px; cursor: pointer; color: var(--gray-400); padding: 0 2px; margin-left: 8px; }
.notif-close-btn:hover { color: var(--navy); }
.notif-item { padding: 10px 16px; border-bottom: 1px solid var(--gray-50); cursor: pointer; transition: background 0.2s; }
.notif-item:hover { background: var(--gray-50); }
.notif-item.unread { background: #FFF7ED; }
.notif-item-text { font-size: 13px; color: var(--gray-600); line-height: 1.4; }
.notif-item-time { font-size: 11px; color: var(--gray-400); margin-top: 2px; }
.notif-empty { padding: 30px 16px; text-align: center; color: var(--gray-400); font-size: 13px; }
/* 마이페이지 모달 */
.mypage-overlay {
  display: none; position: fixed; inset: 0; z-index: 2000;
  background: rgba(0,0,0,0.5); justify-content: center; align-items: flex-start;
  padding-top: 80px;
}
.mypage-overlay.open { display: flex; }
.mypage-modal {
  background: white; border-radius: 16px; width: 100%; max-width: 600px;
  max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}
.mypage-header {
  padding: 24px; border-bottom: 1px solid var(--gray-100);
  display: flex; align-items: center; justify-content: space-between;
}
.mypage-header h2 { font-size: 18px; font-weight: 800; color: var(--navy); }
.mypage-close { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--gray-400); }
.mypage-user {
  display: flex; align-items: center; gap: 16px; padding: 24px;
  background: var(--gray-50); border-bottom: 1px solid var(--gray-100);
}
.mypage-user img { width: 56px; height: 56px; border-radius: 50%; }
.mypage-user-name { font-size: 18px; font-weight: 800; color: var(--navy); }
.mypage-user-email { font-size: 13px; color: var(--gray-400); margin-top: 2px; }
.mypage-section { padding: 20px 24px; }
.mypage-section-title { font-size: 15px; font-weight: 800; color: var(--navy); margin-bottom: 12px; }
.mypage-review-item {
  padding: 14px; margin-bottom: 10px; border-radius: 10px;
  border: 1px solid var(--gray-200); background: white;
}
.mypage-review-meta { font-size: 12px; color: var(--gray-400); margin-bottom: 6px; }
.mypage-review-text { font-size: 14px; color: var(--gray-600); line-height: 1.5; }
.mypage-empty { text-align: center; padding: 40px 20px; color: var(--gray-400); font-size: 14px; }
.mypage-nickname-tag { display: inline-block; background: var(--orange-light); color: var(--orange); font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 6px; margin-left: 8px; }
.mypage-review-item.clickable { cursor: pointer; transition: all 0.2s; }
.mypage-review-item.clickable:hover { border-color: var(--orange); background: var(--orange-light); }
/* 모바일 메뉴 */
.mobile-menu-btn {
  display: none; background: none; border: none; font-size: 24px;
  cursor: pointer; color: var(--navy); padding: 4px;
}
.mobile-nav-overlay {
  display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 2000; opacity: 0; transition: opacity 0.3s;
}
.mobile-nav-overlay.open { display: block; opacity: 1; }
.mobile-nav-drawer {
  position: fixed; top: 0; right: -280px; width: 280px; height: 100%;
  background: white; z-index: 2001; padding: 24px;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1); transition: right 0.3s;
  overflow-y: auto;
}
.mobile-nav-drawer.open { right: 0; }
.mobile-nav-close {
  position: absolute; top: 16px; right: 16px; background: var(--gray-100);
  border: none; width: 32px; height: 32px; border-radius: 50%;
  font-size: 16px; cursor: pointer; display: flex; align-items: center;
  justify-content: center; color: var(--gray-600); transition: background 0.2s;
}
.mobile-nav-close:hover { background: var(--gray-200); }
.mobile-nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 18px; color: var(--navy);
  margin-bottom: 24px;
}
.mobile-nav-logo .logo-icon {
  width: 30px; height: 30px; background: var(--orange);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 13px; font-weight: 900; letter-spacing: -1px;
}
.mobile-nav-links { display: flex; flex-direction: column; gap: 4px; }
.mobile-nav-links a {
  display: flex; align-items: center; gap: 12px; padding: 12px 16px;
  text-decoration: none; color: var(--gray-600); font-size: 15px; font-weight: 600;
  border-radius: 10px; transition: all 0.2s;
}
.mobile-nav-links a:hover { background: var(--gray-100); color: var(--navy); }
.mobile-nav-links a.active { background: var(--orange-light); color: var(--orange); }
.mobile-nav-links .nav-icon { font-size: 18px; width: 24px; text-align: center; }
.mobile-nav-write {
  display: block; text-align: center; padding: 14px; margin-top: 16px;
  background: var(--orange); color: white; text-decoration: none;
  border-radius: 12px; font-weight: 700; font-size: 15px; transition: background 0.2s;
}
.mobile-nav-write:hover { background: var(--orange-hover); }
@media (max-width: 768px) {
  .nav-links a { display: none; }
  .btn-write-review { display: none !important; }
  .mobile-menu-btn { display: block; }
  .nav-profile-name { display: none; }
  .mypage-modal { margin: 16px; max-height: 85vh; }
  .mypage-overlay { padding-top: 20px; align-items: center; }
}
/* ═══ WELCOME POPUP ═══ */
.welcome-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
  z-index: 10000; display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s; pointer-events: none;
}
.welcome-overlay.open { opacity: 1; pointer-events: auto; }
.welcome-box {
  background: white; border-radius: 20px; padding: 36px 32px 28px;
  max-width: 440px; width: calc(100% - 32px); box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  text-align: center; animation: welcomePop 0.35s ease;
}
@keyframes welcomePop { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
.welcome-icon { font-size: 48px; margin-bottom: 12px; }
.welcome-title { font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 16px; line-height: 1.4; }
.welcome-desc { font-size: 14px; color: var(--gray-600); line-height: 1.8; margin-bottom: 8px; text-align: left; }
.welcome-highlight {
  background: linear-gradient(135deg, #FFF7ED, #FEF3C7); border-radius: 12px;
  padding: 16px; margin: 16px 0; text-align: left;
}
.welcome-highlight p { font-size: 13px; color: var(--gray-700); margin: 6px 0; line-height: 1.6; }
.welcome-highlight p:first-child { font-weight: 700; color: var(--navy); font-size: 14px; margin-bottom: 10px; }
.welcome-noshow {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin: 18px 0 14px; cursor: pointer; font-size: 13px; color: var(--gray-500);
}
.welcome-noshow input { cursor: pointer; accent-color: var(--orange); width: 16px; height: 16px; }
.welcome-btn {
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: var(--navy); color: white; font-size: 15px; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: background 0.2s;
}
.welcome-btn:hover { background: #0F172A; }
@media (max-width: 768px) {
  .welcome-box { padding: 28px 20px 24px; }
  .welcome-title { font-size: 18px; }
}
`;
document.head.appendChild(navStyle);

// ─── 페이지별 쓰기 버튼 설정 ───
const writeBtn = isHome
  ? '<a href="#" onclick="openReviewModal(); return false;" class="btn-write-review">&#x270F;&#xFE0F; &#xB9AC;&#xBDF0; &#xC4F0;&#xAE30;</a>'
  : isCommunity
    ? '<a href="#" onclick="openWriteModal(); return false;" class="btn-write-review">&#x270F;&#xFE0F; &#xAE00;&#xC4F0;&#xAE30;</a>'
    : '';
const dropdownWriteLabel = isHome ? '리뷰 쓰기' : '글쓰기';
const dropdownWriteAction = isHome
  ? 'openReviewModal(); closeProfileDropdown(); return false;'
  : 'openWriteModal(); closeProfileDropdown(); return false;';
const mobileWriteLabel = isHome ? '&#x270F;&#xFE0F; 리뷰 쓰기' : '&#x270F;&#xFE0F; 글쓰기';
const mobileWriteAction = isHome
  ? 'closeMobileNav(); openReviewModal(); return false;'
  : 'closeMobileNav(); openWriteModal(); return false;';

// ─── 메뉴 active 상태 ───
function activeClass(path) {
  if (path === '/community') return isCommunity ? ' class="active"' : '';
  if (path === '#rankings') return isHome ? ' class="active"' : '';
  return '';
}

const googleSvg = '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>';

// ─── NAV HTML ───
const rankLink = isHome ? '#rankings' : '/#rankings';
const platLink = isHome ? '#platforms' : '/#platforms';
const detLink = isHome ? '#detector' : '/#detector';

const navHTML = `
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <div class="logo-icon">82</div>
      팔이피플
    </a>
    <div class="nav-links">
      <a href="${rankLink}"${isHome ? ' class="active"' : ''}>랭킹</a>
      <a href="${platLink}">플랫폼</a>
      <a href="${detLink}">감별기</a>
      <a href="/community"${isCommunity ? ' class="active"' : ''}>커뮤니티</a>
      <a href="/admin" id="navAdminLink" style="font-size:12px;color:var(--gray-400);display:none">관리자</a>
      ${writeBtn}
      <button class="nav-login-btn" id="navLoginBtn" onclick="navGoogleLogin()">${googleSvg} 로그인</button>
      <div class="nav-profile" id="navProfile" onclick="toggleProfileDropdown(event)" style="position:relative">
        <img class="nav-profile-img" id="navProfileImg" src="" alt="">
        <span class="nav-notif-badge" id="bellBadge" style="display:none">0</span>
        <span class="nav-profile-name" id="navProfileName"></span>
        <div class="nav-profile-dropdown" id="profileDropdown">
          <div class="nav-profile-dropdown-header">
            <img id="dropdownProfileImg" src="" alt="">
            <div class="nav-profile-dropdown-info">
              <div class="nav-profile-dropdown-name" id="dropdownName"></div>
              <div class="nav-profile-dropdown-email" id="dropdownEmail"></div>
            </div>
          </div>
          <a href="#" onclick="openMyPage(); return false;"><span class="dropdown-icon">👤</span> 마이페이지</a>
          <a href="#" onclick="toggleNotifPanel(); return false;"><span class="dropdown-icon">🔔</span> 알림 <span id="notifCountInline" style="color:#EF4444;font-weight:700;font-size:12px"></span></a>
          <a href="#" onclick="${dropdownWriteAction}"><span class="dropdown-icon">✏️</span> ${dropdownWriteLabel}</a>
          <a href="#" id="instructorVerifyLink" onclick="openInstructorVerifyModal(); closeProfileDropdown(); return false;" style="display:none"><span class="dropdown-icon">🎓</span> 강사 인증 신청</a>
          <button class="logout-btn" onclick="logoutUser()"><span class="dropdown-icon">🚪</span> 로그아웃</button>
        </div>
        <div class="notif-dropdown" id="notifDropdown">
          <div class="notif-dropdown-header"><span>알림</span> <div><button onclick="clearNotifs()">모두 읽음</button><button class="notif-close-btn" onclick="closeNotifDropdown()" title="닫기">✕</button></div></div>
          <div id="notifList"><div class="notif-empty">알림이 없습니다.</div></div>
        </div>
      </div>
      <button class="mobile-menu-btn" onclick="openMobileNav()">☰</button>
    </div>
  </div>
</nav>
`;

// ─── 모바일 메뉴 HTML ───
const mobileHTML = `
<div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="closeMobileNav()"></div>
<div class="mobile-nav-drawer" id="mobileNavDrawer">
  <button class="mobile-nav-close" onclick="closeMobileNav()">✕</button>
  <div class="mobile-nav-logo"><div class="logo-icon">82</div> 팔이피플</div>
  <div class="mobile-nav-links">
    <a href="/"${isHome ? ' class="active"' : ''} onclick="closeMobileNav()"><span class="nav-icon">🏠</span> 홈</a>
    <a href="${rankLink}" onclick="closeMobileNav()"><span class="nav-icon">🏆</span> 분야별 랭킹</a>
    <a href="${platLink}" onclick="closeMobileNav()"><span class="nav-icon">🏢</span> 플랫폼 신뢰지수</a>
    <a href="${detLink}" onclick="closeMobileNav()"><span class="nav-icon">🚨</span> 강의팔이 감별기</a>
    <a href="/community"${isCommunity ? ' class="active"' : ''}><span class="nav-icon">💬</span> 커뮤니티</a>
    <a href="/admin" id="mobileAdminLink" style="display:none"><span class="nav-icon">⚙️</span> 관리자</a>
  </div>
  <a href="#" class="mobile-nav-write" onclick="${mobileWriteAction}">${mobileWriteLabel}</a>
</div>
`;

// ─── 마이페이지 모달 HTML ───
const mypageHTML = `
<div class="mypage-overlay" id="mypageOverlay" onclick="if(event.target===this)closeMyPage()">
  <div class="mypage-modal">
    <div class="mypage-header">
      <h2>마이페이지</h2>
      <button class="mypage-close" onclick="closeMyPage()">&times;</button>
    </div>
    <div class="mypage-user" id="mypageUser"></div>
    <div class="mypage-section">
      <div class="mypage-section-title">✏️ 닉네임 설정</div>
      <div style="display:flex;gap:8px;align-items:center">
        <input type="text" id="nicknameInput" placeholder="닉네임을 입력하세요" style="flex:1;padding:10px 14px;border:1.5px solid var(--gray-200);border-radius:10px;font-size:14px;font-family:inherit;outline:none;transition:border 0.2s" onfocus="this.style.borderColor='var(--orange)'" onblur="this.style.borderColor='var(--gray-200)'">
        <button onclick="saveNickname()" style="padding:10px 20px;border-radius:10px;background:var(--orange);color:white;border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap">저장</button>
      </div>
      <div id="nicknameSaved" style="display:none;margin-top:8px;font-size:13px;color:var(--green);font-weight:600">닉네임이 저장되었습니다!</div>
    </div>
    <div class="mypage-section">
      <div class="mypage-section-title">📝 내가 쓴 글</div>
      <div id="mypageReviews"></div>
    </div>
    <div class="mypage-section">
      <div class="mypage-section-title">💬 내가 쓴 댓글</div>
      <div id="mypageComments"></div>
    </div>
  </div>
</div>
`;

// ─── DOM에 삽입 ───
const navTarget = document.getElementById('navPlaceholder');
if (navTarget) {
  navTarget.outerHTML = navHTML + mobileHTML + mypageHTML;
} else {
  document.body.insertAdjacentHTML('afterbegin', navHTML + mobileHTML + mypageHTML);
}

// ─── Firebase 초기화 (공유) ───
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAEmmwEmFAizI2mGFV2DwkIwU_4dAVMJno",
    authDomain: "people-8a88a.firebaseapp.com",
    projectId: "people-8a88a",
    storageBucket: "people-8a88a.firebasestorage.app",
    messagingSenderId: "272453703283",
    appId: "1:272453703283:web:3f84237ac3f25742473c06",
    measurementId: "G-YGVFDXM9HM"
  });
}
const db = firebase.firestore();
window.db = db;
window.currentUser = null;
window.isAdmin = false;
const ADMIN_EMAIL = 'boxtvstar@gmail.com';

// ─── Auth ───
firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    currentUser = { uid: user.uid, name: user.displayName, email: user.email, picture: user.photoURL, nickname: '', isInstructor: false, instructorName: '', instructorId: null };
    isAdmin = (user.email === ADMIN_EMAIL);
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        const d = doc.data();
        if (d.nickname) currentUser.nickname = d.nickname;
        if (d.role === 'admin') isAdmin = true;
        if (d.isInstructor) {
          currentUser.isInstructor = true;
          currentUser.instructorName = d.instructorName || '';
          currentUser.instructorId = d.instructorId || null;
        }
      }
      const updateData = { email: user.email, displayName: user.displayName, photoURL: user.photoURL, nickname: currentUser.nickname || '', lastLogin: firebase.firestore.FieldValue.serverTimestamp() };
      if (user.email === ADMIN_EMAIL) updateData.role = 'admin';
      await db.collection('users').doc(user.uid).set(updateData, { merge: true });
    } catch(e) { console.log('Firestore:', e); }
    localStorage.setItem('cachedUser', JSON.stringify(currentUser));
    showNavProfile();
    document.getElementById('navAdminLink').style.display = isAdmin ? '' : 'none';
    document.getElementById('mobileAdminLink').style.display = isAdmin ? '' : 'none';
    // 강사 인증 신청 링크: 이미 인증된 강사면 숨김
    const ivLink = document.getElementById('instructorVerifyLink');
    if (ivLink) ivLink.style.display = currentUser.isInstructor ? 'none' : '';
    // 환영 팝업
    if (!localStorage.getItem('welcomeDismissed')) showWelcomePopup();
    // 페이지별 로그인 후 콜백
    if (typeof window.onNavLogin === 'function') window.onNavLogin();
  } else {
    currentUser = null;
    isAdmin = false;
    localStorage.removeItem('cachedUser');
    hideNavProfile();
    document.getElementById('navAdminLink').style.display = 'none';
    document.getElementById('mobileAdminLink').style.display = 'none';
    if (typeof window.onNavLogout === 'function') window.onNavLogout();
  }
});

// ─── 프로필 함수 ───
window.getDisplayName = function() {
  if (!currentUser) return '';
  return currentUser.nickname || currentUser.name;
};

window.showNavProfile = function() {
  if (!currentUser) return;
  const el = document.getElementById('navProfile');
  document.getElementById('navProfileImg').src = currentUser.picture;
  document.getElementById('navProfileName').textContent = getDisplayName();
  document.getElementById('dropdownProfileImg').src = currentUser.picture;
  document.getElementById('dropdownName').textContent = getDisplayName();
  document.getElementById('dropdownEmail').textContent = currentUser.email;
  el.classList.add('show');
  document.getElementById('navLoginBtn').style.display = 'none';
};

window.hideNavProfile = function() {
  document.getElementById('navProfile').classList.remove('show');
  document.getElementById('navLoginBtn').style.display = 'flex';
  closeProfileDropdown();
};

window.navGoogleLogin = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(err => {
    if (err.code !== 'auth/popup-closed-by-user') alert('로그인 실패: ' + err.message);
  });
};

window.toggleProfileDropdown = function(e) {
  e.stopPropagation();
  document.getElementById('profileDropdown').classList.toggle('open');
};

window.closeProfileDropdown = function() {
  document.getElementById('profileDropdown').classList.remove('open');
};

document.addEventListener('click', e => {
  if (!document.getElementById('navProfile').contains(e.target)) {
    closeProfileDropdown();
    closeNotifDropdown();
  }
});

window.logoutUser = function() {
  firebase.auth().signOut();
  localStorage.removeItem('cachedUser');
  closeProfileDropdown();
};

// ─── 모바일 메뉴 ───
window.openMobileNav = function() {
  document.getElementById('mobileNavOverlay').classList.add('open');
  document.getElementById('mobileNavDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeMobileNav = function() {
  document.getElementById('mobileNavOverlay').classList.remove('open');
  document.getElementById('mobileNavDrawer').classList.remove('open');
  document.body.style.overflow = '';
};

// ─── 닉네임 ───
window.saveNickname = async function() {
  if (!currentUser) return;
  const nick = document.getElementById('nicknameInput').value.trim();
  if (!nick) { alert('닉네임을 입력해주세요.'); return; }
  if (nick.length > 20) { alert('닉네임은 20자 이내로 입력해주세요.'); return; }
  try {
    await db.collection('users').doc(currentUser.uid).update({ nickname: nick });
    currentUser.nickname = nick;
    showNavProfile();
    document.getElementById('nicknameSaved').style.display = 'block';
    setTimeout(() => document.getElementById('nicknameSaved').style.display = 'none', 2000);
    const nameEl = document.querySelector('.mypage-user-name');
    if (nameEl) nameEl.textContent = getDisplayName();
  } catch(e) { alert('저장 실패: ' + e.message); }
};

// ─── 마이페이지 ───
window.openMyPage = function() {
  closeProfileDropdown();
  if (!currentUser) return;
  document.getElementById('mypageUser').innerHTML = `
    <img src="${currentUser.picture}" alt="">
    <div>
      <div class="mypage-user-name">${getDisplayName()}</div>
      <div class="mypage-user-email">${currentUser.email}${currentUser.nickname ? ' · 구글: ' + currentUser.name : ''}</div>
    </div>`;
  document.getElementById('nicknameInput').value = currentUser.nickname || '';
  // 페이지별 마이페이지 콘텐츠 콜백
  if (typeof window.renderMyPageContent === 'function') {
    window.renderMyPageContent();
  } else {
    document.getElementById('mypageReviews').innerHTML = '<div class="mypage-empty">아직 작성한 글이 없습니다.</div>';
    document.getElementById('mypageComments').innerHTML = '<div class="mypage-empty">아직 작성한 댓글이 없습니다.</div>';
  }
  document.getElementById('mypageOverlay').classList.add('open');
};

window.closeMyPage = function() {
  document.getElementById('mypageOverlay').classList.remove('open');
};

// ─── 알림 시스템 ───
window.notifications = JSON.parse(localStorage.getItem('notifs') || '[]');

window.addNotif = function(text, targetId, type, page) {
  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  const notifPage = page || (isCommunity ? 'community' : 'main');
  notifications.unshift({ text, targetId, type: type || 'post', page: notifPage, time: timeStr, read: false });
  if (notifications.length > 30) notifications.length = 30;
  localStorage.setItem('notifs', JSON.stringify(notifications));
  renderNotifs();
};

window.renderNotifs = function() {
  const unread = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('bellBadge');
  const inlineCount = document.getElementById('notifCountInline');
  if (badge) {
    if (unread > 0) { badge.textContent = unread; badge.style.display = 'flex'; }
    else { badge.style.display = 'none'; }
  }
  if (inlineCount) {
    inlineCount.textContent = unread > 0 ? `(${unread})` : '';
  }
  const list = document.getElementById('notifList');
  if (!list) return;
  if (notifications.length === 0) {
    list.innerHTML = '<div class="notif-empty">알림이 없습니다.</div>';
    return;
  }
  list.innerHTML = notifications.slice(0, 20).map((n, i) => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="readNotif(${i})">
      <div class="notif-item-text">${n.text}</div>
      <div class="notif-item-time">${n.time}</div>
    </div>
  `).join('');
};

window.readNotif = function(i) {
  notifications[i].read = true;
  localStorage.setItem('notifs', JSON.stringify(notifications));
  renderNotifs();
  closeNotifDropdown();
  const n = notifications[i];
  // 페이지 간 이동: 알림의 page 정보에 따라 해당 페이지로 이동
  if (n.page === 'community' && !isCommunity) {
    location.href = '/community?notif=' + (n.targetId || '');
    return;
  }
  if (n.page === 'main' && !isHome) {
    location.href = '/?notif=' + (n.targetId || '');
    return;
  }
  // 같은 페이지면 콜백
  if (typeof window.onNotifClick === 'function') window.onNotifClick(n);
};

window.clearNotifs = function() {
  notifications.forEach(n => n.read = true);
  localStorage.setItem('notifs', JSON.stringify(notifications));
  renderNotifs();
};

window.toggleNotifPanel = function() {
  closeProfileDropdown();
  document.getElementById('notifDropdown').classList.toggle('open');
};

window.closeNotifDropdown = function() {
  const dd = document.getElementById('notifDropdown');
  if (dd) dd.classList.remove('open');
};

// ─── localStorage 캐시로 즉시 프로필 표시 ───
try {
  const cached = JSON.parse(localStorage.getItem('cachedUser'));
  if (cached) { currentUser = cached; showNavProfile(); }
} catch(e) {}

renderNotifs();

// ─── 스크롤 그림자 효과 ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ─── 강사 인증 신청: 커뮤니티에서는 메인으로 이동 ───
if (!window.openInstructorVerifyModal) {
  window.openInstructorVerifyModal = function() {
    location.href = '/?instructor-verify=1';
  };
}

// ─── 환영 팝업 ───
window.showWelcomePopup = function() {
  if (document.getElementById('welcomeOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'welcomeOverlay';
  overlay.className = 'welcome-overlay';
  overlay.innerHTML = `
    <div class="welcome-box">
      <div class="welcome-icon">&#x1F91D;</div>
      <div class="welcome-title">팔이피플에 오신 것을<br>환영합니다!</div>
      <div class="welcome-desc">
        팔이피플은 온라인 강의 수강생들의 <strong>솔직한 경험</strong>을 공유하고,<br>
        <strong>합리적인 수강 결정</strong>을 돕기 위해 만들어진 플랫폼입니다.
      </div>
      <div class="welcome-highlight">
        <p>&#x1F4CC; 운영 원칙</p>
        <p>&#x2705; 특정 강사를 비방하거나 명예를 훼손하는 것이 아닌, <strong>소비자 보호와 공공의 이익</strong>을 목적으로 운영됩니다.</p>
        <p>&#x2705; 모든 리뷰는 <strong>실제 수강 경험</strong>에 기반하여 작성해주세요.</p>
        <p>&#x2705; 근거 없는 비난이나 허위 정보는 삭제될 수 있습니다.</p>
        <p>&#x2705; 건전한 비평 문화로 <strong>강의 생태계 발전</strong>에 함께해주세요.</p>
      </div>
      <label class="welcome-noshow">
        <input type="checkbox" id="welcomeNoShow"> 다시 보지 않기
      </label>
      <button class="welcome-btn" onclick="closeWelcomePopup()">확인했습니다</button>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));
};

window.closeWelcomePopup = function() {
  const overlay = document.getElementById('welcomeOverlay');
  if (!overlay) return;
  if (document.getElementById('welcomeNoShow')?.checked) {
    localStorage.setItem('welcomeDismissed', '1');
  }
  overlay.classList.remove('open');
  setTimeout(() => overlay.remove(), 300);
};

})();
