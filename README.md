# maplelore 프론트엔드

## 기술

1. Next.js
2. 테일윈드

- CSS 라이브러리이며 CSS 파일을 만들지 않고 className을 넣어서 스타일링하는 것이 특징
- className은 공식문서 참고
  - https://tailwindcss.com/

3. zustand

- 전역상태관리 라이브러리
- 메이플스토리 API 키를 받을 때 전역적으로 상태를 쓸려고 설치
  - 스타포스, 큐브 (현재는 주석처리 됨)

4. React Query

- 서버와의 통신에서 상태 관리하고 내부적으로 캐싱을 효율적으로 하여 설치

5. typescript
6. axios

## 미완성 부분

1. 스타포스, 큐브

- API 값을 받는 것까지만 완성 데이터를 받아 결과값을 보여주는 부분은 구현해야 함

2. 메인페이지 더보기

- 페이지네이션 구현 중이며 버그가 있음
  - 다음페이지가 없을 때 없다는 처리 아직 안됨
  - 이전을 누를 때 페이지가 안맞는 버그 있음
  - 공지는 더보기에서 페이지네이션 적용 안됨

3. ReactQuery, fetchData(경로 : app/\_utils/fetchData) 에러날 시 처리

4. 기타 퍼블리싱
   1. 반응형 처리
   2. 로고
   3. 파비콘

## 현재 기능 설명

### assets

- 주로 정적 파일 넣는 곳
  - 현재 이미지, 아이콘 있음

### page(route)

- Next.js는 폴더 구조로 URL 라우팅을 함
- 예를 들어 https://www.mainpage/a 라고 들어가면 Next.js는 src/app/a 안에 page.tsx 파일이 해당 페이지 파일이 됨
- 참고로 layout.tsx도 있는데 해당 페이지를 포함해 하위페이지까지 공통된 레이아웃을 제공

#### 메인페이지

1. 주요 기능

- 검색창, 주요 랭킹, 공지사항

2. 컴포넌트
   1. Provider
      - ReactQuery 초기 설정
      - 내부 캐싱 지속 시간을 18시간, 24시간으로 설정
      - 경로 : app/\_components/Provider.tsx
   2. SearchForm
      - 검색창
      - 캐릭터나 길드를 선택하여 검색하면 해당 결과창으로 이동
      - 경로 : app/\_components/SearchForm/Provider.tsx
   3. MainRank
      - 전체랭킹, 무릉도장 랭킹을 보여줌
      - ReactQuery로 통신하여 결과값을 보여줌
      - 경로 : app/\_components/MainRank.tsx
      - 컴포넌트
        1. Title
           - 랭킹 제목과 아코디언, Refresh 버튼이 있음
           - 경로 : app/\_components/Title.tsx
        2. RankTabs
           - 길드월드를 선택할 수 있음
           - 길드월드를 hover 했을 때 prefetch가 일어남(월드를 클릭할 때 깜빡였는데 이렇게 하면 깜빡임이 없어 UX적으로 더 나음)
           - 경로 : app/\_components/RankTabs.tsx
        3. RankingList
           - 랭킹표를 보여줌
           - Props으로 tableTitles과 data를 받음
             - tableTitles : 배열 안에 title과 key 값이 들어있는 객체를 받음
               - title : 표에 보여질 title
               - key : UI에는 보여지지 않지만 내부로직에는 필요한 유니크한 key 값
             - data : 실질적으로 보여줄 랭킹 data
           - 경로 : app/\_components/RankingList.tsx

#### /allRank, /dojangRank

1. 주요 기능

- 모든 랭킹 또는 무릉도장 더보기 페이지

2. 컴포넌트

   1. ShowRank

   - 더보기 페이지
   - Props으로 URL과 queryKey, params 받음
     - URL : 통신할 경로
     - queryKey : ReactQuery는 내부적으로 쿼리들을 식별하기 위해 QueryKey를 받음
     - axios에서 추가적으로 받을 params (선택)
   - 컴포넌트

     1. SelectedWorld
        - 월드 이름, 월드 이름 선택도 가능
        - 경로 : app/\_components/SelectedWorld.tsx
     2. RankingList

   - 경로 : app/\_components/ShowRank.tsx

