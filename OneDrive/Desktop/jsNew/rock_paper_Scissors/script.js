let usercount=0;
let compcount=0;

const choices = document.querySelectorAll(".choice")
const user_score = document.getElementById("user-score");
const comp_score = document.getElementById("comp-score");
const msg=document.getElementById("msg")

   function generateCompChoice()
   {
    const options = ["rock","paper","scissor"];
    const compIdx = Math.floor(Math.random()*3);
    return options[compIdx];
   }
   function draw()
   {
        msg.innerText = `Game was Draw Play again!`
        msg.style.backgroundColor= "grey"
        return "draw"
   }
   function compwin(userChoice,compchoice)
   {
        msg.innerText = `You lose! ${compchoice} beats your ${userChoice}`
        msg.style.backgroundColor= "red"
        return "lose";
   }
   function userwin(userChoice,compchoice)
   {
        msg.innerText = `Congratulations You win's! your ${userChoice} beats ${compchoice}`
        msg.style.backgroundColor= "Green"
        return "win";
   }
   function playGame(userChoice)
   {
        console.log("user choice: ",userChoice);
        const compchoice = generateCompChoice();
        console.log("comp choice: ",compchoice);
        if(userChoice===compchoice)
        {
            return draw();
        }
        else
        if(userChoice==="rock")
        {
            if(compchoice==="paper")
            {
                return compwin(userChoice,compchoice);
            }
            else
                return userwin(userChoice,compchoice);
        }
        else
        if(userChoice==="paper")
        {
            if(compchoice==="scissor")
                {
                    return compwin(userChoice,compchoice);
                }
                else
                    return userwin(userChoice,compchoice);
        }
        else
        {
            if(compchoice==="rock")
                {
                    return compwin(userChoice,compchoice);
                }
                else
                    return userwin(userChoice,compchoice);
        }
   }
    choices.forEach(choice => 
        {
            choice.addEventListener("click",function()
        {
            const userChoice = choice.getAttribute("id");
            console.log("button is clicked");
            let val = playGame(userChoice);
            if(val==="win")
            {
                usercount++;
                user_score.innerText=`${usercount}`;
            }
            else
            if(val==="lose")
            {
                compcount++;
                comp_score.innerText=`${compcount}`;
            }
        })
        });
   