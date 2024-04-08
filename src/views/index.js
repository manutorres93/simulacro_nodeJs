document.addEventListener('DOMContentLoaded', getTask);

async function getTask(){
  const response = await fetch('http://localhost:3000/api/v1/students');
  const tasks = await response.json();

  const tbody = document.querySelector('.tabla-tareas');

  tasks.forEach((task) => {
    const { name,identification,age } = task;
    console.log(name);
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${name}</td>
        <td>${identification}</td>
        <td>${age}</td>
        `
    tbody.appendChild(tr);
  });
}