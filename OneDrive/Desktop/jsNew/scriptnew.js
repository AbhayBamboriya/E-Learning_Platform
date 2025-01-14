// GET INNERTEXT AND INNERHTML
let al = document.querySelector("div")

console.log(al.tagName)  // return the name of tag to it belong to
console.log(al.innerHTML)   // returns the html content or text
console.log(al.innerText)   // returns only the text of itself or its children

// IMP PROPERTIES

console.log(al.children)  // return all the children of al 
console.log(al.firstChild)  // return the name of its firstchild
console.log(al.lastChild)  // return the name of its lastchild

let al1=document.getElementById("hidden")
console.log(al1.textContent) // return text contents even for hidden elements
