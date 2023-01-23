'use strict'
// 1行目に記載している 'use strict' は削除しないでください
let total = 0; //正答
//let digit = 2; //桁数
//let interval = 1; //表示間隔 

// [START]ボタンクリック
function start(){
    let maxNo = 5; //足合せ数
    //console.log("call start");

    total = makeQuestion(maxNo);
    //console.log("total at start func:", total);
}

// [Answer Check]ボタンクリック
function check(){
    let ansVal = document.getElementById('answer');
    //console.log("answer:", ansVal);

    const interval = document.getElementById('interval').value;
    //console.log("interval:", interval);

    const digit = document.getElementById('digit').value;
    //console.log("digit:", digit);


    //ページを変更
    // //window.location.href = 'パス名'; // 通常の遷移 window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示
    if(ansVal.value == total){
        //collect.htmlへ飛ぶ
        //window.location.href = 'collect.html';
        window.location.href = 'collect.html?name=' + interval + '&name2=' + digit;
    }else{
        //uncollect.htmlへ飛ぶ
        window.location.href='incollect.html?name=' + total + '&name2=' + interval + '&name3=' + digit;
        //window.location.href='incollect.html?name=' + total;
    }
}

function makeQuestion(maxNo){
    let retNum = 0;      //和
    const quesNums = []; //問題の数字配列
    let val;             //表示する各数字
    //const waitMSec = 800;  //表示間隔

    const waitMSec = document.getElementById('interval').value * 1000;
    //console.log("interval:", waitMSec);

    const digit = document.getElementById('digit').value;
    //console.log("digit:", digit);

    //console.log("call question");

    let lastNum = 0;
    for(let i = 0; i < maxNo; i++){
        val = Math.floor(Math.random()*(10**digit));
        while(val === lastNum || val === 0){
            val = Math.floor(Math.random()*(10**digit));
        }
        lastNum = val;
        //足し合わせ
        retNum += val;
        quesNums.push(val);
    }
    console.log("問題:", quesNums);
    console.log("答え:", retNum);

    //画面に表示
    for(let i = 0; i < quesNums.length; i++){
        sleep(waitMSec, dispNums, quesNums[i]);
    }
    sleep(waitMSec, dispNums, "　　");
    return retNum;
}

function sleep(waitMSec, callbackFunc, argNum){
    let spendSec = 0; //経過時間[msec]

    // 1sec間隔で無名関数を実行
    const id = setInterval(() =>{
        spendSec++;

        //経過時間>=待機時間の場合、待機終了
        //console.log("spend time = ", spendSec);
        //if(spendSec >= waitMSec){
            //タイマー停止
            clearInterval(id);
            //完了後、callbackFunc実行
            if(callbackFunc){
                callbackFunc(argNum, waitMSec);
            }
        //}

    }, 1);
}

function syncDelay(msec){
 let start = new Date().getTime();
 let end = 0;
 while( (end-start) < msec){
     end = new Date().getTime();
 }
}

//数字の表示
function dispNums(num, msec){
    //console.log("flash num:", num);
    const mainView = document.getElementById('main');   //表示位置のドキュメント
    mainView.textContent = num;
    syncDelay(msec);
    //window.location.reload();
}

function back(interval, digit){
    //window.location.href = 'index.html';
    //console.log("Go back to main page.")
    //console.log("interval =",interval);
    //console.log("digit =",digit);
    window.location.href = 'index.html?name=' + interval + '&name2=' +  digit;
}

function dispAnswer(collectNum){
    //console.log("call disp answer! total = ", collectNum);
    let dispStr = `正しい答えは「${collectNum}」です`;
    //document.getElementById("collect_answer").innerHTML = dispStr;
    //document.getElementById("collect_answer").textContent = dispStr;
    //const id = document.getElementsByTagName("h1")[0].innerText = dispStr;
    document.getElementById("collect_answer").innerHTML = dispStr;
}


function resetSetting(interval, digit){
    //console.log("call reset settings. interval = ", interval);
    document.getElementById('interval').value =  interval;
    //console.log("call reset settings. digit = ", digit);
    document.getElementById('digit').value =  digit;
}

