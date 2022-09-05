let addFirstItem = document.getElementById('addFirstItem')
addFirstItem.addEventListener('click', addItem)
const mainHTML = document.querySelector('main')
function main() {

}
function addItem() {
    mainHTML.insertAdjacentHTML('beforeend', `
    <section id='addItemWindow'>
        <div class='centralizar'>
            <label>Adicione um item</label>
            <input type="text" name="NomeDoItem" id="itemName">
            <label>Quantidade</label>
            <select>
                <option value="unity">Unidade</option>
                <option value="kg">Quilo</option>
            </select>
            <input type="number" name="quantidade" id="itemQuantity">
            <input type="button" value="Adicionar" onclick='add()'>
            <p id='warning'>Preencha todos os dados.</p>
        </div>
    </section>`)
    const addItemWindow = document.getElementById('addItemWindow')
    addItemWindow.style.display = 'block'
    
}
function add() {
    let addItemWindow = document.getElementById('addItemWindow')
    let itemName = document.getElementById('itemName')
    let itemQuantity = document.getElementById('itemQuantity')
    if (itemName.value == '' || itemQuantity.value == 0) {
        warning.style.color = 'red'
    } else {
        mainHTML.insertAdjacentHTML('beforeend', `<section class='main-card'>
            <div class='list'>${itemName.value}${itemQuantity.value}</div>
            <div class='cart'>${itemName.value}${itemQuantity.value}</div>     
        </section>`)
        addItemWindow.remove()  
        addFirstItem.remove()
    }
}
