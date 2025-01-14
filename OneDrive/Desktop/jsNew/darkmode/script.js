var al = document.querySelector("button")
var html= document.getElementsByTagName("html")
let flag=true;
al.addEventListener("click",function()
{
    if(flag==true)
    {
        html[0].style.backgroundColor="black"
        flag=false;
    }
    else
    {
        html[0].style.backgroundColor="white"
        flag=true;
    }
})