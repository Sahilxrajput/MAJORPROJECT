(breakTheText = () => {
    var h1 = document.getElementById("heading")
var h1Text = h1.textContent


var splittedText  = h1Text.split("")
splittedText.pop()
splittedText.pop()
splittedText.pop()
var halfValue = splittedText.length/2 
var clutter = ""


splittedText.forEach(function(elem, idx){
    if(idx<halfValue){
        clutter += `<span class="a">${elem}</span>`
    } else{
        clutter += `<span class="b">${elem}</span>`
    }
})
h1.innerHTML = clutter

})()



window.onload = function() {
gsap.from("#heading .a", {
    y:150,
    opacity:0,
    duration:0.9,
    delay:0.5,
    stagger:0.15,
    ease: "back.out(3)",
})
gsap.from("#heading .b", {
    y:150,
    opacity:0,
    duration:0.9,
    delay:0.5,
    stagger:-0.15,
    ease: "back.out(3)"
})
} 

var tl = gsap.timeline();
const showbody = () => {
    
    tl.to("#main-heading",{
        opacity:0,
        duration:2,
        ease: "power1.out",
        zIndex: -1,
    })
}
setTimeout(showbody, 2000);
