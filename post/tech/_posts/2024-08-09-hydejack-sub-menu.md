---
layout: post
title: Hydejack Starter-Kit Sub Menu 구현하기
description: Hydejack Starter-Kit에서 사이드바 메뉴에 Sub Menu를 구현해보자
related_posts: 
    - post/tech/_drafts/2024-08-10-hydejack-toc-적용하기.md
    - post/tech/_drafts/2024-08-12-hydejack-theme-에러-수정하기.md
tags: 
    - hydejack
type: Post
---
* toc
{:toc}

## Hydejack

이번에 처음으로 github.io 블로그를 사용하게 되었다. 맘에 드는 테마를 찾아 돌아다니던중 Hydejack 테마를 발견하게 되었고, 바로 적용시켜보았다.<br/>
<br/>
그런데, 왼쪽 사이드바에서 게시글들은 Post라는 하나의 카테고리에 묶고 그 안에서 세부적으로 분류하고싶은 생각이 들어 Sub Menu를 구성하고자 하는 생각이 들었다. <br/>
<br/>

그래서 다음 자료를 참고하여 조금 변형시켜 Sub Menu를 구현해보았다.

## 참고자료
> <https://sangmin2ya.github.io/studylog/hydejack/HJ1/>
{:.lead}

## Sub Menu 구현하기
### 추가해야 할 파일
1. `assets/js/sidebar-folder.js` (assets 폴더에 js 폴더를 생성하고 sidebar-folder.js 파일을 생성한다.)
2. `_includes/body/nav.html` (_includes 폴더에 body 폴더를 생성하고 nav.html 파일을 생성한다.)
3. `_featured_categories/*.md` (추가할 카테고리 파일들을 생성한다.)

#### sidebar-folder.js
화살표의 방향과 chackBox의 Check 유무를 변경해주는 함수. 클릭할때마다 실행된다.
~~~javascript
//file: `sidebar-folder.js`
function spread(count){
    document.getElementById('folder-checkbox-' + count).checked = 
    !document.getElementById('folder-checkbox-' + count).checked
    document.getElementById('spread-icon-' + count).innerHTML = 
    document.getElementById('spread-icon-' + count).innerHTML == 'arrow_right' ?
    'arrow_drop_down' : 'arrow_right'
}
~~~
펼쳐져있는지 검사할때 쓸 체크박스의 상태를 변경하고 화살표의 방향을 변경한다.
특정 Flag를 통해서 값을 변경하는것이 아니라 현재값의 반대되는 값으로 쓰는 것이기 때문에 시작값이 서로 맞춰져 있어야 한다. (보통 checkbox의 시작값은 false이기 때문에 arrow_right로 시작해야한다.)

#### nav.html
실제 Sub Menu를 적용할 html 파일
~~~html
<!--file: `nav.html`-->
{% raw %}
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<ul>
  {% if site.menu %}
    {% for node in site.menu %}
      {% assign url = node.url | default: node.href %}
      {% assign count = count | plus: 1 %}
      <li>
        <div class="menu-wrapper">
          {% if node.submenu %}
            <button class="spread-btn" onclick="javascript:spread({{count}})">
              <span id="spread-icon-{{count}}" class="material-icons">arrow_right</span>
            </button>
          {% endif %}
          <a
            {% if forloop.first %}id="_drawer--opened"{% endif %}
            href="{% include_cached smart-url url=url %}"
            class="sidebar-nav-item {% if node.external  %}external{% endif %}"
            {% if node.rel %}rel="{{ node.rel }}"{% endif %}
            >
            {{ node.name | default:node.title }}
          </a>
        </div>
        {% if node.submenu %}
          <div class="menu-wrapper">
            <input type="checkbox" id="folder-checkbox-{{count}}">
            <ul>
            {% for subnode in node.submenu %}
              <li>
                <a
                  class="sidebar-nav-item {% if node.external  %}external{% endif %}"
                  href="{% include_cached smart-url url=subnode.url %}"
                  >
                  {{ subnode.title }}
                </a>
              </li>
            {% endfor %}
            </ul>
          </div>
        {% endif %}
      </li>
    {% endfor %}
  {% else %}
    {% assign pages = site.pages | where: "menu", true %}
    {% assign documents = site.documents | where: "menu", true %}
    {% assign nodes = pages | concat: documents | sort: "order" %}

    {% for node in nodes %}
      {% unless node.redirect_to %}
        <li>
          <a
            {% if forloop.first %}id="_navigation"{% endif %}
            href="{{ node.url | relative_url }}"
            class="sidebar-nav-item"
            {% if node.rel %}rel="{{ node.rel }}"{% endif %}
            >
            {{ node.title }}
          </a>
        </li>
      {% else %}
        <li>
          <a href="{{ node.redirect_to }}" class="sidebar-nav-item external">{{ node.title }}</a>
        </li>
      {% endunless %}
    {% endfor %}
  {% endif %}
