const app = document.querySelector(".pwGenerator_app");
const pw_span = app.querySelector(".pw_span");
const pwCopy_btn = app.querySelector(".pwCopy_btn");
const pwLen_input = app.querySelector("#pwLen_input");
const pwStrUpper_checkbox = app.querySelector("#pwStrUpper_checkbox");
const pwStrLower_checkbox = app.querySelector("#pwStrLower_checkbox");
const pwNumber_checkbox = app.querySelector("#pwNumber_checkbox");
const pwSymbol_checkbox = app.querySelector("#pwSymbol_checkbox");
const generatePw_btn = app.querySelector(".pwgBody_form .generatePw_btn");

const upperLetters_s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters_s = "abcdefghijklmnopqrstuvwxyz";
const numberLetters_s = "0123456789";
const symbolLetters_s = "!@#$%^&*()_+=";

function print(title, arguments) {
    console.log('#', title);
    console.log(arguments);
    console.log('-----------------------')
}

function getLowercaseCharacterByRandom() {
    return lowerLetters_s[Math.floor(Math.random() * lowerLetters_s.length)];
}

function getUppercaseCharacterByRandom() {
    return upperLetters_s[Math.floor(Math.random() * upperLetters_s.length)];
}

function getNumberCharacterByRandom() {
    return numberLetters_s[Math.floor(Math.random() * numberLetters_s.length)];
}

function getSymbolCharacterByRandom() {
    return symbolLetters_s[Math.floor(Math.random() * symbolLetters_s.length)];
}

function generatePasswordString() {
    const len_i = pwLen_input.value;
    let password_s = "";
    if (pwStrUpper_checkbox.checked) {
        const ch = getUppercaseCharacterByRandom();
        console.log(`1 ch, ${ch}`);
        password_s += ch;
        console.log(`1 password_s, ${password_s}`);
    }

    if (pwStrLower_checkbox.checked) {
        const ch = getLowercaseCharacterByRandom();
        console.log(`2 ch, ${ch}`);
        password_s += ch;
        console.log(`2 password_s, ${password_s}`);
    }

    if (pwNumber_checkbox.checked) {
        const ch = getNumberCharacterByRandom();
        console.log(`3 ch, ${ch}`);
        password_s += ch;
        console.log(`3 password_s, ${password_s}`);
    }

    if (pwSymbol_checkbox.checked) {
        const ch = getSymbolCharacterByRandom();
        console.log(`4 ch, ${ch}`);
        password_s += ch;
        console.log(`4 password_s, ${password_s}`);
    }

    for (let i = password_s.length; i < len_i; i++) {
        const password_ch = generatePasswordCharacter();
        print(`${i}, password_ch`, password_ch);
        password_s += password_ch;
    }
    pw_span.innerText = password_s;
}

function generatePasswordCharacter() {
    const password_s_l = [];

    if (pwStrUpper_checkbox.checked) {
        password_s_l.push(getUppercaseCharacterByRandom());
    }

    if (pwStrLower_checkbox.checked) {
        password_s_l.push(getUppercaseCharacterByRandom());
    }

    if (pwSymbol_checkbox.checked) {
        password_s_l.push(getSymbolCharacterByRandom());
    }

    if (pwNumber_checkbox.checked) {
        password_s_l.push(getNumberCharacterByRandom());
    }

    if (password_s_l.length === 0) {
        alert('패스워드가 생성되지 않았습니다!!')
        return "";
    }

    const random_f = Math.random();
    const random_index_f = random_f * password_s_l.length;
    const randomPassword_index_i = Math.floor(random_index_f);

    return password_s_l[randomPassword_index_i];
}

generatePw_btn.addEventListener("click", generatePasswordString);

pwCopy_btn.addEventListener("click", (event) => {
    const password_textarea = document.createElement("textarea");

    const password_s = pw_span.innerText;

    if (!password_s) {
        return
    }

    password_textarea.value = password_s;
    document.body.appendChild(password_textarea);

    password_textarea.select();

    document.execCommand("copy");

    password_textarea.remove();
    alert("Password copied to clipboard");
});