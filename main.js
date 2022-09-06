//유저가 값을 입력한다 o
// +버튼 클릭하면 할일이 추가된다 o
// delete 버튼 클릭하면 할일 삭제
// check 누르면 할일 끝나면서 밑줄 o
// 탭 언더바 이동
// 끝남탭은 끝난것만 , 진행중탭은 진행중인것만
// 전체탭 누르면 전체목록
// 할일 n개 남음 처리하기

let addBtn = document.getElementById('add_btn');
let toggle = false;
let addTaskBox = document.getElementById('add_tasks_box');
let taskInput = document.getElementById('input_task');
let add = document.getElementById('add');
let taskList = [];

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


addBtn.addEventListener("click", addTasksBox);
add.addEventListener("click", addTask);

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

//날짜설정
function daySetting() {
    const date = document.getElementById('date');
    const day = document.getElementById('day');

    date.textContent = `${dateString}`;
    day.textContent = `${dayName}`;
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

function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task_done">${taskList[i].taskContent}</div>
            <div class="btns">
                <button class="check" onclick="toggleCheck('${taskList[i].id}')">Check</button>
                <button class="delete onclick="deleteTask()">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div class="btns">
            <button class="check" onclick="toggleCheck('${taskList[i].id}')">Check</button>
            <button class="delete" onclick="deleteTask()">Delete</button>
        </div>
    </div>`;
        }
    }

    document.getElementById('tasks_box').innerHTML = resultHTML;
}

function toggleCheck(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    render();
}

function deleteTask() {
    console.log("삭제하기");
}

// 랜덤아이디 생성
function randomId(){
    return '_' + Math.random().toString(36).substring(2,9);
}

daySetting();