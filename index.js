const lengthRange = document.querySelector(".pass-length");
const rangeValue = document.querySelector(".lengthValue");
const options = document.querySelectorAll(".options .option input");
const passwordInput = document.querySelector(".password");
const passIndicator = document.querySelector(".pass-indicator");
const copyButton = $("#copy-all");

rangeValue.innerHTML = lengthRange.value;

lengthRange.addEventListener("input", function(){
    rangeValue.innerHTML = lengthRange.value;
}, false);

$("#copy-all").click(function(){
    var copyText = document.querySelector(".password").value;
    navigator.clipboard.writeText(copyText).then( () =>{
        $("#copy-all").html("done_all");
        $("#copy-all").css("color","green");
    });
});

const characters = {
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPRQSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~_/?d"
}

    const generatePassword = () => {
        let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthRange.value;
        options.forEach(option => {
            if(option.checked) { 
                if(option.id !== "noDuplicate" && option.id !== "space") {
                    staticPassword += characters[option.id];
                } else if(option.id === "space") { 
                    staticPassword += `  ${staticPassword}  `; 
                } else { 
                    excludeDuplicate = true;
                }
            }
        });
        for (let i = 0; i < passLength; i++) {
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if(excludeDuplicate) {
                !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
            } else { 
                randomPassword += randomChar;
            }
        }
        passwordInput.value = randomPassword; 
    }

$("#generate-btn").click(function(){
generatePassword();
$("#copy-all").html("copy_all");
$("#copy-all").css("color","#212529");
});


const upadatePassIndicator = () => {
    passIndicator.id = lengthRange.value <= 8 ? "weak" : lengthRange.value <= 16 ? "medium" : "strong";
}

lengthRange.addEventListener("input", upadatePassIndicator);