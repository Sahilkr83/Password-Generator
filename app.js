const  passInput = document.querySelector('.pass-input');
const  slider = document.querySelector('.slider');
const  copyBtn = document.querySelector('.copy-Btn');
const  copyMsg = document.querySelector('.copied');
const  uppercaseCheck = document.querySelector('#uppercase');
const  lowercaseCheck = document.querySelector('#lowercase');
const  numbersCheck = document.querySelector('#numbers');
const  symbolsCheck = document.querySelector('#symbols');
const  colorIndicate = document.querySelector('.strength-color');
const  passwordGenBtn = document.querySelector('.pass-gen');
const  allCheckBox = document.querySelectorAll('input[type=checkbox]');
const  lengthNumber = document.querySelector('.lenght-num');
const  allSymbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

let password = "";
let passwordLength = 10;
let checkCount = 0 ;

handleSlider();
// handleSlide function is show the set value of defult
function handleSlider(){
    slider.value = passwordLength;
    lengthNumber.innerText = passwordLength;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((passwordLength - min)*100/(max-min) )+ "% 100%";
}//this changes the value of Password lenght as the slider set or move
slider.addEventListener('input',(length) => {
    passwordLength = length.target.value;
    handleSlider();

});

//this is to get a random Integer
function getRandamNum(max,min){

    return Math.floor(Math.random() * (max - min)) + min;
};
function getRandamNumber(){
    return getRandamNum(0,9)
};
function genereteLowercase(){
    return String.fromCharCode(getRandamNum(97,123));

};
function genereteUppercase(){
    return String.fromCharCode(getRandamNum(65,91))

};
function genereteSymbols(){
    const randNum = getRandamNum(0, allSymbols.length);
    return allSymbols.charAt(randNum);
};

//this set the parameters for the strenght color
function setlndicator(color){
    colorIndicate.style.backgroundColor = color;
    colorIndicate.style.boxShadow = `0px 0px 15px 1px ${color}`;

}//this change the color based on checked Boxes
function catcStrength(){
let hasUpper = false;
let hasLower = false;
let hasNum = false;
let hasSym = false;
if (uppercaseCheck.checked) hasUpper = true;
if (lowercaseCheck.checked) hasLower = true;
if (numbersCheck.checked) hasNum = true;
if (symbolsCheck.checked) hasSym = true;


if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
setlndicator( "#0f0" ) ;

} else if (
   (hasLower || hasUpper) &&
   (hasNum || hasSym) &&
   passwordLength >=6
) {
   setlndicator( "#ff0" ) ;
}else {
   setlndicator( "#f00" ) ;
}
}

//this is to copy to clipboard
async function copyContaint(){

    try{
        await navigator.clipboard.writeText(passInput.value);
        copyMsg.innerText = 'copied';
    }
    catch(e){
        copyMsg.innerText = 'Failed';
    }
    copyMsg.classList.add("active");

    setTimeout(  ( ) => {
        copyMsg.classList.remove("active")
    }, 2000);
};//this is to copy to clipboard when value in present in Password box
copyBtn.addEventListener('click', () =>{
    if(passInput.value){
        copyContaint();
    }
});

//this is runnig a forEach foop for every check box and increasing the check count
//and if the passoword lenght is less than check count then equals the both variables
function handleCheckBox (){
    checkCount = 0;
    allCheckBox.forEach((checkBox) =>{
        if(checkBox.checked){
            checkCount++ ;
        }
    });
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    };
};//this is sees any change in allcheck box to run the count box function
allCheckBox.forEach((checkBox) =>{
    checkBox.addEventListener('change',handleCheckBox);
});

//this shuffles the password
function shufflePassword (array){
    for(let i = array.length -1 ; i>0 ;i--){
        const j = Math.floor(Math.random ()  * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
     let str = "";
     array.forEach ((el)=> (str+=el));
     return str;
     
}
// this genreates passwords
passwordGenBtn.addEventListener('click',() =>{
    let funArr = [];
    password = "";

    if(checkCount == 0) return;
//and if the passoword lenght is less than check count then equals the both variables
    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    };

    if(uppercaseCheck.checked){
        funArr.push(genereteUppercase)
        console.log('Uppercase')
    }
    if(lowercaseCheck.checked){
        funArr.push(genereteLowercase)
        console.log('Lowercase')
    }
    if(numbersCheck.checked){
        funArr.push(getRandamNumber)
        console.log('Numbers')
    }
    if(symbolsCheck.checked){
        funArr.push(genereteSymbols)
        console.log('Symbols')
    }


    for(let i=0;i<funArr.length;i++){
        password +=funArr[i]();
    }
    for(let i=0; i<passwordLength-funArr.length;i++){
        let randIndex = getRandamNum(0,funArr.length);
        password += funArr[randIndex]();
    }

    password = shufflePassword(Array.from(password));

    passInput.value = password;

    catcStrength();
})