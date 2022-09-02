const app = document.querySelector(".recipe_app")

const searchTerm_inp = app.querySelector(".searchTerm_inp");
const search_btn = app.querySelector(".search_btn");
const favMeals_ul = app.querySelector(".favMeals_ul");
const rDetail_div = app.querySelector(".rDetail_div");

const rPopup_div = app.querySelector(".rPopup_div");
const mealInfo_div = app.querySelector(".mealInfo_div");
const popupClose_btn = app.querySelector(".closePopup_div");


async function getRandomMeal() {
    // 웹 주소에서 음식데이터를 랜덤으로 하나 가져오고 resp_p에 저장한다
    const resp_p = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    
    // json을 이용해 resp_p 안에 저장한 데이터를 딕셔너리에서 오브젝트로 바꿔준다.
    const respData_o = await resp_p.json();
    console.log('respDat a_o: \n', respData_o);
    console.table(respData_o);
    
    // respData_o안에 있는 meals의 첫번째 데이터를 선택하고 randomMeal_d에 저장한다.
    const randomMeal_d = respData_o.meals[0];
    console.log('randomMeal_d:', randomMeal_d);
    

    // randomMeal_d와 true값을 addMealToMealsView에 넣어 호출한다
    addMealToMealsView(randomMeal_d, true);
}

// 좋아하는 음식의 정보를 meal_id_s에서 가져온다
async function getFavoriteMealInfoById(meal_id_s) {
    // 웹주소와 meal_id_s를 더한 주소를 resp_p에 넣는다
    const resp_p = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id_s
    );    
    // json을 이용해서 resp_p안에 있는 웹주소를 딕셔너리에서 
    // 오브젝트로 바꿔주고 respData_o에 저장한다.
    const respData_o = await resp_p.json();
    console.log('getFavoriteMealInfoById: ', respData_o);

    // respData_o안에 있는 meals의 첫번째 데이터를 선택하고 meal_d에 넣는다
    const meal_d = respData_o.meals[0];
    console.log('meal_d:', meal_d);
    return meal_d;
}

// 음식의 정보를 food_name_s에서 검색한다
async function getMealsInfoBySearch(food_name_s) {
    // 웹주소와 food_name_s를 더햔 주소를 resp_p에 넣는다
    // const resp_p = await fetch(url_s, { origin: "cors" });
    const resp_p = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food_name_s);

    console.log('####################################')
    console.log('resp_p: ', resp_p);
    console.dir(resp_p)
    console.log('####################################')
    

    // json을 이용해서 resp_p안에 있는 웹주소를 딕셔너리에서
    // 오브젝트로 바꿔주고 respData_o에 저장한다.
    const respData_o = await resp_p.json();
    console.log('getMealsInfoBySearch:', respData_o);
    
    // respData_o.meals를 meals_d_l에 넣는다
    const meals_d_l = respData_o.meals;

    //  meals_d_l값을 되돌려준다
    return meals_d_l;
}

