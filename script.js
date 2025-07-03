// mainapi="https://api.frankfurter.app/latest?amount=100&from=USD&to=EUR"

const BaseURL="https://api.frankfurter.app/latest?amount="

const dropdown=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("button");
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg= document.querySelector(".msg")

for(let select of dropdown){
    for(curCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curCode;
        newOption.value=curCode;
        if(select.name==="from" && curCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && curCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag=(element)=>{
    let curCode=element.value;
    let conCode=countryList[curCode];
    let newSrc=`https://flagsapi.com/${conCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();           // prevent all things happening itself due to form
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue===""|| amtValue<0.1){
        amtValue=1;
        amount.value="1";
    }
    const URL=`${BaseURL}${amtValue}&from=${fromCurr.value}&to=${toCurr.value}`
    let response=await fetch(URL);
    let data= await response.json();
    let exchangeAmount=data.rates[toCurr.value]
    msg.innerText=`${amtValue} ${fromCurr.value} is ${exchangeAmount} in ${toCurr.value}`
})