const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// Если нажата кнопка начать тест
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Показать правила
}
// Если нажата кнопка закрыть тест
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Закрыть правила
}

// Если нажата кнопка продолжить
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Закрыть правила
    quiz_box.classList.add("activeQuiz"); //Показать тест
    showQuetions(0); //вызов showQestions function
    queCounter(1); //передача 1 параметра в queCounter
    startTimer(30); //вызов startTimer 
    startTimerLine(0); //вызов startTimerLine 
}

let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// Если нажата кнопка начать сначала
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //показать quiz box
    result_box.classList.remove("activeResult"); //спрятать result box
    timeValue = 30; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //вызов showQestions function
    queCounter(que_numb); //передача значения que_numb в queCounter
    clearInterval(counter); //очистить counter
    clearInterval(counterLine); //очистить counterLine
    startTimer(timeValue); //вызов startTimer function
    startTimerLine(widthValue); //вызов startTimerLine 
    timeText.textContent = "Время"; 
    next_btn.classList.remove("show"); //спрятать кнопку далее
}

// Если нажата кнопка выйти
quit_quiz.onclick = ()=>{
    window.location.reload(); //Обновление страницы
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Если нажата кнопка далее
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //если количество вопросов меньше общей длины вопроса
        que_count++; //увелечения значения que_count 
        que_numb++; //увелечения значения the que_numb 
        showQuetions(que_count); //вызов showQestions 
        queCounter(que_numb); //передача значения que_numb в queCounter
        clearInterval(counter); //очистить counter
        clearInterval(counterLine); //очистить counterLine
        startTimer(timeValue); //вызов  startTimer 
        startTimerLine(widthValue); //вызов startTimerLine 
        timeText.textContent = "Время"; 
        next_btn.classList.remove("show"); //спрятать кнопку далее
    }else{
        clearInterval(counter); //очистить counter
        clearInterval(counterLine); //очистить counterLine
        showResult(); //вызов showResult 
    }
}

// Получение вопросов и вариантов 
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //создание нового тега span и div для вопроса и вариантов и передача значения с использованием индекса вопроса
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //добавление новых span tag внутри que_tag
    option_list.innerHTML = option_tag; //добавление новых div tag внутри option_tag
    
    const option = option_list.querySelectorAll(".option");

    // доступность к вариантом ответов
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// новые div tags для  иконок
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//если пользователь выбрал ответ
function optionSelected(answer){
    clearInterval(counter); //очистить counter
    clearInterval(counterLine); //очистить counterLine
    let userAns = answer.textContent; //получение выбранного ответа
    let correcAns = questions[que_count].answer; //получение правильного ответа
    const allOptions = option_list.children.length; //получение всех вариантов ответа
    
    if(userAns == correcAns){ //если пользователь выбрал правильный ответ
        userScore += 1; //добавление 1 бала
        answer.classList.add("correct"); //добавление зеленого цвета к правильному ответу
        answer.insertAdjacentHTML("beforeend", tickIconTag); //добавление значка галочки к правильному выбранному варианту
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //добавление красного цвета к неправильному ответу
        answer.insertAdjacentHTML("beforeend", crossIconTag); //добавление иконки крестика к неправильному ответу
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ // если есть вариант, который совпадает с верным ответом
                option_list.children[i].setAttribute("class", "option correct"); //добавление зеленого цвета к правильному варианту
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //добавление значка галочки к соответствующему варианту
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //после выбранного ответа - отключаются другие
    }
    next_btn.classList.add("show"); //показать кнопку далее после выбранного ответа
}

function showResult(){
    info_box.classList.remove("activeInfo"); //спрятать правила
    quiz_box.classList.remove("activeQuiz"); //спрятать тест
    result_box.classList.add("activeResult"); //показать результаты
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 18){ // если балов больше...
        let scoreTag = '<span>Отлично 🎉, Ваш результат <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 12){ // если балов меньше, чем..
        let scoreTag = '<span>Хорошо 😎, Ваш результат <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // если балов меньше, чем ...
        let scoreTag = '<span>К сожалению 😐, Ваш результат <p>'+ userScore +'</p> из <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //изменение значение timeCount на time value
        time--; //уменьшение значение времени
        if(time < 9){ //если значение таймера меньше 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //0 перед значением времени
        }
        if(time < 0){ //если значение таймера меньше 0
            clearInterval(counter); //очистить таймер
            timeText.textContent = "Время вышло"; 
            const allOptions = option_list.children.length; //получение всех элементов ответов
            let correcAns = questions[que_count].answer; //получение правильного ответа
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //если есть вариант, который соответст. верному ответу
                    option_list.children[i].setAttribute("class", "option correct"); //добавление зеленого цвета к соот. варианту
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //добавление значка галочки к соответствующему варианту
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //как только выбирается вариант ответа, тогда отключаются другие варианты ответа
            }
            next_btn.classList.add("show"); //показать кнопку далее, если пользователь выбрал какой-либо вариант
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 56,5);
    function timer(){
        time += 1; //обновление значения времени на 1
        time_line.style.width = time + "px"; //увеличение ширины time_line с px на значение времени
        if(time > 549){ //если значение времени больше 549
            clearInterval(counterLine); //очистить counterLine
        }
    }
}

function queCounter(index){
    //создание нового тега span и передача номера вопроса и общего количества вопросов
    let totalQueCounTag = '<span><p>'+ index +'</p> из <p>'+ questions.length +'</p> вопросов</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
    //добавление нового тега span внутри bottom_ques_counter
}