const operator = ['+', '-', '*', '/'];

let app = new Vue({
    el:" #app",
    data(){
        return {
        totalString : "",
        totalNumberDisplay : 0,
        prev : "",
        numStock : [],
        resultStock : [],
        operatorStock : []
        }
    },
    computed: {
        getTotal: function(){

            this.calculatePrep;
            let indexOp = this.operatorStock.length-1;
            let indexRe = this.resultStock.length-1;
            let temp = (indexOp == indexRe)? parseInt(this.resultStock[0]) * -1 : parseInt(this.resultStock[0]);

            if(indexOp != indexRe){
                for(let i = 0; i < this.resultStock.length; i++){
                    if(this.operatorStock[i] === '+') temp += parseInt(this.resultStock[i+1]);
                    else if(this.operatorStock[i] === '-') temp -= parseInt(this.resultStock[i+1]);
                    else if(this.operatorStock[i] === '*') temp *= parseInt(this.resultStock[i+1]);
                    else if(this.operatorStock[i] === '/') temp /= parseInt(this.resultStock[i+1]);
                }
            }
            //先頭にマイナスがあるときの計算
            else{
                for(let i = 1; i <= this.resultStock.length; i++){
                    if(this.operatorStock[i] === '+') temp += parseInt(this.resultStock[i]);
                    else if(this.operatorStock[i] === '-') temp -= parseInt(this.resultStock[i]);
                    else if(this.operatorStock[i] === '*') temp *= parseInt(this.resultStock[i]);
                    else if(this.operatorStock[i] === '/') temp /= parseInt(this.resultStock[i]);
                }
            }
        
            this.totalString = "";
            this.totalNumberDisplay = temp.toLocaleString(10);
            this.clear;
        },
        clear: function(){
            // ACでこれまで入力された要素を全て削除する
            this.numStock.splice(0, this.numStock.length);
            this.resultStock.splice(0, this.resultStock.length);
            this.operatorStock.splice(0, this.operatorStock.length);
            this.totalString = "";
            this.prev = "";
        },
        calculatePrep: function(){
            //「caluculatePrep」関数の概要
            //1.tempは合体し、文字列化した数字の仮保管場所
            //2.numStockの数字をそれぞれ取り出し、演算子より前に入っている数字を文字列として合体する
            //3.合体し終えたら最終結果のための配列に保管し、numStockをクリアする
            let temp = "";
            for(let i = 0; i < this.numStock.length; i++){
                temp += this.numStock[i];
            }
            this.resultStock.push(temp);
            this.numStock.splice(0,this.numStock.length);
        }
    },
    methods : {
        eventManager(event){
            let val = event.target.value;

            if(val == "AC") this.clear;
            else if(val == '=')this.getTotal;
            else if(val == "0" && this.prev == "") null;
            //連続でオペレータが入った時の処理（演算子を最新版に更新する）
            else if(operator.indexOf(this.prev) !== -1 && operator.indexOf(val) !== -1){
                this.operatorStock.splice(this.operatorStock.length-1, 1);
                this.operatorStock.push(val);
                this.totalString = this.totalString.slice(0,-1) + val;
            }
            //先頭に'-'オペレーターが入った時の処理
            else if(val == '-' && this.prev == ""){
                this.operatorStock.push(val);
                this.totalString += val;
            }
            //先頭に'-'以外のoperatorが入った時の処理
            else if(operator.indexOf(val) !== -1 && this.prev == ""){
                this.clear;
            }
            //calculatePrep関数に処理をパスし、演算子より手前の数字を合体させる
            else if(operator.indexOf(val) !== -1){
                this.operatorStock.push(val);
                this.totalString += val;
                this.calculatePrep;
            }
            //文字列として数字を格納する
            else {
                this.totalString += val;
                this.numStock.push(val);
            }
            
            //一つ前のvalを保管する。AC,=の場合は初期化する必要があるため、空の文字列を代入する。また最初に0がきた場合もprevは空にする。
            this.prev = (val == "AC" || val=="=" || val == 0 && this.prev=="")? "" : val;
        } 
    }
})