
// Quando usamos o querySelectorAll ele retorna uma lista de elementos e por isso não podemos usar o addEventListener
const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
});

close.addEventListener("click", () => {
    modal.classList.add("hide");
});