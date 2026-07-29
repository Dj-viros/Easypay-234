/* ======================================
        EASYPAY SCRIPT.JS
====================================== */

// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {

setTimeout(() => {

const loader = document.getElementById("loader");

if(loader){

loader.style.display = "none";

}

},1500);

});

// ===============================
// PAGE NAVIGATION
// ===============================

const pages=document.querySelectorAll(".page");

function showPage(pageId){

pages.forEach(page=>{

page.classList.remove("active");

});

const page=document.getElementById(pageId);

if(page){

page.classList.add("active");

window.scrollTo(0,0);

}

}

// ===============================
// NOTIFICATIONS
// ===============================

function showNotification(title,message,type="success"){

const container=document.querySelector(".notificationContainer");

if(!container)return;

const box=document.createElement("div");

box.className="notification "+type;

box.innerHTML=`

<h4>${title}</h4>

<p>${message}</p>

`;

container.appendChild(box);

setTimeout(()=>{

box.remove();

},3000);

}

// ===============================
// LOCAL STORAGE
// ===============================

function saveUser(user){

localStorage.setItem("easyPayUser",JSON.stringify(user));

}

function getUser(){

return JSON.parse(localStorage.getItem("easyPayUser"));

}

function loginUser(){

localStorage.setItem("easyPayLoggedIn","true");

}

function logoutUser(){

localStorage.removeItem("easyPayLoggedIn");

}

function isLoggedIn(){

return localStorage.getItem("easyPayLoggedIn")==="true";

}

// ===============================
// REGISTER SYSTEM
// ===============================

const registerForm=document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",(e)=>{

e.preventDefault();


const username=document.getElementById("username").value.trim();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

const confirmPassword=document.getElementById("confirmPassword").value;

const nationality=document.getElementById("nationality").value;

const phone=document.getElementById("phone").value.trim();


// Username check

if(username.length < 4){

showNotification(
"Invalid Username",
"Username must be at least 4 characters.",
"error"
);

return;

}


// Gmail check

if(!email.includes("@gmail.com")){

showNotification(
"Invalid Gmail",
"Please enter a valid Gmail address.",
"error"
);

return;

}


// Password length check

if(password.length < 8){

showNotification(
"Weak Password",
"Password must be at least 8 characters.",
"error"
);

return;

}


// Confirm password check

if(password !== confirmPassword){

showNotification(
"Password Error",
"Passwords do not match.",
"error"
);

return;

}


// Country check

if(nationality===""){

showNotification(
"Select Country",
"Please select your country.",
"warning"
);

return;

}


// Phone check

if(phone.length < 10 || phone.length > 15){

showNotification(
"Invalid Phone Number",
"Enter a valid phone number.",
"error"
);

return;

}


// Save user

const user={

username:username,

email:email,

password:password,

nationality:nationality,

phone:phone,

balance:250000

};


saveUser(user);

localStorage.setItem("easyPayUsername", username);
localStorage.setItem("easyPayEmail", email);
localStorage.setItem("easyPayNationality", nationality);

showNotification(
"Account Created",
"Your EasyPay account was created successfully.",
"success"
);


// Clear form

registerForm.reset();


// Go back to login

setTimeout(()=>{

showPage("loginPage");

},1500);


});

}



// ===============================
// OPEN REGISTER PAGE
// ===============================

const openRegister=document.getElementById("openRegister");

if(openRegister){

openRegister.onclick=()=>{

showPage("registerPage");

};

}


// ===============================
// BACK TO LOGIN
// ===============================

const backLogin=document.getElementById("backLogin");

if(backLogin){

backLogin.onclick=()=>{

showPage("loginPage");

};

}


// ===============================
// LOGIN SYSTEM
// ===============================

const loginForm=document.getElementById("loginForm");


if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();


const loginUserInput=document.getElementById("loginUser").value.trim();

const loginPassword=document.getElementById("loginPassword").value;


const user=getUser();


if(!user){

showNotification(
"No Account Found",
"Please create an account first.",
"warning"
);

return;

}



