let addFirstItem = document.getElementById('addFirstItem').addEventListener('click', addItem)
function main() {

}
function addItem() {
    const main = document.querySelector('main')
    main.insertAdjacentHTML('beforeend', `
    <section id='addItemWindow'>
        <label>Adicione um item</label>
        <input type="text" name="NomeDoItem" id="itemName">
        <label>Quantidade</label>
        <select>
            <option value="unity">Unidade</option>
            <option value="kg">Quilo</option>
        </select>
        <input type="number" name="quantidade" id="itemQuantity">
        <input type="button" value="Adicionar">
    </section>`)
    const addItemWindow = document.getElementById('addItemWindow')
    addItemWindow.style.display = 'block'
}