</ul>
{% endraw %}
~~~

코드를 하나씩 보자 <br/>
일단 첫번째 부분
~~~html
{% raw %}
<ul>
  {% if site.menu %}
    {% for node in site.menu %}
      {% assign url = node.url | default: node.href %}
      {% assign count = count | plus: 1 %}
      <li>
        생략
      </li>
    {% endfor %}
{% endraw %}
~~~

`_config.yml`파일에 menu가 있을 경우 menu의 각 항목들을 node 변수에 넣으면서 반복문을 돈다.<br/>
반복문을 돌면서 url 변수에는 node의 url 항목을 넣고, count 변수에는 count를 1씩 증가시키며 넣는다.<br/>
<br/>
생략된 부분을 보자

~~~html
{% raw %}
<div class="menu-wrapper">
    {% if node.submenu %}
    <button class="spread-btn" onclick="javascript:spread({{count}})">
        <span id="spread-icon-{{count}}" class="material-icons">arrow_right</span>
    </button>
    {% endif %}
    <a
    {% if forloop.first %}id="_drawer--opened"{% endif %}
    href="{% include_cached smart-url url=url %}"
    class="sidebar-nav-item {% if node.external  %}external{% endif %}"
    {% if node.rel %}rel="{{ node.rel }}"{% endif %}
    >
    {{ node.name | default:node.title }}
    </a>
</div>
{% if node.submenu %}
    <div class="menu-wrapper">
    <input type="checkbox" id="folder-checkbox-{{count}}">
    <ul>
    {% for subnode in node.submenu %}
        <li>
        <a
            class="sidebar-nav-item {% if node.external  %}external{% endif %}"
            href="{% include_cached smart-url url=subnode.url %}"
            >
            {{ subnode.title }}
        </a>
        </li>
    {% endfor %}
    </ul>
    </div>
{% endif %}
{% endraw %}
~~~
일단 첫번째 div는 node에 submenu 항목이 있을 경우 화살표 버튼을 생성하는데 기본으로 arrow_right이다. (나의 경우는 처음부터 펼쳐져 있는것이 좋을 것 같아서 arrow_drop_down으로 설정하였다.)<br/>
<br/>
이후 menu를 생성한다. 이는 Hydejack 기본 폼을 따라간 것 같다. 이를 통해 기본적인 menu들이 생성되고, submenu가 있는 경우에 앞에 화살표가 붙는다. (버튼과 a태그의 위치를 바꾸면 화살표를 메뉴 오른쪽으로 이동 시킬 수 있을 것이다.) <br/>
<br/>
두번째 div의 경우 submenu 들을 생성하는 부분이다. submenu가 있는 경우에만 숨겨진 체크박스를 생성하고 각 submenu들을 반복문을 통해 menu와 같은 형태로 생성한다. (나의 경우 처음부터 펼쳐져 있게끔 하였으므로 input 태그의 마지막에 checked를 넣어 default를 세팅하였다.)<br/>
<br/>
코드의 나머지 부분은 _config.yml에 menu가 없을 때 처리하는 부분인데, 안쓰는 기능이므로 생략한다.

