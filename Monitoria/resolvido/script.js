const addButton = document.getElementById('criar-tarefa');
const orderedList = document.getElementById('lista-tarefas')

const deleteAllButton = document.getElementById('apaga-tudo')
const buttonRemoveCompleted = document.getElementById('remover-finalizados')
const saveButton = document.getElementById('salvar-tarefas')
const deleteSelectedButton = document.getElementById('remover-selecionado')
const moveUpButton = document.getElementById('mover-cima')
const moveDownButton = document.getElementById('mover-baixo')

moveUpButton.addEventListener('click', () => {
  const selected = document.querySelector('.selected')
  if (!selected) {
    alert('Selecione um item')
  } else {
    const firstChild = orderedList.firstElementChild
    const previousElement = selected.previousElementSibling
    if (selected === firstChild) {
      alert('Nao e possivel mover o item para cima')
    }
      orderedList.insertBefore(selected, previousElement)
  }
})

moveDownButton.addEventListener('click', () => {
  const selected = document.querySelector('.selected')
  if (!selected) {
    alert('Selecione um item')
  } else {
    const lastChild = orderedList.lastElementChild
    const nextElement = selected.nextElementSibling
    if (selected === lastChild) {
      alert('Nao e possivel mover o item para baixo')
    }
      orderedList.insertBefore(nextElement, selected)
  }
})

deleteSelectedButton.addEventListener('click', () => {
  const selected = document.getElementsByClassName('selected')[0]
  if (selected) {
    orderedList.removeChild(selected)
  } 
})

saveButton.addEventListener('click', () => {
  localStorage.clear()
  const completed = document.getElementsByClassName('completed')
  const allItems = document.querySelectorAll('li')

  if (completed.length > 0) {
    allItems.forEach((item, index) => {
      localStorage.setItem(`Item${index+1}`, item.innerText)
    })
  }

})

buttonRemoveCompleted.addEventListener('click', () => {
  const completedTaskList = document.querySelectorAll('.completed')
  
  completedTaskList.forEach(item => orderedList.removeChild(item))
})


deleteAllButton.addEventListener('click', () => {
  const allItems = document.querySelectorAll('li')
  allItems.forEach(item => orderedList.removeChild(item))
  console.log(allItems[0])
})

const addCompletedTask = (newItem) => {
  newItem.addEventListener('dblclick', function () {
    if (newItem.classList.contains('completed')) {
      newItem.classList.remove('completed')
    } else {
      newItem.classList.add('completed');
    }
  });
}

const removeSelected = () => {
  const selectedItem = document.getElementsByClassName('selected')[0]
  if (selectedItem) {
    selectedItem.classList.remove('selected')
  }
}

const addSelectEvent = (newItem) => {
  newItem.addEventListener('click', (event) => {
    removeSelected()
    event.target.className = 'selected'
  })
}

addButton.addEventListener('click', () => {
  const inputText = document.getElementById('texto-tarefa')
  const newItem = document.createElement('li')
  newItem.innerText = inputText.value
  orderedList.appendChild(newItem)
  inputText.value = ''

  addSelectEvent(newItem)
  addCompletedTask(newItem)
})

const createNewItemStorage = (newItem) => {
  const newListItem = document.createElement('li')
  newListItem.innerText = newItem
  orderedList.appendChild(newListItem)
}

const initialize = () => {
  for (let item = 1; item <= localStorage.length; item +=1) {
    let create = localStorage[`Item${item}`]
    createNewItemStorage(create)
  }
}

initialize()