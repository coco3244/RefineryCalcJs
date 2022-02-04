const result = document.getElementById("result");
const addLog = document.querySelector(".addLog");
const yesAdd = document.getElementById("yesAdd");
const noAdd = document.getElementById("noAdd");

// traitement du form
$("form").submit(function(evt){	 
    evt.preventDefault();
    let formData = new FormData($(this)[0]);

    $.ajax({
        url: './upload.php',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (response) {
            console.log(response);
            if(response.search("CRE4TI0N") !== -1) {
                console.log("uiii");
                addLog.classList.remove("hide");
            }
            result.innerHTML = "<pre>" + response + "</pre>";
        }
    });
    return false;
});

//Traitement du btn oui
yesAdd.addEventListener("click", (e) => {
    let insert = "insert";
    $.ajax({
        url:"./upload.php",
        method: "POST",
        data: insert,
        success: function(res) {
            console.log(res);
        }
    });
});