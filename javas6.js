/*jslint browser: true */
window.onload = function () {
    let form = document.getElementById("for");
    let ktext = document.getElementById("kol");
    let rad1 = document.getElementById("rad1");
    let rad2 = document.getElementById("rad2");
    let rad3 = document.getElementById("rad3");
    let select = document.getElementById("towar");
    let ch1 = document.getElementById("ch1");
    let ch2 = document.getElementById("ch2");
    let ch3 = document.getElementById("ch3");
    let ind = 0;

    function stoimost(id) {
        let k = ktext.value;
        if (/^\d+$/.test(k) && k >= 0) {
            k = Number(k);
            let s = 0;
            let selel;
            switch (id) {
            case 1:
                s = k * rad1.getAttribute("data-price");
                break;
            case 2:
                selel = select.options[select.selectedIndex];
                s = k * selel.getAttribute("data-price");
                break;
            case 3:
                s = k * rad3.getAttribute("data-price");
                if (ch1.checked) {
                    s += k * ch1.getAttribute("data-price");
                }
                if (ch2.checked) {
                    s += k * ch2.getAttribute("data-price");
                }
                if (ch3.checked) {
                    s += k * ch3.getAttribute("data-price");
                }
                break;
            }
            document.getElementById("wiwod").innerHTML = s;
        } else {
            document.getElementById("wiwod").innerHTML = "Неверно" +
            " введено количество товаров";
        }
    }

    rad1.addEventListener("click", function () {
        document.getElementById("sel").classList.add("hide");
        document.getElementById("boxes").classList.add("hide");
        ind = 1;
        stoimost(1);
    });
    rad2.addEventListener("click", function () {
        document.getElementById("sel").classList.remove("hide");
        document.getElementById("boxes").classList.add("hide");
        ind = 2;
        stoimost(2);
    });
    rad3.addEventListener("click", function () {
        document.getElementById("sel").classList.add("hide");
        document.getElementById("boxes").classList.remove("hide");
        ind = 3;
        stoimost(3);
    });

    select.addEventListener("change", function () {
        stoimost(2);
    });

    ch1.addEventListener("click", function () {
        stoimost(3);
    });
    ch2.addEventListener("click", function () {
        stoimost(3);
    });
    ch3.addEventListener("click", function () {
        stoimost(3);
    });

    ktext.addEventListener("input", function () {
        stoimost(ind);
    });

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
    });
};