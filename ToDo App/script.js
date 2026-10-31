const headSearch = document.getElementById("head-search");
const addTask = document.getElementById("add-task");
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const done = document.getElementById("doneTodo");
const notYet = document.getElementById("notyet");
const all = document.getElementById("allTodo")
const addStorage =
    JSON.parse(localStorage.getItem("todoweb1")) || [];

add.addEventListener("click", function(){
    const old = document.getElementById("new1");

    if (old) {
        old.remove();
    }
    if (addTask.value.trim() === "") {
        headSearch.insertAdjacentHTML("beforeend", `
        <div id="new1">
            <p>Silahkan Masukan Tugas Anda Terlebih Dahulu!</p>
        </div>`);
        return;
    };
    addStorage.push({
        task : addTask.value,
        done : false
        });
    addTask.value = "";
    display()
    saved()
});

addTask.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
    event.preventDefault();
    add.click();
    }
});

addTask.addEventListener("focus", function(){
    const warning = document.getElementById("new1");

    if (warning) {
        warning.remove();
    }
})

clear.addEventListener("click", function(){
    addStorage.splice(0, addStorage.length)
    display()
    saved()
})

function display (){
    notYet.innerHTML = "<p>NOT YET</p>";
    done.innerHTML = "<p>DONE</p>";
    all.innerHTML = "<p>ALL TASK</p>";

    for (let i = 0; i < addStorage.length; i ++) {
        const addHTML = `
        <div class="list" id="${addStorage[i].done ? 'done' : 'not-yet'}">
        <button class="button" onclick="toggleTodo(${i})">
            ${addStorage[i].done ? "✅" : "🔳"}
            </button>
            <div class="element">
            <p class="text" ${addStorage[i].done ? `style="text-decoration: line-through; color: gray;"` : ''}>${addStorage[i].task}</p>
                <div class="status">
                ${addStorage[i].done ? `Done` : `Not Yet`}
                </div>
            </div>
            <button class="button" onclick="removeTodo(${i})">❌</button>
        </div>
        `;
        if (addStorage[i].done){
            done.innerHTML += addHTML;
        } else {
            notYet.innerHTML += addHTML;
        }

        all.innerHTML += addHTML
    }
}

function toggleTodo (index) {
    addStorage[index].done = !addStorage[index].done;
    display()
    saved()
}

function saved () {
    localStorage.setItem(
        "todoweb1",
        JSON.stringify(addStorage)
    )
}

function removeTodo (index) {
    addStorage.splice(index, 1)
    display()
    saved()
}
display()