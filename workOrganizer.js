let workers = Array.from(document.querySelectorAll('.worker'))

workers.forEach(worker => {
  worker.addEventListener('dragstart', dragStartHandler)
})


// Hacky solution towards dragging and dropping dynamic elements
setInterval(() => {
  workers = Array.from(document.querySelectorAll('.worker'))

  workers.forEach(worker => {
    worker.addEventListener('dragstart', dragStartHandler)

    console.log(worker)
  })
}, 0)

function dragStartHandler(event) {
  event.dataTransfer.setData('text/plain', event.target.id)
  console.log(event.target.id)
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
  event.preventDefault();
  event.target.classList.add('drag-over')
}

function dragOver(event) {
  event.preventDefault();
  event.target.classList.add('drag-over')
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
  
    console.log(draggableElement)

    event.target.append(draggableElement)
  
    draggableElement.classList.remove('hide')
  }
}




document.addEventListener('click', event => {
  const clickedElement = event.target.id

  switch (clickedElement) {
    case 'add':
      visibilityStateIdentifier()
      break
    case 'add-worker':
      addWorker()
      break
  }
})

let i = 1;

function addWorker() {
  i++

  const newInput = document.createElement('input')
  newInput.setAttribute('class', 'worker')
  newInput.setAttribute('id', `worker-${i}`)
  newInput.setAttribute('draggable', `true`)
  document.querySelector('#idle-zone').append(newInput)
}

function visibilityStateIdentifier() {
  if (document.querySelector('.add-specification').classList.contains('visibility-toggler')) {
    document.querySelector('.add-specification').classList.remove('visibility-toggler')
  } else {
    document.querySelector('.add-specification').classList.add('visibility-toggler')
  }
}