if(
loginUserInput!==user.username &&
loginUserInput!==user.email
){

showNotification(
"Login Failed",
"Username or Gmail is incorrect.",
"error"
);

return;

}



if(loginPassword!==user.password){

showNotification(
"Wrong Password",
"The password you entered is incorrect.",
"error"
);

return;

}



loginUser();


showNotification(
"Login Successful",
"Welcome back to EasyPay.",
"success"
);



setTimeout(()=>{

showPage("aboutPage");

},1200);


});


}

// ===============================
// PASSWORD SHOW / HIDE
// ===============================

function createPasswordEye(inputId){

const input=document.getElementById(inputId);

if(!input) return;


// prevent duplicate eye

if(input.parentElement.querySelector(".passwordEye")) return;


// create wrapper

const wrapper=document.createElement("div");

wrapper.style.position="relative";

input.parentNode.insertBefore(wrapper,input);

wrapper.appendChild(input);


// create icon

const eye=document.createElement("i");

eye.className="fa-solid fa-eye passwordEye";


eye.style.position="absolute";

eye.style.right="18px";

eye.style.top="18px";

eye.style.cursor="pointer";

eye.style.color="#4ADE80";

eye.style.fontSize="20px";


wrapper.appendChild(eye);



eye.onclick=()=>{


if(input.type==="password"){

input.type="text";

eye.className="fa-solid fa-eye-slash passwordEye";


}else{


input.type="password";

eye.className="fa-solid fa-eye passwordEye";


}


};


}


// Only password fields

createPasswordEye("password");

createPasswordEye("confirmPassword");

createPasswordEye("loginPassword");

// ===============================
// WELCOME FLOW
// ===============================


// Continue button

const continueBtn=document.getElementById("continueBtn");


if(continueBtn){

continueBtn.onclick=()=>{

showPage("groupPage");

};

}



// ===============================
// COMMUNITY BUTTONS
// ===============================


const joinTelegram=document.getElementById("joinTelegram");


if(joinTelegram){

joinTelegram.onclick=()=>{

window.open(
"https://t.me/+zQ4ouhNXYx5kMmFk",
"_blank"
);

};

}



const joinWhatsapp=document.getElementById("joinWhatsapp");


if(joinWhatsapp){

joinWhatsapp.onclick=()=>{

window.open(
"https://wa.me/",
"_blank"
);

};

}



const skipGroup=document.getElementById("skipGroup");


if(skipGroup){

skipGroup.onclick=()=>{

showPage("dashboard");

loadDashboardUser();

};

}


// ===============================
// LOAD USER ON DASHBOARD
// ===============================


function loadDashboardUser(){


const user=getUser();


if(!user)return;



const dashboardUser=document.getElementById("dashboardUser");


if(dashboardUser){

dashboardUser.innerText=user.username;

}



const profileUsername=document.getElementById("profileUsername");


if(profileUsername){

profileUsername.innerText=user.username;

}



const profileEmail=document.getElementById("profileEmail");


if(profileEmail){

profileEmail.innerText=user.email;

}



const profileNationality=document.getElementById("profileNationality");


if(profileNationality){

profileNationality.innerText=user.nationality;

}



}


// load if dashboard opens

loadDashboardUser();

// ===============================
// DASHBOARD SYSTEM
// ===============================


let balance = Number(localStorage.getItem("easyPayBalance")) || 250000;



function formatMoney(amount){

return "₦" + amount.toLocaleString();

}



function updateBalance(){


localStorage.setItem(
"easyPayBalance",
balance
);



const balanceText=document.getElementById("balance");


if(balanceText){

balanceText.innerText=formatMoney(balance);

}



const profileBalance=document.getElementById("profileBalance");


if(profileBalance){

profileBalance.innerText=formatMoney(balance);

}


}


updateBalance();



// ===============================
// HIDE / SHOW BALANCE
// ===============================


const toggleBalance=document.getElementById("toggleBalance");


let balanceVisible=true;



if(toggleBalance){


toggleBalance.onclick=()=>{


balanceVisible=!balanceVisible;



const balanceText=document.getElementById("balance");



if(balanceVisible){

balanceText.innerText=formatMoney(balance);

toggleBalance.className="fa-solid fa-eye";


}else{


balanceText.innerText="••••••";


toggleBalance.className="fa-solid fa-eye-slash";


}


};


}