#### 추가할 카테고리.md
여기서 기존 참고자료와 다르게 세팅하였는데, 상위 카테고리와 하위 카테고리가 같은 폴더 안에 있으면 헷갈리므로 하위 카테고리는 상위 카테고리 이름의 폴더에 넣어 관리한다.<br/>

~~~bash
├──_featured_categories
│   ├───post
│   │   ├───memoir.md
│   │   └───tech.md
│   └───post.md
~~~

이때, 디렉토리 구조를 이용해서 인식되어야 하므로 _config.yml이 수정되어야 한다. 이는 이후에 설명하겠다.<br/>
<br/>
카테고리 파일의 경우는 기존 카테고리 생성과 다를것 없이 하면된다.<br/>

~~~markdown
# file: `post.md`
---
layout: list
title: Post
slug: post
description: 게시글
sitemap: false
---
~~~

~~~markdown
# file: `tech.md`
---
layout: list
title: 개발
slug: tech
description: 개발 관련
sitemap: false
---
~~~

### 수정해야 할 파일
1. `_sass/my-style.scss`
2. `_includes/my-head.html`
3. `_config.yml`

#### my-style.scss
사이드바의 스타일을 설정해준다. 만약, 추가로 변경하고 싶은 설정이 있다면,

`\vendor\bundle\ruby\3.2.0\gems\jekyll-theme-hydejack-9.1.6\_includes\body`

에서 사이드바 관련 html파일에서 원하는 태그들의 class이름을 찾아 설정해주면 된다고 한다.

#### my-head.html
html의 **head** 태그에 만들어둔 js파일과 화살표 아이콘을 사용하기 위한 부분을 선언해준다.

~~~html
<!--file: `my-head.html`-->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="/assets/js/sidebar-folder.js"></script>
~~~

#### _config.yml
마지막으로 _config.yml 파일을 건드려야 한다.
일단 카테고리들을 추가하기 위해 menu부분을 수정하자
~~~yml
# file: `_config.yml`
menu:
  - title: Post
    url: /post/
    submenu:
      - title: 개발
        url: /post/tech/
      - title: 회고
        url: /post/memoir/
  - title: About
    url: /about/
~~~
url이 post안에 tech로 들어가야 하므로 위와같이 submenu들을 정의해주었다. url에 상위 카테고리를 추가하게끔 한 이유는 breadcrumbs가 상위 카테고리를 포함하지 않게 되어서 이를 해결하기 위해 이렇게 세팅하였다.<br/>
위에서 _featured_categories를 상위 카테고리 폴더를 만들어 그 안에 넣게끔 구현했으므로 디렉토리를 인식할 수 있게끔 설정도 해주어야 한다. 이를 적용하지 않으면 hydejack테마가 파일을 인식하지 못해 css가 깨지거나 파일을 찾을 수 없는 문제들이 생긴다.<br/>
~~~yml
# file: `_config.yml`
...
collections:
  featured_categories:
    permalink: /:path/
    output: true

  featured_tags:
    permalink: /tag-:name/
    output: true

  projects:
    permalink: /projects/:path/
    output: true
...
~~~
collections에서 featured_categories의 permalink를 `/:name/`에서 `/:path/`로 바꾸어준다. 이러면 Path를 자동으로 인식하여 permalink를 세팅해준다.<br/>

## 완료
이제 다 끝났다. 이후에 카테고리를 추가하려면 `_featured_categories`에 `상위 카테고리.md`파일과 폴더, 폴더안에 `하위 카테고리.md`파일을 만들어주고 `_config.yml`파일에 menu부분을 수정해주면 된다.<br/>
<br/>

또한, 게시글의 경우도 디렉토리를 인식해서 자동으로 분류되므로 root에
~~~bash
├──상위 카테고리 폴더
│   ├───하위 카테고리 폴더
│   │   └───_posts
│   │       └───게시글.md
│   └───하위 카테고리 폴더
│       └───_posts
│           └───게시글.md
~~~
처럼 생성해주면 `_posts`폴더를 인식해서 자동으로 게시글을 생성하고 `_posts`의 디렉토리 구조를 인식하여 `/상위/하위/게시글`로 url을 자동 설정해주면서 분류가 된다.