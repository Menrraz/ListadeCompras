let add = document.getElementById('add').addEventListener('click', teste())
// Faça funcionar!
function main() {

}
function addItem() {
    const main = document.querySelector('main')
    main.insertAdjacentHTML('beforeend', `<section id='addItemWindow'></section>`)
    const addItemWindow = document.getElementById('addItemWindow')
    addItemWindow.style.display = 'block'
}
