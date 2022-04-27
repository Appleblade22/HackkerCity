const checkBoxes = document.querySelectorAll('.chb');

//Get url
const url = window.location.href;
//Get last part of url
let lastPart = url.split('/').pop();
//Get last part of url without extension
let lastPartWithoutExtension = lastPart.split('.').shift();

console.log(lastPartWithoutExtension);
// On page load make a default checkbox checked and all other checkboxes unchecked
checkBoxes.forEach(checkBox => {
    if (lastPartWithoutExtension === checkBox.value) {
        checkBox.checked = true;
    }
    else {
        checkBox.checked = false;
    }
});


checkBoxes.forEach(checkBox => {
    checkBox.addEventListener('click', () => {
        checkBoxes.forEach(checkBox => {
            checkBox.checked = false;
        });
        checkBox.checked = true;
    });
});

//Generate a post req on clicking on a checkbox 

