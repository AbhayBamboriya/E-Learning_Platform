console.log("hello")
window.console.log("hello") // same as above (window) object

console.log(window)           // print details of window oject
console.dir(window.document)  // print details in document object
console.dir(document.body)   // print details in body tag
console.log(document.body)    // print html of body tag

// GET ELE BY ID

let a = document.getElementById("ele2")
console.log(a)

a.addEventListener("click",function()
{
    a.style.backgroundColor="green"
    a.style.color="white"
})
a.addEventListener("mouseleave",function()
{
    a.style.backgroundColor="pink"
    a.style.color="black"
})


// GET ELEMENT BY CLASSNAME

let b = document.getElementsByClassName("class1")    
console.log(b)
for (var i = 0; i < b.length; i++) {  
    b[i].style.color = 'red';               // VERY IMPORTANT
}
b[0].innerHTML="bhagyadeep new classname"



// GET ELE BY TAGNAME
let c= document.getElementsByTagName("p")           // IMPORTANT
console.log(c)
c[0].style.color="green"  
c[c.length-1].innerHTML="bhagyadeep new tagname"


// QUERY SELECTOR
let d=document.querySelector("p")   // select only 1st tag 
d.style.color="red"

// QUERY SELECTOR All
let all=document.querySelectorAll("p")   // select only all tags (p) 
all[0].style.color="yellow"           // we are changing the first p tag (all[0])