// ===============================
// REWARD SYSTEM
// ===============================


const claimReward=document.getElementById("claimReward");

const timer=document.getElementById("timer");


let rewardTime=
Number(localStorage.getItem("rewardTime")) || 0;



function showTimer(){


let minutes=Math.floor(rewardTime/60);

let seconds=rewardTime%60;



timer.innerText=
String(minutes).padStart(2,"0")
+":"+
String(seconds).padStart(2,"0");


}



function startReward(){


const countdown=setInterval(()=>{


rewardTime--;


localStorage.setItem(
"rewardTime",
rewardTime
);



showTimer();



if(rewardTime<=0){


clearInterval(countdown);


localStorage.removeItem("rewardTime");


timer.innerText="Ready";


if(claimReward){

claimReward.disabled=false;

}


}


},1000);



}



if(rewardTime>0){

showTimer();

startReward();

}



if(claimReward){


claimReward.onclick=()=>{


balance+=20000;


updateBalance();



showNotification(
"Reward Claimed",
"₦20,000 has been added to your balance.",
"success"
);



rewardTime=600;


localStorage.setItem(
"rewardTime",
rewardTime
);



claimReward.disabled=true;


startReward();


};


}

// ===============================
// DASHBOARD QUICK ACTIONS
// ===============================


// Buy VCode

const buyVcode =
document.getElementById("buyVcode");

if(buyVcode){

buyVcode.onclick=()=>{

showPage("buyVcodePage");

};

}



// Withdraw

const withdrawBtn =
document.getElementById("withdraw");


if(withdrawBtn){

withdrawBtn.onclick=()=>{

showPage("withdrawPage");

};

}



// Referral

const referralBtn =
document.getElementById("referral");


if(referralBtn){

referralBtn.onclick=()=>{

showPage("referralPage");

};

}



// History

const historyBtn =
document.getElementById("history");


if(historyBtn){

historyBtn.onclick=()=>{

showPage("historyPage");

};

}



// How EasyPay Works

const earnBtn =
document.getElementById("howToEarn");


if(earnBtn){

earnBtn.onclick=()=>{

showPage("earnPage");

};

}



// Profile button in bottom navigation

const profileNav =
document.getElementById("navProfile");


if(profileNav){

profileNav.onclick=()=>{

showPage("profilePage");

};

}



// Withdraw bottom navigation

const withdrawNav =
document.getElementById("navWithdraw");


if(withdrawNav){

withdrawNav.onclick=()=>{

showPage("withdrawPage");

};

}



// History bottom navigation

const historyNav =
document.getElementById("navHistory");


if(historyNav){

historyNav.onclick=()=>{

showPage("historyPage");

};

}



// Home bottom navigation

const homeNav =
document.getElementById("navHome");


if(homeNav){

homeNav.onclick=()=>{

showPage("dashboard");

};

}

// ===============================
// PROFILE SYSTEM
// ===============================


const profileUsername =
document.getElementById("profileUsername");

const profileEmail =
document.getElementById("profileEmail");

const profileNationality =
document.getElementById("profileNationality");



if(profileUsername){

profileUsername.innerText =
localStorage.getItem("easyPayUsername") || "User";

}



if(profileEmail){

profileEmail.innerText =
localStorage.getItem("easyPayEmail") || "Not Available";

}



if(profileNationality){

profileNationality.innerText =
localStorage.getItem("easyPayNationality") || "Not Available";

}




// ===============================
// SETTINGS BUTTON
// ===============================


const openSettings =
document.getElementById("openSettings");


if(openSettings){

openSettings.onclick=()=>{

showPage("settingsPage");

};

}



// ===============================
// LOGOUT SYSTEM
// ===============================


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.onclick=()=>{


localStorage.removeItem("easyPayLoggedIn");


showNotification(
"Logged Out",
"You have been logged out successfully.",
"success"
);



setTimeout(()=>{

showPage("loginPage");

},1000);



};


}




