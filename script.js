'use strict'
// 1行目に記載している 'use strict' は削除しないでください
let total = 0; //正答
//let digit = 2; //桁数
//let interval = 1; //表示間隔 
let globalIndex = 1; //1:フラシュ暗算、2:かけ算

const sleep = function(waitMSec, callbackFunc, argNum){
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

const syncDelay = function(msec){
    let start = new Date().getTime();
    let end = 0;
    while( (end-start) < msec){
        end = new Date().getTime();
    }
}

//数字の表示
const dispNums = function(num, msec){
    //console.log("flash num:", num);
    const mainView = document.getElementById('main');   //表示位置のドキュメント
    mainView.textContent = num;
    syncDelay(msec);
    //window.location.reload();
}
   


const makeQuestion = function(maxNo){
    let retNum = 0;      //和
    const quesNums = []; //問題の数字配列
    let val;             //表示する各数字
    //const waitMSec = 800;  //表示間隔

    const waitMSec = document.getElementById('interval').value * 1000;
    //console.log("interval:", waitMSec);

    const digit = document.getElementById('digit').value;
    //console.log("digit:", digit);

    //console.log("call question");

    if(globalIndex == 1){
        //フラッシュ暗算
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
    } else {
        //かけ算
        let val1 = Math.floor(Math.random()*(10**digit));
        while(val1 === 0){
            val1 = Math.floor(Math.random()*(10**digit));
        }
        //かける側は1桁固定
        let val2 = Math.floor(Math.random()*(10**1));
        while(val2 === 0){
            val2 = Math.floor(Math.random()*(10**1));
        }
        //かけ合わせ
        retNum = val1 * val2;
        quesNums.push(`${val1} x ${val2}`);
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


// [START]ボタンクリック
const start = function(){
    //console.log("call start");
    //console.log("total at start func:", total);
    if(globalIndex == 1){
        //フラッシュ暗算
        let maxNo = 5; //足合せ数
        total = makeQuestion(maxNo);
    }else{
        //かけ算
        let maxNo = 2; //かけ合わせ数
        total = makeQuestion(maxNo);
    }
}

// [Answer Check]ボタンクリック
const check = function(){
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
        window.location.href = 'collect.html?name=' + interval + '&name2=' + digit + '&name3=' + globalIndex;
    }else{
        //uncollect.htmlへ飛ぶ
        window.location.href='incollect.html?name=' + total + '&name2=' + interval + '&name3=' + digit + '&name4=' + globalIndex;
        //window.location.href='incollect.html?name=' + total;
    }
}


const back = function(interval, digit, index){
    //window.location.href = 'index.html';
    //console.log("Go back to main page.")
    //console.log("interval =",interval);
    //console.log("digit =",digit);
    //window.location.href = 'main.html?name=' + interval + '&name2=' +  digit;
    window.location.href = 'main.html?name=' + interval + '&name2=' +  digit + '&name3=' +  index;
}

const dispAnswer = function(collectNum){
    //console.log("call disp answer! total = ", collectNum);
    let dispStr = `正しい答えは「${collectNum}」です`;
    //document.getElementById("collect_answer").innerHTML = dispStr;
    //document.getElementById("collect_answer").textContent = dispStr;
    //const id = document.getElementsByTagName("h1")[0].innerText = dispStr;
    document.getElementById("collect_answer").innerHTML = dispStr;
}


const resetSetting = function(interval, digit, index){
    //console.log("call reset settings. interval = ", interval);
    document.getElementById('interval').value =  interval;
    //console.log("call reset settings. digit = ", digit);
    document.getElementById('digit').value =  digit;

    console.log("call reset settings. index = ", index);
    //console.log("index type = ", typeof index);
    globalIndex = index;
    if(index == 1){
        document.getElementById('title').innerHTML =  "フラッシュ暗算";
    }else{
        document.getElementById('title').innerHTML =  "かけ算";
    }
}

const nextPage = function(interval, digit, index){
    window.location.href = 'main.html?name=' + interval + '&name2=' +  digit + '&name3=' +  index;
}
