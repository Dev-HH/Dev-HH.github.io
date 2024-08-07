# config.yml 옵션 설명

Jekyll은 정적 사이트 생성기(Static Site Generator)로, 블로그나 웹사이트를 쉽게 만들고 관리할 수 있도록 도와줍니다. 위의 설정 파일은 Jekyll의 테마를 사용하여 사이트를 설정하기 위한 구성 파일입니다. 각 옵션에 대해 자세히 설명해드리겠습니다.

1. URL 및 Base URL 설정
   url: 사이트의 전체 URL을 설정합니다. GitHub Pages나 Netlify에서 호스팅하는 경우 이 설정은 필요하지 않습니다.
   baseurl: 사이트가 하위 디렉터리에 있을 경우 해당 경로를 지정합니다. 기본적으로 빈 문자열('')로 설정하면 됩니다.
2. 일반 설정
   lang: 사이트의 언어 코드를 설정합니다. 예: ko (한국어).
   title: 블로그의 제목을 설정합니다. 이는 사이드바와 브라우저 탭에 표시됩니다.
   description: 페이지의 메타 설명 태그에 사용될 간략한 설명을 설정합니다.
   tagline: 사이드바에 표시될 짧은 설명입니다.
   keywords: 블로그의 키워드를 설정합니다. 주로 SEO(검색 엔진 최적화)를 위한 설정입니다.
   logo: 사이트의 로고 이미지 경로를 설정합니다.
   author: 사이트의 저자를 설정합니다.
   name: 저자의 이름.
   email: 저자의 이메일 주소.
3. 메뉴 및 법적 정보 설정
   menu: 사이드바에 표시될 링크 목록을 설정합니다.
   legal: 하단에 표시될 법적 문서 링크 목록을 설정합니다.
   copyright: 각 페이지 하단에 표시될 저작권 텍스트를 설정합니다.
4. 퍼머링크 및 페이지네이션 설정
   permalink: 각 포스트의 퍼머링크 형식을 설정합니다.
   paginate: 페이지당 표시될 포스트 수를 설정합니다.
   paginate_path: 페이지네이션 URL의 형식을 설정합니다.
5. 테마 설정
   theme: 사용할 Jekyll 테마를 설정합니다. 여기서는 jekyll-theme-hydejack이 사용되고 있습니다.
   remote_theme: 원격 테마를 설정할 때 사용됩니다.
6. 사용자 정의 설정
   accent_image: 사이트의 사이드바 배경 이미지 경로를 설정합니다.
   accent_color: 사이트의 주요 색상을 설정합니다.
   theme_color: 브라우저 UI의 배경 색상을 설정합니다.
   google_fonts: 사용할 Google Fonts를 설정합니다.
   font: 텍스트에 사용할 기본 글꼴을 설정합니다.
   font_heading: 제목에 사용할 글꼴을 설정합니다.
   font_code: 코드 블록에 사용할 글꼴을 설정합니다.
7. 기본값 설정
   defaults: 특정 경로에 대한 기본 설정을 지정합니다.
   scope: 적용할 경로 또는 파일 타입을 설정합니다.
   values: 해당 경로 또는 파일 타입에 적용할 설정 값을 지정합니다.
8. kramdown 설정
   kramdown: Markdown 파서를 설정합니다.
   math_engine: 수식 렌더링 엔진을 설정합니다. 여기서는 mathjax를 사용합니다.
   footnote_backlink: 각주에 돌아가기 링크를 설정합니다.
9. 3rd Party Integration 설정
   google_analytics: Google Analytics의 추적 ID를 설정합니다.
   disqus: Disqus 코멘트 섹션을 활성화하기 위한 사용자 이름을 설정합니다.
   tinyletter: 뉴스레터 구독 박스를 활성화하기 위한 사용자 이름을 설정합니다.
10. Hydejack 테마 관련 설정
    hydejack: Hydejack 테마에 특화된 설정입니다.
    post_addons, project_addons: 포스트와 프로젝트 페이지의 추가 콘텐츠 순서를 설정합니다.
    no_mark_external: 외부 링크 표시 아이콘을 숨길지 여부를 설정합니다.
    no_push_state: 페이지 동적 로딩이 실패할 경우 설정하는 옵션입니다.
    no_drawer, no_navbar, no_search: 각각 드로어, 내비게이션 바, 검색 기능을 비활성화하는 옵션입니다.
    no_inline_css, no_page_style: 빌드 속도를 높이기 위해 일부 CSS를 인라인하지 않거나, 페이지 스타일을 비활성화합니다.
    no_break_layout: 코드 블록과 테이블이 전체 너비를 차지하지 않도록 설정합니다.
    dark_mode: 다크 모드를 활성화하거나, 다크 모드 전환 아이콘을 표시합니다.
11. 컬렉션 설정
    collections: 사용자 정의 컬렉션을 설정합니다. 예를 들어, projects, featured_categories, featured_tags와 같은 컬렉션을 설정할 수 있습니다.
12. 파일 포함/제외 설정
    exclude: 빌드에서 제외할 파일과 디렉터리를 설정합니다.
    include: 빌드에 포함할 추가 파일을 설정합니다.
13. 플러그인 설정
    plugins: Jekyll에서 사용할 플러그인을 나열합니다. 예: jekyll-feed, jekyll-seo-tag 등.
14. SEO Tag 설정
    google_site_verification: Google 사이트 소유권 확인을 위한 ID를 설정합니다.
    twitter, facebook: 각각 트위터 카드와 페이스북 오픈 그래프를 위한 설정입니다.
    social: 소셜 미디어 링크를 설정합니다.
15. 플러그인별 설정
    optional_front_matter, readme_index, relative_links, titles_from_headings, compress_html: 각각의 플러그인에 대한 설정을 지정합니다.
16. Jekyll Compose 기본값 설정
    jekyll_compose: 포스트, 프로젝트 등의 기본 front matter 설정을 지정합니다.

# Sub Menu 구현

https://sangmin2ya.github.io/studylog/hydejack/HJ1/

# Sticky TOC 구현

https://james1verse27.github.io/blog/2023-02-22-github/

# Git Pre, Post 구현

git hook을 사용하여 \_config.yml 파일의 theme:부분 주석 처리 및 해제 구현
