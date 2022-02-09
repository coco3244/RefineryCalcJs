const mdpErreur = document.querySelector(".mdpError");
const addLog = document.querySelector(".addLog");
const yesAdd = document.querySelector(".yesAdd");
const noAdd = document.querySelector(".noAdd");

const iLogin = document.querySelector("#iLogin");
const iPsw = document.querySelector("#iPsw");
let tabInsert = {};
tabInsert.insert = {};

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
                tabInsert.insert.login = iLogin.value;
                tabInsert.insert.password = iPsw.value;
                console.log(tabInsert.insert.login + " " + tabInsert.insert.password);
            } else if(response.search("Connect") !== -1) {
                document.location.href = "./calc.html";
            } else if(response.search("pswNo") !== -1) {
                mdpErreur.classList.remove("hide");
            }
        }
    });
    return false;
});

//Traitement du btn oui
yesAdd.addEventListener("click", (e) => {
    $.ajax({
        url:"./upload.php",
        method: "POST",
        data: tabInsert,
        success: function(res) {
            console.log(res);
            document.location.href = "./calc.html";
        }
    });
});