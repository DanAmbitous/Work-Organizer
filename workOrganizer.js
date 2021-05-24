const worker = document.querySelector('.worker')

worker.addEventListener('dragstart', dragStart)

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id)
  setTimeout(() => {
    document.querySelector('#idle-zone').append(event.target)
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
  event.preventDefault()
  event.target.classList.add('drag-over');

}

function dragOver(event) {
  event.preventDefault()

  event.target.classList.add('drag-over');

}

function dragLeave(event) {
  event.target.classList.remove('drag-over');

}

function drop(event) {
  event.target.classList.remove('drag-over');

  const id = event.dataTransfer.getData('text/plain')
  const draggable = document.getElementById(id)

  event.target.append(draggable)

  draggable.classList.remove('hide')
}