// mealData_d, random_b의 변수를 이용하여 addMealToView()함수를 호출한다
function addMealToMealsView(mealData_d, random_b = false) {
    
    console.log('# 가져온 음식정보')
    console.log(mealData_d);

    // div라는 화면요소를 만들고 meal_div에 저장한다.
    const meal_div = document.createElement("div");
    // meal이라는 값을 meal_div의 클래스 안에 더한다
    meal_div.classList.add("meal");

    meal_div.innerHTML = `
        <div class="meal-header">
            ${random_b ? `<span class="random"> Random Recipe </span>` : ""}
            <img
                src="${mealData_d.strMealThumb}"
                alt="${mealData_d.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData_d.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    // meal_div에서 meal-body와 fav-btn 클래스를 선택해서 favorite_btn에 넣는다
    const favorite_btn = meal_div.querySelector(".meal-body .fav-btn");

    favorite_btn.addEventListener("click", (event) => {
        
        console.log('event:', event);
        console.log('fav btn class list:', favorite_btn.classList);

        // 만약 fvorite_btn이 클릭되어 있는 음식이 클래스리스트에 포함되어있을 경우
        if (favorite_btn.classList.contains("active")) {
            // 클래스리스트에서 favorite_btn이 클릭되어 있는 좋아요를 
            // 해체하므로 음식정보를 클래스리스트에서제거한다
            favorite_btn.classList.remove("active");
            // LocalStorage안에 있는 음식아이디를 제거한다
            removeMealFromLocalStorage(mealData_d.idMeal);
        } else {
            // favorite_btn이 눌러진 음식정보를 클래스리스트에 더한다
            favorite_btn.classList.add("active");
            // 음식아이디를 LocalStorage에 더한다
            addMealToLocalStorage(mealData_d.idMeal);
        }
        // 좋아요가 표시된 음식정보를 제거하고 좋아요가 표시된 음식리스트를 다시 올린다
        // (데이터 변경 리로드 같은 것인가?)
        remove_fav_meals_and_redraw_fav_meals();
    });

    // meal_div에서 이미지를 선택하고 난 후 meal_img에 저장한다
    const meal_img = meal_div.querySelector("img");
    console.log('meal img: ', meal_img);

    // 이미지를 클릭하면 팝업창이 뜬다
    meal_img.addEventListener("click", () => {
        
        showMealInfoPopup(mealData_d);
    });
    // meal_div를 rDetail_div(랜덤레시피 화면)에 추가한다
    rDetail_div.appendChild(meal_div);
}

function addMealToLocalStorage(meal_id_i) {
    // 로컬스토리지에서 음식아이디를 가져오고 난 뒤 meal_ids_l에 저장한다
    const meal_ids_l = getMealIdsFromLocalStorage();

    // 음식아이디를 meal_ids_l에 넣는다
    meal_ids_l.push(meal_id_i)
    // favoriteMealIds와 meal_ids_l를 딕셔너리에서 오브젝트로 바꿔주고 로컬스토리지에서 함수를 실행시킨다
    localStorage.setItem("favoriteMealIds", JSON.stringify(meal_ids_l));
}

// 로컬스토리지에서 음식아이디를 삭제한다
function removeMealFromLocalStorage(mealId) {
    // 로컬스토리지에서 음식아이디를 가져오고 meal_ids_l에 저장한다
    const meal_ids_l = getMealIdsFromLocalStorage();

    // 
    localStorage.setItem(
        "favoriteMealIds",
        JSON.stringify(meal_ids_l.filter((id) => id !== mealId))
    );
}
// LocalStorage에서 음식아이디를 가져온다
function getMealIdsFromLocalStorage() {
    // 좋아하는 음식아이디를 LocalStorage에서 가져오고 mealIds_s에 저장한다
    let mealIds_s = localStorage.getItem("favoriteMealIds")

    // JSON을 이용해 mealIds_s를 딕셔너리에서 오브젝트를 바꿔주고 mealIds_l에 저장한다
    const mealIds_l = JSON.parse(mealIds_s);

    // 리스트에 값이 존재하지 않을 경우 mealIds_l 값을 되돌려준다?
    return mealIds_l === null ? [] : mealIds_l;
}

// 좋아요가 표시된 음식정보를 제거하고 좋아요가 표시된 음식리스트를 다시 올린다
async function remove_fav_meals_and_redraw_fav_meals() {
    // 빈 값을 favorite_ul의 html에 넣어준다
    favMeals_ul.innerHTML = "";

    // 로컬스토리지에서 음식 아이디를 가져오고 mealIds_l에 저장한다
    const mealIds_l = getMealIdsFromLocalStorage();

    // i 처음값을 0으로 지정해주고 i값이 mealIds_l.length보다 작을 경우 1씩 더해준다
    for (let i = 0; i < mealIds_l.length; i++) {
        
        // mealIds_l에 i값을 넣고 mealId_s에 저장한다
        const mealId_s = mealIds_l[i];
        // mealId_s에서 좋아하는 음식 정보를 가져와 meal_d에 저장한다
        meal_d = await getFavoriteMealInfoById(mealId_s);
        // meal_d를 addMealToViewFav화면에 추가한다
        addMealToViewFav(meal_d);
    }
}

function addMealToViewFav(mealData_d) {

    // li라는 요소를 만들고 favMeal_li안에 넣는다.
    const favMeal_li = document.createElement("li");

    favMeal_li.innerHTML = `
        <img
            src="${mealData_d.strMealThumb}"
            alt="${mealData_d.strMeal}"
        />
        <span>${mealData_d.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    // favMeal_li에서 clear클래스(제거)를 선택해 clear_btn에 넣는다
    const clear_btn = favMeal_li.querySelector(".clear");

    clear_btn.addEventListener("click", () => {
        // LocalStorage에 있는 mealData_d에 있는 음식아이디를 제거한다
        removeMealFromLocalStorage(mealData_d.idMeal);
        // 좋아요가 표시된 음식정보를 제거하고 좋아요가 표시된 음식리스트를 다시 올린다
        remove_fav_meals_and_redraw_fav_meals();
    });

    favMeal_li.addEventListener("click", (event) => {
        console.log('favMeal_li click: ', event.target.tagName)
        // 만약 태그이름이 I일 경우 mealData_d를 팝업 시킨다?
        if (event.target.tagName != "I") {
            showMealInfoPopup(mealData_d);
        }
    });

    // favMeal_li를 favorite_ul에 추가한다
    favMeals_ul.appendChild(favMeal_li);
}

function showMealInfoPopup(mealData_d) {
    //  빈값을 HTML의 mealInfoPopup_div에 넣는다
    mealInfo_div.innerHTML = "";

    // div라는 요소를 만들고 mealInfo_div에 저장한다
    // const mealInfo_div2 = document.createElement("div");
    // 빈 리스트를 ingredients_l에 넣는다
    const ingredients_l = [];

    // i의 처음값을 1로 지정하고 i의 값이 20보다 적거나 같을 경우 1씩 더해준다
    for (let i = 1; i <= 20; i++) {
        // 만약 음식데이터 딕셔너리에 strIngredient와 i가 존재할 경우
        if (mealData_d["strIngredient" + i]) {
            // 
            ingredients_l.push(
                `${mealData_d["strIngredient" + i]} - ${mealData_d["strMeasure" + i]}`
            );
        } else {
            break;
        }
    }
    console.log('ingredients_l:', ingredients_l);

    mealInfo_div.innerHTML = ` 
        <h1>${mealData_d.strMeal}</h1>
        <img
            src="${mealData_d.strMealThumb}"
            alt="${mealData_d.strMeal}"
        />
        <p>
        ${mealData_d.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${
                ingredients_l.map(
                    (ingredient_s) => `<li>${ingredient_s}</li>`
            ).join("\n")
        }
        </ul>
    `;    

    // mealInfo_div를 mealInfoPopup_div에 추가한다
    // mealInfo_div.appendChild(mealInfo_div2);

    // hidden_div를 이용해 팝업 클래스를 숨긴다
    rPopup_div.classList.remove("hidden_div");
}

search_btn.addEventListener("click", async () => {
    // 빈 값을 rDetail_div의 html에 넣는다
    rDetail_div.innerHTML = "";

    // searchTerm_inp(사용자가 입력한 음식정보)를 search에 저장한다
    const search = searchTerm_inp.value;

    // 사용자가 입력한 음식명에 해당하는 음식리스트 가져와서 meals_d_l에 저장한다
    const meals_d_l = await getMealsInfoBySearch(search);

    // 만약 meals_d_l값이 존재하면 meals_d_l에서 meal_d(음식정보)를 
    // 하나씩 꺼내서 화면에 보여준다
    if (meals_d_l) {
        meals_d_l.forEach((meal_d) => {
            addMealToMealsView(meal_d);
        });
    }
});


popupClose_btn.addEventListener("click", () => {
    // 버튼 클릭시 팝업창 클래스를 hidden_div이용해 숨긴다
    rPopup_div.classList.add("hidden_div");
});

getRandomMeal();

remove_fav_meals_and_redraw_fav_meals();
