/**
 * 1-start page
 * 2-ask for pin and account type [parse password ,3 attempts ,then block terminate account]
 * 3-options [withdraw, deposit, check balance, exit]
 * 4-withdraw[maxamount 10000, min amount 50, multiple of 50]
 * 6-deposit [max amount 100000, min amount 50, multiple of 50]
 * 7-check balance [show balance]
 * 8-verfit operation
 * 9-ask for another operation or exit
 * add timeout option for 30 seconds if no activity then exit
 */


/*screens*/
const allScreens = document.querySelectorAll('.screen');
/*inputs*/
const card = document.getElementById('card');
const password = document.getElementById('password');
const withdrawAmount = document.getElementById('withdrawAmount');
const depositAmount = document.getElementById('depositAmount');
/*Regex*/
const cardRegex = /^\d{6}$/;
const passwordRegex = /^\d{4}$/;
/*errors*/ 
const errorLogin = document.querySelector("#loginError");
const errorWithdraw = document.querySelector("#withdrawError");

let currentScreen = "welcome";
let Timer = {
    timer: null,
    Start()
    {
        console.log('started timer');
        this.timer = setTimeout(() => { console.log("timeout"); timeout(); }, 20000);    
    },
    Stop()
    {
        if (this.timer === null)
            return;
        console.log('Ended timer');
        clearTimeout(this.timer);
        this.timer = null;
    },
    Toggle()
    {
        console.log('toggle');
        
        this.Stop();
        this.Start();
    }
};
const DB = myDB;
async function main()
{
    localStorage.removeItem("currentUser");
    await DB.intiate().then(() => DB.LoadData()).then(() => console.log("local storge ready"));
}
function hideAll()
{
    allScreens.forEach(screen =>{screen.classList.remove('active');});
}
function show(elemntId)
{
    if (elemntId === 'welcome')
        Timer.Stop();
    hideAll();
    if (elemntId === 'before')
        elemntId=currentScreen;
    document.getElementById(elemntId).classList.add('active');
    currentScreen = elemntId;
}
function timeout()
{
    hideAll();
    document.getElementById('timeout').classList.add('active');
}
function Input_State_Toggler(elemnt, isValid) {
  if (isValid) {
    elemnt.classList.remove("is-invalid");
    elemnt.classList.add("is-valid");
  } else {
    elemnt.classList.remove("is-valid");
    elemnt.classList.add("is-invalid");
  }
}
function Input_State_Validator(regex, input)
{
    let state = regex.test(input.value);
    Input_State_Toggler(input, state);
    return state;
}
async function login()
{
    let card_syntax = Input_State_Validator(cardRegex, card);
    let password_syntax = Input_State_Validator(passwordRegex, password);
    
    if (card_syntax && password_syntax)
    {
        let user = await DB.get_user(Number(card.value), Number(password.value));
        if (user.state)
        {
            localStorage.setItem('currentUser', JSON.stringify(user.user));
            show('options');
        }
        else
        {
            console.log(" user not found");
            errorLogin.classList.add('active');
            card.value = "";
            password.value = "";
            Input_State_Toggler(card, false);
            Input_State_Toggler(password, false);
        }
    }
}
async function withdraw()
{
    let amount = Number(withdrawAmount.value);
    let valid = (amount >= 50 && amount <= 5000 && amount % 50 === 0);
    Input_State_Toggler(withdrawAmount, valid);
    if (valid)
    {
        let currentUser = await JSON.parse(localStorage.getItem('currentUser'));
        let result = await DB.withdraw(currentUser.card, currentUser.password, amount);
        if (result.state)
        {
            console.log(result);
            show('success');
            setTimeout(() => {show("another");}, 3000);

            withdrawError.classList.add("d-none");
        }
        else
        {
            withdrawError.classList.remove("d-none");
            withdrawAmount.value = "";
            Input_State_Toggler(withdrawAmount, false);
            show('withdraw');
        }
    }
    else
    {
        show('withdraw');
        withdrawAmount.value = "";
        Input_State_Toggler(withdrawAmount, false);
    }
}
async function deposit()
{
    let amount = Number(depositAmount.value);
    let valid = (amount >= 50 && amount <= 10000 && amount % 50 === 0);
    Input_State_Toggler(depositAmount, valid);
    if (valid)
    {
        let currentUser = await JSON.parse(localStorage.getItem('currentUser'));
        let result = await DB.deposit(currentUser.card, currentUser.password, amount);
        if (result.state)
        {
            console.log(result);
            show('success');
            setTimeout(() => { show('another'); }, 3000);
            
        }
    }
    else
    {
        show('deposit');
        depositAmount.value = "";
        Input_State_Toggler(depositAmount, false);
    }
}
async function showBalance()
{
    let currentUser = await JSON.parse(localStorage.getItem('currentUser'));
    let result = await DB.get_Balance(currentUser.card, currentUser.password);
    if (result.state)
    {
        console.log(result);
        show('balance');
        document.querySelector("#balanceValue").innerHTML = result.balance+" EGP";
    }
    else
        console.log(" user not found");
}
async function transactionsHistory()
{
    let currentUser = await JSON.parse(localStorage.getItem('currentUser'));
    let result = await DB.get_history(currentUser.card, currentUser.password);
    if (result.state)
    {
        console.log(result);
        const container = document.querySelector("#transactions_container");
        result.transactions.forEach((element) =>
        {
            let record = document.createElement('tr');
            record.innerHTML = `
            <td>${element.amount}</td>
            <td>${element.type}</td>
            <td>${element.date}</td>
            <td>${element.time}</td>
            `;
            container.appendChild(record);
        });
        show("transactions");
    }
    else
        console.log(" user not found");
}
card.addEventListener("input", () => {
  Input_State_Validator(cardRegex, card);
});
password.addEventListener("input", () => {
  Input_State_Validator(passwordRegex, password);
});
let buttons=document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () =>
    {
      if(button.textContent!=="Exit")
      Timer.Toggle();
  });
});

main();

