//notDone, Done일 때 삭제하기
//빈칸일때 추가 안되게하기
//체크시 삭제 가능하게하기
//all, done일때 할일 n개 남음 설정 (체크, 삭제)

let addBtn = document.getElementById('add_btn');
let toggle = false;
let addTaskBox = document.getElementById('add_tasks_box');
let taskInput = document.getElementById('input_task');
let add = document.getElementById('add');
let tabs = document.querySelectorAll('.tab_list li');
let taskList = [];
let mode = "all";
let filterList = [];
let tasks = document.getElementById('tasks');

// 현재 날짜
const today = new Date();
const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long'
});
console.log(dateString);

//이벤트
addBtn.addEventListener("click", addTasksBox);
add.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        addTask(event);
    }
})

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

//날짜설정
function daySetting() {
    const date = document.getElementById('date');
    const day = document.getElementById('day');

    date.textContent = `${dateString}`;
    day.textContent = `${dayName}`;
}

daySetting();

// 탭
function filter(e) {
    if(e) {
    mode = e.target.id;
    // console.log("filter click", e.target.id);

    document.getElementById('line').style.width = 
        e.target.offsetWidth + "px";
    document.getElementById('line').style.top = 
        e.target.offsetTop + e.target.offsetHeight - 3 +"px";
    document.getElementById('line').style.left = 
        e.target.offsetLeft + "px";
    }
    
    filterList = [];

    if(mode == "all") {
        render();
    } else if (mode == "notDone") {
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

// 할일 추가 버튼1
function addTasksBox(){
    toggle = !toggle;

    if(toggle) {
        addBtn.style.transform = "translate(-50%, 50%) rotate(45deg)";
        addTaskBox.style.display = "block";
    } else {
        addBtn.style.transform = "translate(-50%, 50%) rotate(0deg)";
        addTaskBox.style.display = "none";
    }
}

// 할일list
function addTask() {
    //객체
    let task = {
        id: randomId(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    console.log(taskList)

    taskInput.value = "";

    render();
}

// 렌더
function render(){
    let resultHTML = '';
    let list = [];

    if(mode == "all"){
        list = taskList;
    } else {
        list = filterList;
    }
    
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task_done">${list[i].taskContent}</div>
            <div class="btns">
                <button class="check" onclick="toggleCheck('${list[i].id}')">Check</button>
                <button class="delete onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="btns">
            <button class="check" onclick="toggleCheck('${list[i].id}')">Check</button>
            <button class="delete" onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }
    }

    tasks.textContent = `할 일 ${taskList.length}개`;
    document.getElementById('tasks_box').innerHTML = resultHTML;
}

// 체크
function toggleCheck(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

//삭제
function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    console.log(taskList)
    filter();
}

// 랜덤아이디 생성
function randomId(){
    return '_' + Math.random().toString(36).substring(2,9);
}
