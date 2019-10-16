'use strict'

const getMoneyBtn = document.getElementsByClassName('getMoneyButton')[0];
const inputAmount = document.getElementById('getAmount');
const selectTag = document.getElementById('cartQuantity');
const cartridgeContainer = document.getElementsByClassName('cartridgeContainer')[0];
const cartridge = document.getElementsByClassName('cartridge')[0];
const cartridgesRating = document.getElementsByClassName('cartridgeRaiting');
const cartridgesInput = document.getElementsByClassName('cartridgeInput');
const cartridgesStatus = document.getElementsByClassName('cartridgeStatus');
let printOutDiv = document.getElementsByClassName('printOutDiv')[0];

function addAndRemove() {
    selectTag.addEventListener('change', ()=> {
        let selectedOption = selectTag.options[selectTag.selectedIndex].value;
        while (true) {
            if(cartridgeContainer.children.length>Number(selectedOption)) {
                cartridgeContainer.lastChild.remove();
            }else if(cartridgeContainer.children.length<Number(selectedOption)){
                let elem = cartridge.cloneNode(true);
                let h4 = elem.getElementsByClassName('headerCartridge')[0];
                h4.innerText = `Кассета ${cartridgeContainer.children.length+1}`;
                cartridgeContainer.append(elem);
            }else {
                break;
            }
        }        
    });
}

function sortAndPrintOut() {
    let stringOut ='';
    let cartridgesInfo = [];
    getMoneyBtn.addEventListener('click',()=> {
        printOutDiv.innerText ='';
        if(inputAmount.value.length !== 0){
            let cartridges = document.getElementsByClassName('cartridge');
            //цикл сбора объектов массива cartridgesInfo
            for(let i=0;i<cartridges.length;i++) {
                let value = Number(cartridgesRating[i]
                            .options[cartridgesRating[i].selectedIndex].value);
                let quantity = Number(cartridgesInput[i].value);
                let status = cartridgesStatus[i]
                            .options[cartridgesStatus[i].selectedIndex].value;
                if(status === 'enabled') cartridgesInfo.push({value: value,quantity: quantity,status: status});
            }
            //цикл пузырьковой сортировки
            for(let i=cartridgesInfo.length-1;i>0;i--) {
                for(let j=0;j<i;j++) {
                    if(cartridgesInfo[j].value > cartridgesInfo[j+1].value) {
                        let first = cartridgesInfo[j];
                        cartridgesInfo[j] = cartridgesInfo[j+1];
                        cartridgesInfo[j+1] = first;
                    }
                }
            }
            //выдача купюр
            if(inputAmount.value % 100 === 0) {                 
                let amountInput = Number(document.getElementsByClassName('amountInput')[0].value);
                let sum = inputAmount.value;
                let j = cartridgesInfo.length-1;
                let i = cartridgesInfo.length-1;
                let quantityRating = 0;
                for(i;i>=0;i--) {
                    if(cartridgesInfo[i].quantity > 0) {
                        if(cartridgesInfo[i].value <= sum) {
                            while(j>0) {
                                if((sum - cartridgesInfo[j].value) >= 0) {
                                    sum-=cartridgesInfo[j].value;
                                    j--;
                                }else{
                                    j--;

                                }
                            }

                        }else {
                            sum-=cartridgesInfo[i].value;
                        }

                        if((sum > 0 && sum % cartridgesInfo[0].value === 0) || (i > 0 && sum === 0)) {
                            amountInput -= cartridgesInfo[i].value;   
                            sum = amountInput;
                            cartridgesInfo[i].quantity -= 1;
                            quantityRating+=1;
                            j = i;
                            i++;
                        
                        }else if(sum % cartridgesInfo[0].value !==0 || sum < 0 || (i===0 && sum === 0 )) {
                            sum = amountInput;
                            j = i-1;
                            stringOut+=`Купюр по ${cartridgesInfo[i].value} выдано ${quantityRating}шт. \n`;
                            quantityRating = 0;
                            
                        }
                    }

                }

            }else{
                alert('сумма должна быть кратной 100');
            }
            printOutDiv.innerText +=stringOut;

        }else{
            alert('Введите сумму');
        }
        stringOut ='';
        cartridgesInfo = [];
    });
}

addAndRemove();
sortAndPrintOut();
