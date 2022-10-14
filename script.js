let addFirstItem = document.getElementById('addFirstItem')
addFirstItem.addEventListener('click', addItem)
const mainHTML = document.querySelector('main')
let list = {}
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
    document.getElementById('addItemWindow').style.display = 'block'
    
}
function addDivItemWindow(condition) {
    return `
    <div class='centralizar'>
        <label>Adicione um item</label>
        <input type="text" name="NomeDoItem" id="itemName" placeholder='Ex.: Papel Higiênico'>
        <label>Quantidade</label>
        <select id='quantitySelect'>
            <option value="unity">Unidade</option>
            <option value="kg">Quilo</option>
        </select>
        <input type="number" name="quantidade" id="itemQuantity" placeholder='Ex.: 3'>
        <input type="button" value="Adicionar" onclick="add('${condition}')">
        <p id='warning'>Preencha todos os dados.</p>
    </div>`
}

function thereIsAListAlready() {
    
}

function add(where, item) { 
    let itemName = document.getElementById('itemName').value
    let quantity = document.getElementById('itemQuantity').value
    let qtdSelect = document.getElementById('quantitySelect').value
}

function addItemDiv(where, itemKey, itemName, quantity, qtdSelect, price) {
    
}

function addMainCard(item) {
    mainHTML.insertAdjacentHTML('beforeend', `<section class='main-card'>
    ${addDivItemWindow()}
    <div class='main-card-header'>
        <p class='list' onclick="showListOrCard('list')">Lista</p>
        <p class='cart' onclick="showListOrCard('cart')">Carrinho</p>
    </div>
    <div class='list-card'>
        ${item !== undefined ? // If the paramenter is (not) passed 
        `<div class='items'>
            <p class='item-quantity'>${list[item][1][0]}</p>
            <p class='item-name'>${list[item][0]}</p>
            <div class='div-icons'>
                <i class="fas fa-shopping-cart" onclick="addToCartDiv('${item}', ${list[item][1][0]})"></i>
                <i class="fas fa-trash-alt icon" onclick="deleteItem('${item}')"></i>
            </div>
        </div>` : ''/*If not*/}
        <p class='noItems'>Sem itens</p>
    </div>
    <div class='cart-card'>

        <p class='noItems'>Sem itens</p>
    </div>
    <div class='total'>
        <p class='total-p-item'></p>
        <p class='total-p-total'>Total: <span class='total-p-price'>$</p>
    </div>
    <div class='end'>
        <input type='button' value='Finalizar Compras' onclick="localStorage.clear(), window.location.reload()">
    </div>
</section>`)
    writeTotal()
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
        document.querySelector('.list').style.backgroundColor = 'transparent'
        document.querySelector('.cart').style.backgroundColor = 'yellow'
    }
}
function deleteItem(item) {
    list[`${item}`] = ['deleted', '']
    document.querySelector(`.${item}`).remove()
    localStorage.setItem('LSItems', JSON.stringify(list))
    writeTotal()
}
function addToCartDiv(item, quantity) {
    mainHTML.insertAdjacentHTML('beforeend', `
    <div class='overlay-background' onclick="
    document.querySelector('.toCartDiv').remove();
    document.querySelector('.overlay-background').remove()"></div>
    <div class='toCartDiv'>
        <span class='close' onclick="
        document.querySelector('.toCartDiv').remove();
        document.querySelector('.overlay-background').remove()">X</span>
        <label>Quantidade:</label>
        <input type='number' value='${quantity}' id="quantity" placeholder='Quantos?'>
        <label>Quanto custou?</label>
        <input type='number' value='' id='price' placeholder='$1.25' autofocus>
        <p class='first-warning'>SE O PRODUTO FOR MEDIDO EM QUILO COLOQUE O PREÇO DE <span>1 QUILO<span>.</p>
        <p class='second-warning'>Valores inválidos</p>
        <input type='button' value='Para o Carrinho' onclick="toCart('${item}')">
    </div>
    `)
    document.querySelector('.overlay-background').style.display = 'flex'
}
function toCart(item) {
    let price = document.querySelector('#price')
    let quantity = document.querySelector('#quantity')
    if (quantity.value <= 0 || price.value <= 0) {
        document.querySelector('.second-warning').style.color = 'red'
        console.log('valores inválidos')
    } else {
        list[item].push(parseFloat(price.value))
        list[item][1] = [quantity.value, list[item][1][1]] // In the case of a new amount
        localStorage.setItem('LSItems', JSON.stringify(list))
        document.querySelector('.toCartDiv').remove()
        document.querySelector('.overlay-background').remove()
    }
    writeTotal()
}
function writeTotal() {
    let listAmount = 0
    let cartAmount = 0
    let price = 0
    for (let i = 0; i < Object.keys(list).length; i++) {
        list[`item${i}`][2] == undefined ? '': cartAmount++
        if (list[`item${i}`][0] != 'deleted') {
            listAmount++
        }
        if (typeof(list[`item${i}`][2]) == 'number') {
            price = price+(list[`item${i}`][1][0]*list[`item${i}`][2])
        }
    }
    document.querySelector(".total-p-item").innerHTML = `Itens: ${cartAmount}/${listAmount}`
    document.querySelector(".total-p-price").innerHTML = price.toFixed(2)
}
main()