// ===============================
// DARK MODE
// ===============================


const darkMode =
document.getElementById("darkMode");



if(darkMode){


darkMode.onclick=()=>{


document.body.classList.toggle("light");



if(document.body.classList.contains("light")){


localStorage.setItem(
"easyPayTheme",
"light"
);


showNotification(
"Light Mode",
"Light mode enabled.",
"success"
);



}else{


localStorage.setItem(
"easyPayTheme",
"dark"
);


showNotification(
"Dark Mode",
"Dark mode enabled.",
"success"
);



}



};


}



// Load saved theme

if(localStorage.getItem("easyPayTheme")==="light"){

document.body.classList.add("light");

}

// ===============================
// BUY VCODE SYSTEM
// ===============================

const TELEGRAM_LINK = "https://t.me/+zQ4ouhNXYx5kMmFk";
const WHATSAPP_LINK = "https://wa.me/";

let selectedPlan = "";

// ===============================
// PURCHASE PAGE SYSTEM
// ===============================

const PLAN_PRICES = {

Basic:"₦2,000",
Standard:"₦5,000",
Silver:"₦8,000",
Gold:"₦10,000",
Diamond:"₦12,000",
Platinum:"₦15,000",
Elite:"₦18,000",
Royal:"₦20,000",
Ultimate:"₦25,000",
"Infinity VIP":"₦30,000"

};

function buyPlan(plan){

const username =
localStorage.getItem("easyPayUsername") || "User";

document.getElementById("purchaseTitle").innerText =
plan + " Plan";

document.getElementById("purchaseMessage").value =

`Hello Admin,

I want to purchase the EasyPay ${plan} Plan (${PLAN_PRICES[plan]}).

Username: ${username}

Kindly send me your account details sir.

Thank you.`;

showPage("purchasePage");

}

// ===============================
// EASYPAY VCODE DATABASE
// ===============================

const VCODES = {

Basic:{
code:"Qsxfyhn",
limit:40000,
next:"Standard"
},

Standard:{
code:"STD2458",
limit:80000,
next:"Silver"
},

Silver:{
code:"SLV4587",
limit:120000,
next:"Gold"
},

Gold:{
code:"GLD7788",
limit:160000,
next:"Diamond"
},

Diamond:{
code:"DMD9922",
limit:200000,
next:"Platinum"
},

Platinum:{
code:"PLT5544",
limit:240000,
next:"Elite"
},

Elite:{
code:"ELT8822",
limit:280000,
next:"Royal"
},

Royal:{
code:"RYL3399",
limit:320000,
next:"Ultimate"
},

Ultimate:{
code:"ULT6633",
limit:360000,
next:"Infinity VIP"
},

"Infinity VIP":{
code:"Qsxfyhnko",
limit:400000,
next:null
}

};

const copyPlanMessage =
document.getElementById("copyPlanMessage");

if(copyPlanMessage){

copyPlanMessage.onclick = ()=>{

const input =
document.getElementById("planMessage");

input.select();

input.setSelectionRange(0,99999);

navigator.clipboard.writeText(input.value);

showNotification(
"Copied",
"Message copied successfully.",
"success"
);

setTimeout(()=>{

window.open(
TELEGRAM_LINK,
"_blank"
);

},600);

setTimeout(()=>{

window.open(
WHATSAPP_LINK,
"_blank"
);

},1800);

};

}

// ===============================
// PURCHASE PAGE BUTTONS
// ===============================

// Copy Message

const copyBtn = document.getElementById("copyPurchaseMessage");

if(copyBtn){

copyBtn.onclick = function(){

const message = document.getElementById("purchaseMessage").value;

navigator.clipboard.writeText(message);

showNotification(

"Copied",

"Message copied successfully.",

"success"

);

};

}


// Telegram

const telegramBtn = document.getElementById("sendTelegram");

if(telegramBtn){

telegramBtn.onclick = function(){

window.open(

"https://t.me/+zQ4ouhNXYx5kMmFk",

"_blank"

);

};

}


// WhatsApp

const whatsappBtn = document.getElementById("sendWhatsapp");

