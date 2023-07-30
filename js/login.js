let inputs=document.querySelectorAll(".one");
let warning_p=document.querySelector(".warning");
let button_submit=document.querySelector(".link");
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
function log_in(mail,password)
{
    let flag=false;
    let the_user_name="";
    let obj=
    {
    email:mail,
    pass:password,
    };
    if(mail.value==""||password.value=="")
    {
       warning_p.innerHTML="the mail or pasword input is required";
       return false;
    }
    else{
        if(window.localStorage.getItem("accounts")==null)
        {
            warning_p.innerHTML="the email and password is doesnt found";
            console.log("no");
            console.log("i here in the condition of local storage");
            return false;
        }
        else{
            let array_of_acocunts=JSON.parse(window.localStorage.getItem("accounts"));
            for(let i=0;i<array_of_acocunts.length;i++)
            {
                if(obj.email==array_of_acocunts[i].email&&obj.pass==array_of_acocunts[i].pass)
                {
                    flag=true;
                    console.log("yes");
                    the_user_name=array_of_acocunts[i].nm;
                    break;
                }
                else{
                    console.log("no");
                }
            }
            if(flag==true)
            {
               window.sessionStorage.setItem("user_name_hello",the_user_name);
                return true;
            }
            else{
              warning_p.innerHTML="incorrect email or password";
              return false ;
            }
        }
    }
}
button_submit.addEventListener("click",function(e)
{
   if(log_in(inputs[0].value,inputs[1].value)===true)
   {
            warning_p.innerHTML="true login";
            warning_p.setAttribute("class","text-success");
   }
   else{
    e.preventDefault();
   }
})