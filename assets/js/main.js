const listaTareas = document.getElementById('tareas')
const listaId = document.getElementById('id-tareas')
const listaBotones = document.getElementById('botones-borrar')
const tareaInput = document.getElementById('nueva-tarea')
const btnAgregar = document.getElementById('agregar-tarea')
const contadorTareas = document.getElementById('cuenta-tareas')
const contadorCompletadas = document.getElementById('cuenta-completadas')
let tareaId = 1
const tareas = [
    { id: tareaId++, nombreTarea: 'Ir a la feria', completado: true },
    { id: tareaId++, nombreTarea: 'Pasear al perro', completado: true },
    { id: tareaId++, nombreTarea: 'Hacer el almuerzo', completado: false },
]

function actualizarContadorCompletadas() {
    const completadas = tareas.filter(tarea => tarea.completado).length
    contadorCompletadas.textContent = `Tareas completadas: ${completadas}`
}

function renderTareas() {
    listaTareas.innerHTML = ''
    listaId.innerHTML = ''
    listaBotones.innerHTML = ''

    tareas.forEach((tarea) => {
        const tareaElemento = document.createElement('li')
        tareaElemento.innerHTML = `<input type="checkbox" class="completado-checkbox" data-id="${tarea.id}" ${tarea.completado ? 'checked' : ''}><p class="${tarea.completado ? 'tachado' : ''}">${tarea.nombreTarea}</p>`
        listaTareas.appendChild(tareaElemento)

        const idElemento = document.createElement('li')
        idElemento.textContent = tarea.id
        listaId.appendChild(idElemento)

        const botonBorrar = document.createElement('button')
        botonBorrar.textContent = 'X'
        botonBorrar.addEventListener('click', () => {
            borrar(tarea.id)
        })
        const botonElemento = document.createElement('li')
        botonElemento.appendChild(botonBorrar)
        listaBotones.appendChild(botonElemento)
    })

    contadorTareas.textContent = `Total de tareas: ${tareas.length}`

    const checkboxes = document.querySelectorAll('.completado-checkbox')
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const id = parseInt(event.target.getAttribute('data-id'))
            toggleCompletado(id, event.target.checked)
        })
    })
}

btnAgregar.addEventListener('click', () => {
    const nuevaTarea = tareaInput.value
    if (nuevaTarea.trim() !== '') {
        tareas.push({ id: tareaId++, nombreTarea: nuevaTarea, completado: false })
        tareaInput.value = ''
        renderTareas()
        actualizarContadorCompletadas()
    } else {
        alert('Por favor ingresa una nueva tarea.')
    }
})

function borrar(id) {
    const indice = tareas.findIndex((tarea) => tarea.id === id)
    if (indice !== -1) {
        tareas.splice(indice, 1)
        renderTareas()
        actualizarContadorCompletadas()
    }
}

function toggleCompletado(id, completado) {
    const tarea = tareas.find((tarea) => tarea.id === id)
    if (tarea) {
        tarea.completado = completado
        actualizarContadorCompletadas()
        renderTareas()
    }
}

renderTareas()
actualizarContadorCompletadas()