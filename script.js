let addFirstItem = document.getElementById('addFirstItem')
addFirstItem.addEventListener('click', addItem)
const mainHTML = document.querySelector('main')
let list = {}
function main() {
    if(localStorage.length > 0) {
        addFirstItem.remove()
        thereIsAListAlready()
    }
}
function addItem() {
    mainHTML.insertAdjacentHTML('beforeend', 
    `<div id='addItemWindow'>
        ${addDivItemWindow()}
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
        <input type="button" value="Adicionar" onclick="add('list')">
        <p id='warning'>Preencha todos os dados.</p>
    </div>`
}

function thereIsAListAlready() {
    if (localStorage.length > 0) {
        addMainCard()
        // There is two of it
        document.querySelector('.noItems').remove();document.querySelector('.noItems').remove()
        
        list = JSON.parse(localStorage.LSItems) // Make list a object again
        let listLength = Object.keys(list).length
        for (let i = 0; i < listLength; i++) {
            let itemKey = 'item' + i
            let itemName = list['item' + i][0]
            let quantity = list['item' + i][1][0]
            let qtdSelect = list['item' + i][1][1] == 'kg' ? 'kg': ''
            let price =  typeof list['item' + i][2] == 'number'? list['item' + i][2]: ''
            // If item is not deleted or if there ins't a price
            if (list['item' + i][0] !== 'deleted' && typeof list[itemKey][2] !== "number") {
                addItemDiv('list', itemKey, itemName, quantity, qtdSelect, null)
            // if there is a price
            } else if (list['item'+ i][2] !== undefined) {
                addItemDiv('cart', itemKey, itemName, quantity, qtdSelect, price)
            }
        }
    }
    writeTotal()
}

function add(where, item) { 
    let itemName = document.getElementById('itemName').value
    let quantity = document.getElementById('itemQuantity').value
    let qtdSelect = document.getElementById('quantitySelect').value
    // If the inputs are empty and it's not toCart() calling
    if ((itemName == '' || quantity == '') && item == undefined) {
        warning.style.color = 'red'
        setTimeout(function(){warning.style.color = 'transparent'}, 4000)
    } else {
        let itemKey = 'item' + Object.keys(list).length
        // If there isn't a list already
        if (localStorage.length == 0) {
            addMainCard()
            addFirstItem.remove()
            document.getElementById('addItemWindow').remove()  
            document.querySelector('.noItems').remove()
            document.querySelector('.noItems').remove()
        }
        if (where == 'list') {
            list[itemKey] = qtdSelect == 'kg' ? [itemName, [quantity, 'kg']]:[itemName, [quantity]]
            addItemDiv(where, itemKey, itemName, quantity, qtdSelect, null)
        }
        if (where == 'cart') {
             // Get the inputs from the toCartDiv
            itemName = list[item][0]
            // (Try) - When getting the input form toCartDiv. (Catch) - When thereIsAListAlready calls
            try {quantity = document.querySelector("#toCartQuantity").value} catch{quantity = list[item][1][0]}
            qtdSelect = list[item][1][1]
            let price = document.querySelector('#price').value
            addItemDiv(where, item, itemName, quantity, qtdSelect, price)
        }
        localStorage.setItem('LSItems', JSON.stringify(list)) // Make 'list' a string
        writeTotal()
    }
}

function addItemDiv(where, itemKey, itemName, quantity, qtdSelect, price) {
    // Select and identify where the item will go, cart or list
    let list = document.querySelector('.list-card')
    let cart = document.querySelector('.cart-card')
    let div = where == 'list' ? list : cart
    qtdSelect = qtdSelect == 'kg' ? 'kg': '' 
    let priceTotal = price*quantity
    
    function addDivIcons(where) {
        // It always return the trash icon
        return `
        <div class='div-icons'>
            ${where == 'list' ? `<i class='fas fa-shopping-cart' onclick="addToCartDiv('${itemKey}', '${quantity}')"></i>`:''}
            <i class="fas fa-trash-alt icon" onclick="deleteItem('${itemKey}')"></i>
        </div>`
    }
    function addDivPrice(where) {
        return where == 'cart'? `
        <div class='div-price'>
            <p class='item-price'>$${priceTotal.toFixed(2)}</p>
            <p class='item-price-unity'>${Number(price).toFixed(2)}</p>
        </div>`: ''
    }
    div.insertAdjacentHTML('beforeend', `
        <div class='items ${itemKey}'>
            <p class='item-quantity'>${quantity}${qtdSelect}</p>
            <p class='item-name'>${itemName}</p>
            ${addDivPrice(where)}
            ${addDivIcons(where)}
        </div>`)
}

function addMainCard() {
    mainHTML.insertAdjacentHTML('beforeend', `<section class='main-card'>
    ${addDivItemWindow()}
    <div class='main-card-header'>
        <p class='list' onclick="showListOrCard('list')">Lista</p>
        <p class='cart' onclick="showListOrCard('cart')">Carrinho</p>
    </div>
    <div class='list-card'>
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
    try{ deleteDiv() }catch{} // It delete the previous confirmDiv if there is one
    // Catch the deleted item name and return a truncated version if needed 
    let itemTruncated = list[item][0].length > 11 ? list[item][0].slice(0, 12) + "...": list[item][0] 
    function deleteDiv(){window.document.querySelector(".confirmDiv").remove()}
    function confirmDiv() {
        let timeId = setTimeout(deleteDiv, 3500)
        mainHTML.insertAdjacentHTML("beforeend", `
        <div class='confirmDiv'>
            <p>${itemTruncated} deletado <span onclick="ondo(${timeId}, '${list[item][0]}', '${list[item][1][0]}', '${list[item][1][1]}', ${list[item][2]})">DESFAZER</span></p>
        </div>
        `)
    }
    confirmDiv()
    list[`${item}`] = ['deleted', '']
    document.querySelector(`.${item}`).remove()
    localStorage.setItem('LSItems', JSON.stringify(list))
    writeTotal()
}
function undo(timeId, itemName, quantity, qtdSelect, price) {
    clearTimeout(timeId)
    document.querySelector('.confirmDiv').remove()
    let itemKey = 'item' + Object.keys(list).length
    let where = typeof price == 'number' ? 'cart': 'list'
    if (where == 'list') {
        list[itemKey] = qtdSelect == 'kg' ? [itemName, [quantity, 'kg']] : [itemName, [quantity]]
        addItemDiv(where, itemKey, itemName, quantity, qtdSelect, null)
    } else { // if 'cart
        list[itemKey] = qtdSelect == 'kg' ? [itemName, [quantity, 'kg'], price] : [itemName, [quantity], price]
        addItemDiv(where, itemKey, itemName, quantity, qtdSelect, price)
    }
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
        <input type='number' value='${quantity}' id="toCartQuantity" placeholder='Quantos?'>
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
    let quantity = document.querySelector('#toCartQuantity')
    if (quantity.value <= 0 || price.value <= 0) {
        document.querySelector('.second-warning').style.color = 'red'
        setTimeout(function(){document.querySelector('.second-warning').style.color = 'transparent'}, 4000)
    } else {
        add('cart', item)
        list[item].push(parseFloat(price.value))
        list[item][1] = [quantity.value, list[item][1][1]] // In the case of a new amount
        localStorage.setItem('LSItems', JSON.stringify(list))
        document.querySelector('.toCartDiv').remove()
        document.querySelector('.overlay-background').remove()
        document.querySelector(`.${item}`).remove()
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
