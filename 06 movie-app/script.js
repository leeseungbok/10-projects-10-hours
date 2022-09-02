// 영화정보가 담긴 주소를 APIURL에 저장한다
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// 영화 이미지 웹주소를 IMGPATH에 저장했다
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";

// 영화검색주소를 SEARCHAPI에 저장했다.
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const app = document.querySelector(".movie_app");
// search_form이라는 id값을 가지고 있는 화면요소(div)를 선택한다.
// 선택한 화면요소를 form_div에 저장했다
const form_div = app.querySelector(".movieSearch_form");

// search_input이라는 id값을 가지고 있는 화면요소(input)를 선택한다.
// 선택한 화면요소를 form_div에 저장했다
const search_input = app.querySelector(".search_input");
// main_div이라는 id값을 가지고 있는 화면요소(div)를 선택한다.
// 선택한 화면요소를 main_div에 저장했다
const main_div = app.querySelector(".movieMain_div");

//APIURL에 저장한 영화정보 주소를 가져온다
getMovies(APIURL);

// url에서 영화정보를 가져온다.
async function getMovies(url) {
    // url에서 영화정보를 가져와 값이 처리될 때까지 기다린 다음 resp_o에 저장한다
    const resp_o = await fetch(url);
    console.log("resp_o");
    console.log(resp_o);
    // json을 이용해서 resp_o안에 저장한 url의 dictionary를
    // object로 바꿔준 다음 respData_d_l에 저장한다
    const respData_d_l = await resp_o.json();
    // respData_d_l의 결과물을 movies_d_l에 저장했다
    movies_d_l = respData_d_l.results
    console.log("movies_d_l");
    console.log(movies_d_l);
    // movies_d_l(영화정보)를 가져와서 보여준다
    showMovies(movies_d_l);

}

function showMovies(movies_d_l) {
    // 아무것도 없는 빈 값을 HTML에 있는 main_div(메인화면)에 넣어준다
    main_div.innerHTML = "";
    // movies_d_l안에 있는 movie_d값을 하나씩 각각 실행한다
    movies_d_l.forEach((movie_d) => {
        console.log('\n\n#### START #####');
        console.log("movie_d");
        console.log(movie_d);
        // movie_d를 영화사진, 제목, 평점, 개요가 담긴 변수에 저장한다
        const {poster_path, title, vote_average, overview} = movie_d;
        // div라는 화면요소를 만들고 movie_div에 저장한다
        let movie1_div = document.createElement("div");
        // LSB: 왜 여기서 밑에서 넣은 html 값들이 출력되는지 모르겠다....???
        console.log("# movie1_div: ", movie1_div);
        // movie_div값을 movie_div클래스에 더해준다.
        movie1_div.classList.add("movie_div");
        movie1_div.innerHTML = ` 
            <img 
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movieInfo_div">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview_div">
                <h4>Overview:</h4>
                ${overview}
            </div>
            `;
        main_div.appendChild(movie1_div);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}


form_div.addEventListener("submit",(event) => {
    event.preventDefault();
    
    //search_input의 value를 searchTerm_s에 저장했다
    const searchTerm_s = search_input.value;
    // 만약 searchTerm_s값이 있으면
    if (searchTerm_s) {
        // SEARCHAPI와 searchTerm_s값을 더해서 영화정보를 가져와라
        getMovies(SEARCHAPI + searchTerm_s);
        // 빈값을 search_input.value에 저장한다
        search_input.value = "";
    }
});