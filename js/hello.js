let btn=document.querySelector("button");
let inner=document.querySelector("h1");
inner.innerHTML=`hello <br>${window.sessionStorage.getItem("user_name_hello")}`;
btn.onclick=function()
{
    window.sessionStorage.removeItem("user_name_hello");
    window.open("index.html");
}