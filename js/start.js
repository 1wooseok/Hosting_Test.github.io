const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('.result');
const question_box = document.querySelector('.question_box');
const answer_box = document.querySelector('.answer_box');
const btn_start = document.querySelector('.btn');
const desc1 = document.querySelector('.desc1');
const desc2 = document.querySelector('.desc2');
const result_img = document.querySelector('.result_img');


var selected = [];
const endPoint = 12;
let qIdx = 0;

var counting = [                //ex> cow에 접근하려면 cow = counting[i].animal;
    {animal: 'cow', count:0, index:1},
    {animal: 'tiger', count:0, index:2 },
    {animal: 'monkey', count:0, index:8},
    {animal: 'dragon', count:0, index:4},
    {animal: 'chick', count:0, index:9},
    {animal: 'mouse', count:0, index: 0},
    {animal: 'rabbit', count:0, index:3},
    {animal: 'horse', count:0, index:6},
    {animal: 'snake', count:0, index:5},
    {animal: 'dog', count:0, index:10},
    {animal: 'pig', count:0, index:11},
    {animal: 'sheep', count:0, index:7}
];

function goResult() {
    qna.style.WebkitAnimation = 'fadeOut 0.7s';
    qna.style.animation = 'fadeOut 0.7s';
    setTimeout(() => {
        result.style.WebkitAnimation = 'fadeIn 0.7s';
        result.style.animation = 'fadeIn 0.7s';
        setTimeout(() => {
            qna.classList.add('none');
            result.classList.toggle('none');
        }, 300)
    }, 300); 
    paintResult();  
}

function fadeIn() {
    qna.style.WebkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
}

function paintAnswer(text, myAnswer) {
    const answer_btn = document.createElement('button');
    answer_box.append(answer_btn);
    answer_btn.classList.add("answer_btn");
    answer_btn.classList.add("mx-auto");
    answer_btn.classList.add("fadeOut");
    answer_btn.classList.add(myAnswer);
    answer_btn.style.display = 'block';
    answer_btn.innerHTML = text;

    answer_btn.addEventListener('click', function() {
        var answer_list = document.querySelectorAll('.answer_btn');
        for(let i=0; i < answer_list.length; i++){
            answer_list[i].disabled = true;
            answer_list[i].style.WebkitAnimation = 'fadeOut 0.05s';
            answer_list[i].style.animation = 'fadeOut 0.05s';
            answer_list[i].style.display = 'none';
        }  
        selected[qIdx] = myAnswer;
            
        for(let s=0; s<3; s++){           // s -> 문제 개수만큼 반복
            if(selected[qIdx] == s){
                for(let k=0; k < qnaList[qIdx].a[s].type.length; k++) {
                    for(let c=0; c<counting.length; c++) {
                        if(qnaList[qIdx].a[s].type[k] === counting[c].animal) {
                            counting[c].count++;
                        }
                    }
                }  
            }
        }
        qIdx++;
        goNext();     
    }); 
}

function paintResult() {
    let max = -1;
    var target_index;
    
    for(let i=0; i<counting.length; i++){
        if(counting[i].count > max) {
            max = counting[i].count;
            target_index = counting[i].index;
        }
    }
    console.log(target_index);

    //img src=`./img/image-${target_index}.png`;

    //const IMG = document.createElement(img);

    desc1.innerHTML = infoList[target_index].name;
    result_img.src = `./img/image-${target_index}.png`;
    result_img.style.width = 80+'%';
    desc2.innerHTML = infoList[target_index].desc;
}

function goNext() {
    if(qIdx === endPoint){
        goResult();
        return;
    }

    question_box.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a) {      //버튼을 하나씩 3개 생성.(3개 = 배열a의 길이)
        paintAnswer(qnaList[qIdx].a[i].answer, i); 
    }
    var status = document.querySelector('.status_bar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function startBtn_Handler() {
    main.style.WebkitAnimation = 'fadeOut 0.7s';
    main.style.animation = 'fadeOut 0.7s';
    setTimeout(() => {
        qna.style.WebkitAnimation = 'fadeIn 0.7s';
        qna.style.animation = 'fadeIn 0.7s';
        setTimeout(() => {
            main.classList.add('none');
            qna.classList.toggle('none');
        }, 300)
        goNext();  
    }, 300);    
}

function init(){
    btn_start.addEventListener("click", startBtn_Handler);
}

init(); 