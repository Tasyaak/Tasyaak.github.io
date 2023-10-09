/*jslint browser: true */
window.onload = function () {
    document.getElementById("for").addEventListener("submit", function (e) {
        e.preventDefault();
        let k = document.getElementById("kol").value;
        let towar = document.getElementById("towar");
        let dataPriceEl = towar.options[towar.selectedIndex];
        let dataPrice = dataPriceEl.getAttribute("data-price");
        if (/^\d+$/.test(k) && k >= 0) {
            k = Number(k);
            document.getElementById("Wiwod").innerHTML = k * dataPrice;
        } else {
            document.getElementById("Wiwod").innerHTML = "Неверно" +
            " введено количество товаров";
        }
    });
};