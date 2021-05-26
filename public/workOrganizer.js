function dragDropFunctionlity() {
  let workers = Array.from(document.querySelectorAll('.worker'))

  workers.forEach(worker => {
    worker.addEventListener('dragstart', dragStartHandler)
  })

  function dragStartHandler(event) {
    event.dataTransfer.setData('text/plain', event.target.id)
    setTimeout(() => {
      event.target.classList.add('hide')
    }, 0)
  }

  const zones = document.querySelectorAll('.zone')

  zones.forEach(zone => {
    zone.addEventListener('dragenter', dragEnter)
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', drop);
  })

  function dragEnter(event) {
    if (event.target.classList.contains('worker')) {
      event.target.classList.remove('drag-over')
    } else {
      event.preventDefault();
      event.target.classList.add('drag-over')
    }
  }

  function dragOver(event) {
    if (event.target.classList.contains('worker')) {
      event.target.classList.remove('drag-over')
    } else {
      event.preventDefault();
      event.target.classList.add('drag-over')
    }
  }

  function dragLeave(event) {
    event.target.classList.remove('drag-over')
  }

  //Fix the DRY 
  function drop(event) {
    if (event.target.classList.contains('worker')) {
      event.target.classList.remove('drag-over')

      const id = event.dataTransfer.getData('text/plain')
      const draggableElement = document.querySelector(`#${id}`)

      event.target.parentElement.append(draggableElement)

      draggableElement.classList.remove('hide')
    } else {
      event.target.classList.remove('drag-over')

      const id = event.dataTransfer.getData('text/plain')
      const draggableElement = document.getElementById(id)
    
      event.target.append(draggableElement)
    
      draggableElement.classList.remove('hide')
    }
  }
}

dragDropFunctionlity()

document.addEventListener('click', event => {
  const clickedElementId = event.target.id

  const clickedElementClass = event.target.className

  switch (clickedElementId) {
    case 'add':
      visibilityStateIdentifier()
      break
    case 'add-worker':
      addWorker()
      dragDropFunctionlity()
      break
    case 'add-zone':
      addZone()
      dragDropFunctionlity()
      break
    case 'remove':
      visibilityStateIdentifierRemove()
      break
    case 'remove-worker':
      removeWorker()
      break
  }

  switch(clickedElementClass) {
    case 'remove-container':
      removeFunctionality(event)
      break
  }
})

function removeFunctionality(event) {
  const containerElement = event.target.closest('.worker-container')

  containerElement.remove()
}

function visibilityStateIdentifierRemove() {
  if (document.querySelector('.remove-specification').classList.contains('visibility-toggler')) {
    document.querySelector('.remove-specification').classList.remove('visibility-toggler')
  } else {
    document.querySelector('.remove-specification').classList.add('visibility-toggler')
  }
}

function removeWorker() {
  const addButtonStateChecker = document.querySelector('.add-specification').firstElementChild.hasAttribute('disabled')

  if (!addButtonStateChecker) {
    removeModeWorkersOn()
  } else {
    removeModeWorkersOff()
  }
}

function removeModeWorkersOn() {
  const addButtons = Array.from(document.querySelector('.add-specification').children)

  addButtons.forEach(addButton => {
    addButton.setAttribute('disabled', true)
  })

  const workers = document.querySelectorAll('.worker')
  
  workers.forEach(worker => {
    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'remove-container')
    removeButton.textContent = 'x'

    worker.closest('.worker-container').append(removeButton)
  })
}

function removeModeWorkersOff() {
  const addButtons = Array.from(document.querySelector('.add-specification').children)

  addButtons.forEach(addButton => {
    addButton.removeAttribute('disabled')
  })

  const workers = document.querySelectorAll('.worker')
  
  workers.forEach(worker => {
    console.log(worker)

    const removeButton = worker.closest('.worker-container').querySelector('.remove-container')

    removeButton.remove()
  })
}

let i = 1;

function addWorker() {
  i++

  const workerContainer = document.createElement('span')
  workerContainer.setAttribute('class', 'worker-container')
  const newInput = document.createElement('input')
  newInput.setAttribute('class', 'worker')
  newInput.setAttribute('id', `worker-${i}`)
  newInput.setAttribute('draggable', `true`)
  workerContainer.append(newInput)
  document.querySelector('#idle-zone').append(workerContainer)
}

function addZone() {
  const newZoneContainer = document.createElement('div')
  const titleInput = document.createElement('input')
  titleInput.setAttribute('class', 'zone-title')
  titleInput.setAttribute('placeholder', 'Name the zone')
  const newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'zone')
  newZoneContainer.append(titleInput)
  newZoneContainer.append(newDiv)
  document.querySelector('.grid-container').append(newZoneContainer)
}

function visibilityStateIdentifier() {
  if (document.querySelector('.add-specification').classList.contains('visibility-toggler')) {
    document.querySelector('.add-specification').classList.remove('visibility-toggler')
  } else {
    document.querySelector('.add-specification').classList.add('visibility-toggler')
  }
}