#### notices

1. 주요 기능

- 공지 더보기 페이지

2. 컴포넌트
   1. Notice
      - 컴포넌트
        1. RankingList
      - 경로 : app/notices/\_component/Notice.tsx

#### user/[username]

1. 주요 기능

- 캐릭터 검색 결과창

2. 창
   1. /default
      - 캐릭터 기본 정보
      - 컴포넌트
        1. RefreshBtn
           - Next.js 내에서 fetch로 통신할 시 내부 캐쉬로 재활용할 수 있음
           - 그래서 RefreshBtn을 쓰면 내부 캐쉬를 쓰지 않고 다시 통신하게 됨
           - 그 식별값으로 path 값을 props으로 전달
           - props
             - path들의 배열
           - 경로 : app/user/[username]/\_component/RefreshBtn"
   2. /equipment
      - 장비 정보
      - utils
        1. fetchData
           - fetchData는 Promise.all을 사용하여 통합되지 않은 여러 API 데이터들을 불러옴
           - 경로 : app/\_utils/fetchData
      - 컴포넌트
        1. RefreshBtn
        2. CashEquipment
           - 캐쉬장비
           - 경로 : app/user/[username]/equipment/\_component/CashEquipment
        3. Equipment
           - 기본 장비
           - 경로 : app/user/[username]/equipment/\_component/Equipment
        4. PetEquipment
           - 펫장비
           - 경로 : app/user/[username]/equipment/\_component/PetEquipment
        5. SymbolEquipment
           - 심볼장비
           - 경로 : app/user/[username]/equipment/\_component/SymbolEquipment
        6. 컴포넌트
           1. Tooltip
              - 호버시 보여지는 툴팁
              - props, children
                - props으로 툴팁 보여질 컴포넌트를 넣고
                - 자식으로는 호버될 대상을 넣는다.
              - 경로 : app/\_components/common/Tooltip
           2. Star
              - 24개 별 중 채워질 별을 숫자로 넣으면 채워지는 컴포넌트
              - props
                숫자
              - 경로 : app/\_components/Star/Star
   3. /skill
      - 스킬 정보
      - 컴포넌트
        1. RefreshBtn
        2. AdvancementSkill
           - 5차, 6차 스킬
           - 경로 : app/user/[username]/skill/\_component/AdvancementSkill
        3. LinkedSkill
           - 링크스킬
           - 경로 : app/user/[username]/skill/\_component/LinkedSkill
        4. 컴포넌트
           1. Tooltip
   4. /stat
      - 스탯 정보
      - 컴포넌트
        1. RefreshBtn
        2. StatShow
           - 스탯 기본 정보
           - 경로 : app/user/[username]/stat/\_component/StatShow
        3. HyperStat
           - 하이퍼 스탯 정보
           - 경로 : app/user/[username]/stat/\_component/HyperStat
   5. /union
      - 유니온 정보
      - 컴포넌트
        1. RefreshBtn
        2. UnionRadier
           - 유니온 좌표
           - 경로 : app/user/[username]/union/\_component/UnionRadier/UnionRadier
   6. /starforce
      - 스타포스 정보, 구현 중
      - 컴포넌트
        1. InputAPIKey
           - API키 입력 부분
           - API로그인 성공 시 API키를 전역상태로 저장
             - 경로 : app/\_store/store.ts
           - 경로 : app/user/[username]/\_component/InputAPIKey
        2. Info
           - 로그인 성공 시 스타포스 정보 보여줌
           - 구현 중

#### guilds/[name]

- 길드 검색 결과창

#### 기타

- calculateDay.ts
  - 어제 날짜를 계산
  - 경로 : app/\_utils/calculateDay.ts
