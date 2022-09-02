const APIURL = "https://api.github.com/users/";
const app = document.querySelector(".githubProfiles_app");
const github_form = app.querySelector(".gpHeader_form");
const github_main = app.querySelector(".gp_main");

const github_form_input = app.querySelector(".github_input");


function print(title, arguments) {
    console.log('#', title);
    console.log(arguments);
    console.log('-----------------------');
}

async function getUserInfoFromGitHub(username) { 
    // APIURL과 사용자이름을 더해서 가져오고 resp_o에 저장한다
    /*
    좀 더 디테일한 설명:
        웹주소에서  https://api.github.com/users/florinpop17/이라는 
        url을 요청해서 가져오고, 그 후 resp_o에 저장한다
    */
    const resp_o = await fetch(APIURL + username);
    print("resp_o:", resp_o);

    // json을 이용해 resp_o안에 있는 값을 딕셔너리에서 오브젝트로 바꿔주고 respData_d에 넣어줬다.
    const respData_d = await resp_o.json();
    print("respData_d:", respData_d);
    // respData_d를 createUserCard 함수에 넣어 호출한다
    /* 이걸 까먹으면 빵틀과 빵을 만드는 밀가루를 떠올리도록 하자
       여기서 createUserCard빵틀기계고 respData_d는 빵을 만들 밀가루라고 생각하면 된다
    */
    createUserCard(respData_d);

    // username를 getReposFromGitHub 함수에 넣어 호출한다
    /* 
        이걸 까먹으면 빵틀과 빵을 만드는 밀가루를 떠올리도록 하자
        여기서 createUserCard빵틀기계고 respData_d는 빵을 만들 밀가루라고 생각하면 된다
    */
    getReposFromGitHub(username);
}

async function getReposFromGitHub(username) {
    
    /* 웹주소에서  https://api.github.com/users/florinpop17/repos이라는 url을 요청해서 
    가져오고, 그 후 resp_o에 저장한다
    */
    const resp_o = await fetch(APIURL + username + "/repos");
    print("resp_o", resp_o);

    // 
    const repos_d_l = await resp_o.json();
    print('respData_d_l:', repos_d_l);
    
    // repos_d_l 카드의 저장소(화면에 나와있는 카드)에 더한다
    addReposToCard(repos_d_l);
}

// 사용자 카드를 만든다
function createUserCard(user_d) {
    const cardHTML = `
        <div class="user_card_div">
            <div>
                <img class="user_photo_avatar" src="${user_d.avatar_url}" alt="${user_d.name}" />
            </div>
            <div class="userInfo_div">
                <h2>${user_d.name}</h2>
                <p>${user_d.bio}</p>
                <ul class="info">
                    <li>${user_d.followers}<strong>Followers</strong></li>
                    <li>${user_d.following}<strong>Following</strong></li>
                    <li>${user_d.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos_div"></div>
            </div>
        </div>
    `;
    // cardHTML를 github_main의 html에 넣는다.
    github_main.innerHTML = cardHTML;
}

function addReposToCard(respos_d_l) {
    // Id에서 repos_div라는 요소를 화면으로 가져와 repos_div에 저장한다
    const repos_div = document.getElementById("repos_div");
    console.log("repos_div:");
    console.log(repos_div);

    respos_d_l
        // 
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        // 1부터 10까지 잘라낸다
        .slice(0, 10) 
        // repo_d 안에 있는 값을 하나씩 실행한다
        .forEach((repo_d) => {
            // 화면 안에 a라는 요소를 만들어 repo_a에 저장한다
            const repo_a = document.createElement("a");
            console.log("repos_a:");
            console.log(repo_a);
            
            // repo_d 이름명을 repo_a 텍스트에 넣었다
            repo_a.innerText = repo_d.name;
            // repo_a.classList에 user_project_repo_a라는 값을 더한다
            repo_a.classList.add("user_project_repo_a");
            
            /* 
            웹주소( 예: https://api.github.com/users/florinpop17/repos 및 10개)를 
            repo_a.href에 넣었다 
            */
            repo_a.href = repo_d.html_url;
            
            // _blank라는 값을 target이라는 함수에 넣고 그 함수를 repo_a에 넣었다.
            repo_a.target = "_blank";
            // repo_a를 repos_div에 추가한다
            repos_div.appendChild(repo_a);
        });
}

github_form.addEventListener("submit", (event) => {
    event.preventDefault();
    // github_form_input.value를 user_s에 넣는다
    const user_s = github_form_input.value;
    print('user_s:', user_s);

    //만약 user_s값이 존재할 경우
    if (user_s) {
        // 깃허브(github_form_input)에 있는 내용을 가져온다
        getUserInfoFromGitHub(user_s);
    }
});

getUserInfoFromGitHub("florinpop17");