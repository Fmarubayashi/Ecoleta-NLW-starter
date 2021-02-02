


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //funçao anonima que retorna apenas 1 valor pode ser escrita curta assim
    .then( states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>   "
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //funçao anonima que retorna apenas 1 valor pode ser escrita curta assim
    .then( cities => {
        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    // () => {} mesma coisa que criar uma função anonima
    .addEventListener("change", getCities) //passando por referencia


// Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) //passando a funçao por referencia
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    // add or remove uma classe com javascript

    itemLi.classList.toggle("selected") //adiciona ou remove a classe selected, se já existir remove, se não existe ele adiciona

    const itemId = itemLi.dataset.id //Pega os data-id que colocamos como id no html e coloca na const
    
    
    // verificar se exitem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item) { //pode ser arrow function (item=> ...)
        const itemFound = item == itemId //=== é uma igualdade dos números. Existe diferença entre 2 iguais ou 3, mas nesse caso nao precisa saber
        return itemFound
    })
    

    // se já estiver selecionado, tirar da seleção (tirar do array)
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            // return false = remove o item do array que retornou falso
            const itemIsDifferent = item != itemId //retorna um false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems //lembrando que value é o que é passado para a URL

    
} 