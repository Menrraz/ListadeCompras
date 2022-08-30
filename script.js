let add = document.getElementById('add').addEventListener('click', addItem)
// Faça funcionar!
function main() {

}
function addItem() {
    const main = document.querySelector('main')
    main.insertAdjacentHTML('beforeend', `
    <section id='addItemWindow'>
        <label>Adicione um item</label>
        <input type="text" name="NomeDoItem" id="NomeDoItem">
        <label>Quantidade</label>
        <select>
            <option value="unity">Unidade</option>
            <option value="kg">Quilo</option>
        </select>
        <input type="number" name="quantidade" id="quantidade">
        <input type="button" value="Adicionar">
    </section>`)
    const addItemWindow = document.getElementById('addItemWindow')
    addItemWindow.style.display = 'block'
}
