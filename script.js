let addFirstItem = document.getElementById('addFirstItem')
addFirstItem.addEventListener('click', addItem)
const mainHTML = document.querySelector('main')
let list = {}
let cart = {}
function main() {
    if(localStorage.length > 0) {
        addFirstItem.remove()
        add('ThereIsAList')
    }
}
function addItem() {
    mainHTML.insertAdjacentHTML('beforeend', 
    `<div id='addItemWindow'>
        ${addDivItemWindow('first')}
    </div>`)
    const addItemWindow = document.getElementById('addItemWindow').style.display = 'block'
    
}
function addDivItemWindow(condition) {
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
        <input type="button" value="Adicionar" onclick="add('${condition}')">
        <p id='warning'>Preencha todos os dados.</p>
    </div>`
}
function add(condition) {
    let addItemWindow = document.getElementById('addItemWindow')
    let itemName = document.getElementById('itemName')
    let itemQuantity = document.getElementById('itemQuantity')
    if (condition == 'ThereIsAList') { // If there is a list already
        list = JSON.parse(localStorage.LSItems) // Make list a object again
        addMainCard()
        document.querySelector('.noItems').remove()
        let items = document.querySelector('.list-card')
        for (let i = 0; i < Object.keys(list).length; i++) {
            // If item is deleted it'll ignore it
            if(list['item' + i][0] !== 'deleted') {
                items.insertAdjacentHTML('beforeend', `
                <div class='items'>
                    <p class='item-name'>${list[`item${i}`][0]/*1º element is the name*/}</p> 
                    <p class='item-quantity'>${list[`item${i}`][1]/*2º element is the amount*/}<i class="fas fa-shopping-cart" onclick="addToCartDiv('${list[`item${i}`][0]}', ${list[`item${i}`][1]})"></p><i class="fas fa-trash-alt icon" onclick="deleteItem('${'item' + i}')"></i>
                </div>
                `)
            }
        }
    } else { // If there isn't a list
        if (itemName.value == '' || itemQuantity.value == 0) {
            warning.style.color = 'red'
        } else if (condition == 'first') {
            list[`item${Object.keys(list).length}`] = [itemName.value, itemQuantity.value]
            addMainCard(itemName.value, itemQuantity.value)
            addItemWindow.remove()  
            addFirstItem.remove()
            document.querySelector('.noItems').remove()
        }
         else {
            list[`item${Object.keys(list).length}`] = [itemName.value, itemQuantity.value]
            let items = document.querySelector('.list-card')
            items.insertAdjacentHTML('beforeend', `
            <div class='items'>
                <p class='item-name'>${itemName.value}</p>
                <p class='item-quantity'>${itemQuantity.value}</p>
            </div>
            `)
        }
        localStorage.setItem('LSItems', JSON.stringify(list)) // Make 'list' a string
    }
}
function addMainCard(item, quantity) {
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
        ${item !== undefined || quantity !== undefined ? // If the paramenters are (not) passed 
        `<div class='items'>
            <p class='item-name'>${item}</p>
            <p class='item-quantity'>${quantity}</p>
        </div>` : ''/*If not*/}
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
function deleteItem(item) {
    list[`${item}`] = ['deleted', '']
    localStorage.setItem('LSItems', JSON.stringify(list))
}
