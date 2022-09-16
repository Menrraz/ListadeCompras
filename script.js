let addFirstItem = document.getElementById('addFirstItem')
addFirstItem.addEventListener('click', addItem)
const mainHTML = document.querySelector('main')
let list = {}
let cart = {}
function main() {

}
function addItem() {
    mainHTML.insertAdjacentHTML('beforeend', 
    `<div id='addItemWindow'>
        ${addDivItemWindow('first')}
    </div>`)
    const addItemWindow = document.getElementById('addItemWindow').style.display = 'block'
    
}
function addDivItemWindow(time) {
    return `
    <div class='centralizar'>
        <label>Adicione um item</label>
        <input type="text" name="NomeDoItem" id="itemName" placeholder='Ex.: Papel Higiênico'>
        <label>Quantidade</label>
        <select>
            <option value="unity">Unidade</option>
            <option value="kg">Quilo</option>
        </select>
        <input type="number" name="quantidade" id="itemQuantity" placeholder='Ex.: 3'>
        <input type="button" value="Adicionar" onclick="add('${time}')">
        <p id='warning'>Preencha todos os dados.</p>
    </div>`
}
function add(time) {
    let addItemWindow = document.getElementById('addItemWindow')
    let itemName = document.getElementById('itemName')
    let itemQuantity = document.getElementById('itemQuantity')
    if (itemName.value == '' || itemQuantity.value == 0) {
        warning.style.color = 'red'
    } else if (time == 'first') {
        list['item1'] = [itemName.value, itemQuantity.value]
        mainHTML.insertAdjacentHTML('beforeend', `<section class='main-card'>
            ${addDivItemWindow()}
            <div class='main-card-header'>
                <p class='list' onclick="showListOrCard('list')">Lista</p>
                <p class='cart' onclick="showListOrCard('cart')">Carrinho</p>
            </div>
            <div class='list-card'>
                <div class='list-card-header'>
                    <p>Nome do Item</p>
                    <p>Quantidade</p>
                </div>
                <p class='noItems'>Sem itens</p>
            </div>
            <div class='cart-card'>
                <div class='cart-card-header'>
                    <p>Nome do Item</p>
                    <p>Quantidade</p>
                    <p>Preço</p>
                </div>
                <p class='noItems'>Sem itens</p>
            </div>    
        </section>`)
        addItemWindow.remove()  
        addFirstItem.remove()
        document.querySelector('.noItems').remove()
    }
     else {
        let items = document.querySelector('.list-card')
        items.insertAdjacentHTML('beforeend', `
        <div class='items'>
            <p class='item-name'>${itemName.value}</p>
            <p class='item-quantity'>${itemQuantity.value}</p>
        </div>
        `)
    }
    localStorage.setItem('teste', JSON.stringify(list))
}
function showListOrCard(show) {
    if (show == 'list') {
        document.querySelector('.list-card').style.display = 'block'
        document.querySelector('.cart-card').style.display = 'none'
        document.querySelector('.list').style.backgroundColor = 'yellow'
        document.querySelector('.cart').style.backgroundColor = 'transparent'
    } else { // if 'cart'
        document.querySelector('.cart-card').style.display = 'block'
        document.querySelector('.list-card').style.display = 'none'
        document.querySelector('.list').style.backgroundColor = 'yellow'
        document.querySelector('.cart').style.backgroundColor = 'transparent'
    }
}
