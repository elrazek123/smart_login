let inputs=document.querySelectorAll(".one");
let warning_p=document.querySelector(".warning");
let button_submit=document.querySelector(".link");
let reg_mail=/^(\w){2,30}@(gmail|yahoo).com$/;
let reg_name=/^[A-Z](\w)+(\s)?(\w){2,10}$/;
let reg_password=/^(\w){5,15}$/;
let flag_mail=false;
let flag_passwor=false;
let flag_name=false;
if(window.localStorage.getItem("accounts")!==null)
{
var array_of_accounts=JSON.parse(window.localStorage.getItem("accounts"));
console.log("i'm from if");
}
else{
array_of_accounts=[];
console.log("i'm created from else conditons");
}
for(let i=0;i<inputs.length;i++)
{
    inputs[i].onclick=function()
    {
        inputs[i].style.backgroundColor="white";
        inputs[i].style.color="black";
    }
    inputs[i].addEventListener("blur",()=>
    {inputs[i].style.backgroundColor="#24353f";
    inputs[i].style.color="white";
})
}
// function make sure of the email (must be unique must be apply the regular expression
function clearinputrs()
{
for(let i=0;i<inputs.length;i++)
{
    inputs[i].value="";
    inputs[i].nextElementSibling.innerHTML="";
}
}
function test_input(input,reg)
{
    if(reg.test(input.value)===true)
{
   console.log(flag_mail);
    if(input.classList.contains("is-invalid"))
    {
       input.classList.replace("is-invalid","is-valid");
    }
    else{
        input.classList.add("is-valid");
    }
    input.nextElementSibling.innerHTML="valid";
    input.nextElementSibling.style.color="green";
    return true;
}
else{

     if(input.classList.contains("is-valid"))
     {
        input.classList.replace("is-valid","is-invalid");
     }
     else{
         input.classList.add("is-invalid");
     }
     input.nextElementSibling.innerHTML="invalid";
     input.nextElementSibling.style.color="red";
}
}
inputs[0].onkeyup=function(){
    if(test_input(inputs[0],reg_mail)==true)
    {
        flag_mail=true;
        console.log(flag_mail);
    }
    else{
        flag_mail=false;
        console.log(flag_mail)
    }
}
inputs[1].onkeyup=function(){
    if(test_input(inputs[1],reg_password)==true)
    {
        flag_passwor=true;
        console.log(flag_passwor);
    }
    else{
        flag_passwor=false;
        console.log(flag_passwor)
    }
}
inputs[2].onkeyup=function(){
    if(test_input(inputs[2],reg_name)==true)
    {
        flag_name=true;
        console.log(flag_name);
    }
    else{
        flag_name=false;
        inputs[2].nextElementSibling.innerHTML="the first letter must be capital";
        inputs[2].nextElementSibling.style.color="red";
        console.log(flag_name)
    }
}
// functon that make sure of email repeated.
function email_repeated(email)
{
    flag_repeated=false;
    if(window.localStorage.getItem("accounts")!==null)
    {
        if(flag_mail==true)
        {
            let array=JSON.parse(window.localStorage.getItem("accounts"));
    for(let i=0;i<array.length;i++)
    {
        if(email===array[i].email)
        {
               flag_repeated=true;
        }
    }
    if(flag_repeated==false)
    {
       return true;
    }
    else{
       warning_p.innerHTML="the emial is already existed"; 
       return false;
    }
        }
        else{
                console.log("the condition isn't applied on the mail");
                return false;
        }
    }
    else{
        if(flag_mail==true)
        {
            console.log("the locl storge is empty");
            return true;
        }
    } 
}
inputs[0].onblur=function()
{
    email_repeated(inputs[0].value);
}
function final(mail,passrod,name,e)
{
if(flag_mail===true&&flag_name===true&&flag_passwor===true)
{
      if(email_repeated(mail)===true)
      {
        if(mail===""||passrod==""||name=="")
        {
              warning_p.innerHTML="all the inputs field is required";
              warning_p.setAttribute("class","text-danger");
              e.preventDefault();
        }
        else{
             let object={
                email:mail,
                pass:passrod,
                nm:name,
             }
             array_of_accounts.push(object);
             window.localStorage.setItem("accounts",JSON.stringify(array_of_accounts));
             window.sessionStorage.setItem("name_of_user",name);
                warning_p.innerHTML="suceessful signed up";
                warning_p.setAttribute("class","text-success");
                clearinputrs();
                e.preventDefault();
            }
      }
      else{
        warning_p.innerHTML="the email is already exists";
        warning_p.setAttribute("class","text-danger");
        e.preventDefault();
      }
}
else{
    warning_p.innerHTML="make sure of the inputs field";
    warning_p.setAttribute("class","text-danger");
    e.preventDefault();
}
}
button_submit.addEventListener("click",function(e)
{
    final(inputs[0].value,inputs[1].value,inputs[2].value,e);
});
