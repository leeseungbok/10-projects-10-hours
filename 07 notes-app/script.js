// add_btn이라는 id값을 가지고 있는 화면요소를 선택해 add_btn 변수에 저장한다.

const app = document.querySelector(".notes_app");
const add_btn = app.querySelector(".add_btn");
// localStorage에서 notes라는 아이템 값을 가져와 JSON을 이용해 딕셔너리를 오브젝트로 바꿔준다.
const notes_s_l = JSON.parse(localStorage.getItem('notes'));
console.log('notes:', notes_s_l);

// 만약 notes_s_l 값이 존재할 경우 
if (notes_s_l) {
    // notes_s_l에서 note_s값을 꺼내서 실행해 화면에 새로운 노트창을 띄운다.
    notes_s_l.forEach(note_s => {
        addNewNoteToview(note_s);
    });
}

// add_btn버튼을 클릭하면 이밴트가 발생한다
add_btn.addEventListener("click", () => {
    // 빈 값을 input_s에 저장한다.
    let input_s = ""
    // input_s를 화면에 새로 띄운 노트에 더해서 보여준다
    addNewNoteToview(input_s);
});

// note_s를 새로운노트에 더해 화면에 띄워 보여준다 
function addNewNoteToview(note_s) {
    console.log('note_s: ', note_s)
    // div라는 새로운 화면요소를 만들고 note_div에 추가한다
    const note_div = document.createElement("div");
    console.log('notes div: ', note_div);
    // note_div를 note_div클래스에 더한다
    note_div.classList.add("note_div");
    console.log('note_div.classList: ', note_div.classList);
    note_div.innerHTML = `
        <div class="tools_div">
            <button class="edit_btn"><i class="fas fa-edit"></i></button>
            <button class="delete_btn"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="view_div"></div>
        <textarea class="edit_ta"></textarea>
    `;
    // div.view_div라는 값을 가지고 있는 note_div요소를 선택해 view_div에 저장한다
    let view_div = note_div.querySelector("div.view_div");
    // textarea라는 값을 가지고 있는 note_div요소를 선택해 edit_textarea에 저장한다
    let edit_textarea = note_div.querySelector("textarea.edit_ta");

    // 만약 note_s값이 비어있으면
    if (note_s === "") {
        // view_div.classList에 hidden이라는 값을 넣어줘 edit_textarea만 보여주기 위해 view_div을 숨긴다
        view_div.classList.add("hidden");
    } else {
        // edit_textarea.classList에 hidden이라는 값을 넣어줘 view_div만 보여주기 위해 edit_textarea을 숨긴다
        edit_textarea.classList.add("hidden");
    }

    // note_div에서 .edit_btn라는 클래스값을 선택하고 난 후 edit_btn에 저장한다
    const edit_btn = note_div.querySelector(".edit_btn");

    // note_div에서 .delete_btn라는 클래스값을 선택하고 난 후 delete_btn에 저장한다
    const delete_btn = note_div.querySelector(".delete_btn");

    // edit_btn 버튼을 클릭했을 시
    edit_btn.addEventListener("click", (event) => {
        /* hidden에 toggle기능을 추가해주고 각각 view_div와 edit_textarea의 클래스에 넣어준다
            만약 버튼을 클릭해 view_div에 hidden값이 없으면 edit_textarea에 hidden값이 생긴다. 그 반대의 경우도 마찬가지
        */
        view_div.classList.toggle("hidden");
        edit_textarea.classList.toggle("hidden");
    });

    // delete_btn 버튼을 클릭했을 시
    delete_btn.addEventListener("click", (event) => {
        // note_div를 리무브(삭제)시킨다.
        note_div.remove();
        // 리무브시킨다음 로컬스토리지를 업데이트시킨다.
        updatesLS();
    });


    // note_s(텍스트)를 edit_textarea.value에 넣는다
    edit_textarea.value = note_s;
    // 
    view_div.innerHTML = marked(note_s);


    edit_textarea.addEventListener("input", (event) => {
        // 
        view_div.innerHTML = marked(event.target.value);
        // 리무브시킨다음 로컬스토리지를 업데이트시킨다.
        updatesLS();
    });

    // note_div를 화면에 추가한다
    app.appendChild(note_div);
}

function updatesLS() {
    // textarea의 모든 화면요소를 선택하고 notes_ta_l에 저장한다
    const notes_ta_l = app.querySelectorAll('textarea');
    // 빈 값을 notes_s_l에 저장한다
    let notes_s_l = [];
    
    // notes_ta_l에서 note_ta를 실행해 note_ta.value를 notes_s_l에 넣었다
    notes_ta_l.forEach(note_ta => {
        notes_s_l.push(note_ta.value);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes_s_l));
}

