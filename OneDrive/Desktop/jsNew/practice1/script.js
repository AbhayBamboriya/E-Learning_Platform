let a = document.querySelector("h2")

a.append(" from apna college")
// or
// a.innerText = a.innerText + " from apna college"
 let b=document.getElementsByClassName("box")
 for(var i=1;i<=b.length;i++)
 {
    b[i-1].innerText=`box ${i}`
 }

let btn = document.getElementById("btn1")
console.log(btn)
btn.addEventListener("click",function()
{
    btn.style.backgroundColor="green"
    btn.style.color="white"
})