if(whatsappBtn){

whatsappBtn.onclick = function(){

window.open(

"https://wa.me/",

"_blank"

);

};

}

// ===============================
// WITHDRAW SYSTEM
// ===============================

const withdrawForm = document.getElementById("withdrawForm");

if(withdrawForm){

withdrawForm.addEventListener("submit",(e)=>{

e.preventDefault();

const amount = Number(document.getElementById("withdrawAmount").value);

// Check available balance

if(amount > balance){

showNotification(
"Insufficient Balance",
"You don't have enough balance to complete this withdrawal.",
"error"
);

return;

}
  
const code = document.getElementById("vcode").value.trim();

if(code === VCODES.Basic.code){

showNotification(
"Server Down",
"Basic VCode server is currently down. Please purchase the Standard Plan.",
"warning"
);

return;

}

if(code === VCODES.Standard.code){

showNotification(
"Server Down",
"Standard VCode server is currently down. Please purchase the Silver Plan.",
"warning"
);

return;

}

if(code === VCODES.Silver.code){

showNotification(
"Server Down",
"Silver VCode server is currently down. Please purchase the Gold Plan.",
"warning"
);

return;

}

if(code === VCODES.Gold.code){

showNotification(
"Server Down",
"Gold VCode server is currently down. Please purchase the Diamond Plan.",
"warning"
);

return;

}

if(code === VCODES.Diamond.code){

showNotification(
"Server Down",
"Diamond VCode server is currently down. Please purchase the Platinum Plan.",
"warning"
);

return;

}

if(code === VCODES.Platinum.code){

showNotification(
"Server Down",
"Platinum VCode server is currently down. Please purchase the Elite Plan.",
"warning"
);

return;

}

if(code === VCODES.Elite.code){

showNotification(
"Server Down",
"Elite VCode server is currently down. Please purchase the Royal Plan.",
"warning"
);

return;

}

if(code === VCODES.Royal.code){

showNotification(
"Server Down",
"Royal VCode server is currently down. Please purchase the Ultimate Plan.",
"warning"
);

return;

}

if(code === VCODES.Ultimate.code){

showNotification(
"Server Down",
"Ultimate VCode server is currently down. Please purchase the Infinity VIP Plan.",
"warning"
);

return;

}

if(code === VCODES["Infinity VIP"].code){

if(amount > 400000){

showNotification(
"Limit Exceeded",
"Infinity VIP allows a maximum withdrawal of ₦400,000.",
"error"
);

return;

}

// Deduct balance
balance -= amount;

updateBalance();

// Save new balance
localStorage.setItem("easyPayBalance", balance);

// Deduct money

balance -= amount;

updateBalance();

localStorage.setItem("easyPayBalance", balance);

// Save withdrawal history

let history = JSON.parse(localStorage.getItem("easyPayHistory")) || [];

history.unshift({

title: "Withdrawal",

amount: "-₦" + amount.toLocaleString(),

status: "Successful",

date: new Date().toLocaleString()

});

localStorage.setItem(
"easyPayHistory",
JSON.stringify(history)
);
  
// Success notification
showNotification(
"Withdrawal Successful",
"₦" + amount.toLocaleString() + " has been deducted from your balance.",
"success"
);

// Clear the form
withdrawForm.reset();

return;

return;

}

showNotification(
"Invalid VCode",
"Please enter a valid EasyPay VCode.",
"error"
);

});

}

// ===============================
// HISTORY SYSTEM
// ===============================

function loadHistory(){

const historyContainer =
document.getElementById("historyContainer");

if(!historyContainer) return;

const history =
JSON.parse(localStorage.getItem("easyPayHistory")) || [];

if(history.length===0){

historyContainer.innerHTML=`

<div class="card">

<h3>No Transactions Yet</h3>

<p>Your transaction history will appear here.</p>

</div>

`;

return;

}

historyContainer.innerHTML="";

history.forEach(item=>{

historyContainer.innerHTML += `

<div class="historyItem">

<h4>${item.title}</h4>

<p>${item.amount}</p>

<small>${item.status}</small><br>

<small>${item.date}</small>

</div>

`;

});

}