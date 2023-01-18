'use strict'
// 1行目に記載している 'use strict' は削除しないでください
let total = 0; //正答

// [START]ボタンクリック
function start(){
    let maxNo = 5; //足合せ数
    console.log("call start");

    total = makeQuestion(maxNo);
}

// [Answer Check]ボタンクリック
function check(){
    let ansVal = document.getElementById('answer');
    console.log("answer:", ansVal);

    //ページを変更
    // //window.location.href = 'パス名'; // 通常の遷移 window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示
    if(ansVal.value == total){
        //collect.htmlへ飛ぶ
        window.location.href = 'collect.html';
    }else{
        //uncollect.htmlへ飛ぶ
        window.location.href = 'incollect.html';
    }
}

function makeQuestion(maxNo){
    let retNum = 0;   //和
    const quesNums = []; //問題の数字配列
    let val;       //表示する各数字

    console.log("call question");

    for(let i = 0; i < maxNo; i++){
        val = Math.floor(Math.random()*100);
        //足し合わせ
        retNum += val;
        quesNums.push(val);
    }
    console.log("retNum:", retNum);
    console.log("quesNums:", quesNums);

    //画面に表示
    // for(let i = 0; i < quesNums.length; i++){
    //     //dispNums(quesNums[i]);
    //     //sleep(1000);
    //     //window.setTimeout("dispNums('"+ quesNums[i] +"')", 1000);
    //     //window.setInterval(dispNums, 1000, quesNums[i]);
    //     //setInterval(dispNums, 1000, quesNums[i]);
    //         // setInterval(() => {
    //         //   console.log("flash num:", quesNums[i]);
    //         //   const mainView = document.getElementById('main');   //表示位置のドキュメント
    //         //   mainView.textContent = quesNums[i];  
    //         // }, 1000);
        
    //         console.log("Go");
    //         sleep(100,dispNums,quesNums[i]);
    //         console.log("Fin");
    // }
    sleep(100,dispNums,quesNums[0]);
    sleep(100,dispNums,quesNums[1]);
    sleep(100,dispNums,quesNums[2]);
    sleep(100,dispNums,quesNums[3]);
    sleep(100,dispNums,quesNums[4]);

    return retNum;
}

function sleep(waitSec, callbackFunc, argNum){
    let spendSec = 0; //経過時間[msec]

    // 1sec間隔で無名関数を実行
    const id = setInterval(() =>{
        spendSec++;

        //経過時間>=待機時間の場合、待機終了
        console.log("spend time = ", spendSec);
        if(spendSec >= waitSec){
            console.log("Stop");
            //タイマー停止
            clearInterval(id);

            //完了後、callbackFunc実行
            if(callbackFunc){
                callbackFunc(argNum);
            }
        }

    }, 1);


}

//数字の表示
function dispNums(num){
    console.log("flash num:", num);
    const mainView = document.getElementById('main');   //表示位置のドキュメント
    mainView.textContent = num;
    //window.location.reload();
}


function back(){
    window.location.href = 'index.html';
}