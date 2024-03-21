const input = document.getElementById('input');
const ul = document.getElementById('list');
let todoArray = localStorage.getItem('todos')
	? JSON.parse(localStorage.getItem('todos'))
	: [];

input.addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
		todoArray.push({ title: input.value, done: false });
		localStorage.setItem('todos', JSON.stringify(todoArray));
		// console.log(todoArray);
		input.value = '';
		location.reload();
	}
});

todoArray.forEach((todo) => {
	const li = document.createElement('li');
	li.innerHTML = todo.title;
	ul.appendChild(li);
	li.classList.add('todo');
	const actions = document.createElement('span');
	actions.classList.add('actions');
	const done = document.createElement('span');
	done.innerHTML = '✔';
	done.classList.add('done');
	done.addEventListener('click', (e) => {
		if (!todo.done) {
			li.classList.add('markedDone');
			todo.done = true;
			localStorage.setItem('todos', JSON.stringify(todoArray));
			console.log(todo);
		} else {
			li.classList.remove('markedDone');
			todo.done = false;
			localStorage.setItem('todos', JSON.stringify(todoArray));
			console.log(todo);
		}
	});
	actions.appendChild(done);
	const del = document.createElement('span');
	del.innerHTML = '🗑';
	del.classList.add('del');
	del.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(`to be deleted: ${todo}`);
		console.log(`index of: ${todoArray.indexOf(todo)}`);
		item = todoArray.indexOf(todo);
		if (item != -1) {
			let deleted = todoArray.splice(item, 1);
			localStorage.setItem('todos', JSON.stringify(todoArray));
			console.log(`TodoArray: ${todoArray}`);
			console.log(`deleted: ${deleted}`);
			location.reload();
		}
	});
	actions.appendChild(del);
	li.appendChild(actions);
});
