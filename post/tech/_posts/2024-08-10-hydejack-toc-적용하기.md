---
layout: post
title: Hydejack Starter-kit Sticky TOC 적용하기
description: Hydejack Starter-kit에서 지원하지 않는 Sticky TOC기능 추가하기
related_posts:
    - post/tech/_posts/2024-08-09-hydejack-sub-menu.md
    - post/tech/_drafts/2024-08-12-hydejack-theme-에러-수정하기.md
tags:
    - hydejack
type: Post
---
* toc
{:toc}

## Hydejack TOC
Hydejack에서는 TOC(Table Of Contents)기능을 지원한다. 이는 간단하게 포스트.md파일의 최상단에
```markdown
* toc
{:toc}
```
두 줄만 추가해주면 된다.
설정을 해두면 마크다운의 `##`과 `###`등을 사용한 Header들을 인식하여 목차로 만들어준다. 이는 포스트의 오른쪽에 표시되며, 모바일과 같이 가로가 작은 화면의 경우 포스트의 Description 아래에 표시된다.<br/>
<br/>
하지만 무료버전인 Hydejack Starter-kit에서는 오른쪽에 표시되는 TOC가 스크롤을 따라가지 않아 긴 포스트의 경우 TOC의 활용성이 많이 떨어진다. ~~*(모바일 게임도 아니고 현질유도라니...)*~~<br/>
<br/>
하지만 Jekyll은 어느정도 자유롭게 커스터마이징이 가능하기 때문에 직접 구현해주면 된다.

## Sticky TOC 구현하기
<https://james1verse27.github.io/blog/2023-02-22-github/>
해당 포스트를 참고하여 Sticky-TOC를 구현하였다.<br/>
<br/>

구현 방법은 간단하다. 이전 Sub-menu 만들 때 생성했던 `assets/js`폴더에 `sticky-toc.js`파일을 만들고
```javascript
//file: `assets/js/sticky-toc.js`
document.querySelector("hy-push-state").addEventListener("load", () => {
  let tocElement = document.getElementById("markdown-toc");

  if (tocElement) {
    let affixedDiv = document.createElement("div");
    affixedDiv.style.position = "relative";
    affixedDiv.style.top = "-1rem";
    tocElement.parentNode.insertBefore(affixedDiv, tocElement);

    let headerList = document.getElementsByClassName("permalink");
    let prevElement;
    window.addEventListener("scroll", () => {
      let hurdleTop = affixedDiv.getBoundingClientRect().top;
      if (hurdleTop <= 0) tocElement.classList.add("affix");
      else tocElement.classList.remove("affix");

      for (let i = 0; i < headerList.length; i++) {
        if (headerList[i].getBoundingClientRect().top >= 0) {
          prevElement?.style.removeProperty("font-weight");
          let tocId = "markdown-toc-" + headerList[i].parentNode.id;
          prevElement = document.getElementById(tocId);
          prevElement.style.fontWeight = "bold";

          break;
        }
      }
    });
  }
});
```
해당 코드를 붙여넣은 다음에 `_includes/my-head.html`파일에
```html
<!--file: `includes/my-head.html`-->
...생략
<script type="module" src="/assets/js/sticky-toc.js"></script>
```
해당 코드를 붙여넣어 만든 js파일을 적용시키면 끝이다.<br/>
<br/>
이후 포스트에서 toc를 적용시켜보면 잘 동작하는것을 알 수 있다.<br/>
<br/>
~~워낙 복잡한 테마이다 보니 언제까지고 이렇게 때울 순 없을 것 같아 언젠가 유료버전을 결제할 예정이다.~~