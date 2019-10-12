'use strict'
// const cartridgeRating = [100,200,500,1000,2000,5000];
const getMoneyBtn = document.getElementsByClassName('getMoneyButton')[0];
const inputAmount = document.getElementById('getAmount');
const selectTag = document.getElementById('cartQuantity');
const cartridgeContainer = document.getElementsByClassName('cartridgeContainer')[0];
const cartridge = document.getElementsByClassName('cartridge')[0];
const cartridgesRating = document.getElementsByClassName('cartridgeRaiting');
const cartridgesInput = document.getElementsByClassName('cartridgeInput');
const cartridgesStatus = document.getElementsByClassName('cartridgeStatus');
// let stringOut ='';
// let cartridgesInfo = [];

function addAndRemoveCartriges() {
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

function getAndSortCartridge() {
    let stringOut ='';
    let cartridgesInfo = [];
    getMoneyBtn.addEventListener('click',()=> {
        let stringOut ='';
        let cartridgesInfo = [];
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

            if(inputAmount.value % cartridgesInfo[0].value === 0 || inputAmount.value % cartridgesInfo[1].value === 0) {
                let amountInput = Number(document.getElementsByClassName('amountInput')[0].value);
                // let stringOut ='';
                //цикл вывода данных
                for(let i=cartridgesInfo.length-1;i>=0;i--) {
                    if(cartridgesInfo[i].status !== 'disabled' && cartridgesInfo[i].quantity > 0) {
                        let quantityRating = 0;
                        while(amountInput >= cartridgesInfo[i].value && cartridgesInfo[i].quantity > 0) {
                            if(i === 1 && (amountInput-cartridgesInfo[i].value) % cartridgesInfo[0].value !== 0 ) {
                                break;
                            }
                            amountInput -= cartridgesInfo[i].value;   
                            cartridgesInfo[i].quantity -= 1;
                            quantityRating+=1;
                        } 
                        stringOut+=`Купюр по ${cartridgesInfo[i].value} выдано ${quantityRating}шт. \n`;
                    }
                }
            }else{
                alert(`сумма должна быть кратной ${cartridgesInfo[0].value} или ${cartridgesInfo[1].value}`);
            }
            console.log(cartridgesInfo);
        }else{
            alert('Введите сумму');
        }
        console.log(stringOut);
    });
    
    console.log(stringOut);
}

// function printOutMoney() {
//     const amountInput = Number(document.getElementsByClassName('amountInput')[0].value);
//     let stringOut ='';
//     for(let i=0;i<cartridgesInfo.length;i++) {
//         if(cartridgesInfo[i].status !== 'disabled' && cartridgesInfo[i].quantity > 0) {
//             let quantityRating = 0;
//             while(amountInput > cartridgesInfo[i].value && cartridgesInfo[i].quantity > 0) {
//                 amountInput -= cartridgesInfo[i].value;   
//                 cartridgesInfo[i].quantity -= 1;
//                 quantityRating+=1;
//             } 
//             stringOut+=`Купюр по ${cartridgesInfo[i].value} выдано ${quantityRating}шт. \n`;
//         }
//     }
//     console.log(stringOut);
// }

addAndRemoveCartriges();
getAndSortCartridge();
// printOutMoney();




