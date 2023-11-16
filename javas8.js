//jslint browser: true
//jslint single: true
//jslint unordered: true
//jslint this: true
//global $, jQuery, history, Slapform
function homeURL() {
    history.pushState({modal: "close"}, "ModalOut", "./index8.html");
}

window.onload = function (event) {
    let stateStatus = event.currentTarget.history.state;
    if(stateStatus && stateStatus.modal === "open") {
        homeURL();
    }

    document.getElementById("forma").addEventListener("submit", function (ev) {
        ev.preventDefault();
        let slapform = new Slapform();
        let infor = document.getElementById("infor");
        slapform.submit({
            form: 'qJp4N7SKz',
            data: {
                fio: document.getElementById("fio").value,
                email: document.getElementById("email").value,
                tel: document.getElementById("tel").value,
                organ: document.getElementById("organ").value,
                soob: document.getElementById("soob").value,
                polit: document.getElementById("polit").value
            }
        }).then(function () {
            infor.style.color = "green";
            infor.innerHTML = "Данные отправлены";
            let s = "input:not([type=\"checkbox\"]), #soob";
            let inps = document.querySelectorAll(s);
            for (let i = 0; i < inps.length; ++i) {
                localStorage.removeItem(inps[i].id);
                inps[i].value = "";
            }
            document.getElementById("polit").checked = false;
        }).catch(function () {
            infor.style.color = "red";
            infor.innerHTML = "Данные не отправлены";
        });
    });

    document.querySelector(".clsbt").addEventListener("click", function () {
        history.pushState({modal: "open"}, "ModalIn", "?form=open");
    });

    let modalPop = document.getElementById("exform");
    modalPop.addEventListener("click", function (e) {
        if (e.target === document.getElementById("exform")) {
            homeURL();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            homeURL();
        }
    });

    document.querySelector(".close").addEventListener("click", function () {
        homeURL();
    });

    let s = "input:not([type=\"checkbox\"]), textarea";
    $(s).on("change", function () {
        localStorage.setItem(this.id, this.value);
    });

    $(s).on("input", function () {
        localStorage.setItem(this.id, this.value);
    });

    $("input[type=\"checkbox\"]").on("click", function () {
        localStorage.setItem(this.id, this.checked);
    });

    let inps = document.querySelectorAll(s);
    for (let i = 0; i < inps.length; ++i) {
        let val = localStorage.getItem(inps[i].id);
        if (val != null) {
            inps[i].value = val;
        }
    }
    let polit = localStorage.getItem("polit") === 'true';
    document.getElementById("polit").checked = polit;
}

window.onpopstate = function (event) {
    if (event.state && event.state.modal === "open") {
        document.querySelector(".main_but").click();
    } else {
        document.querySelector(".close").click();
        homeURL();
    }
};