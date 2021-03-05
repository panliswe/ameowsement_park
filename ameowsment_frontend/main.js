const usersURL = "http://localhost:3000/users"
const gamesURL = "http://localhost:3000/games"
const main = document.querySelector('div#main-container')
let currentUser

console.log('H1')
console.log(document.readyState)

document.addEventListener('DOMContentLoaded',()=>{

    const userLogin = () =>{
        const loginDiv = document.createElement('div')
        const loginForm = document.createElement('form')
        const userInput = document.createElement('input')
        const submitBtn = document.createElement('button')
        loginDiv.id = 'login-container'
        userInput.type = 'text'
        userInput.name = 'username'
        userInput.placeholder = 'Enter Username here'
        submitBtn.innerText = 'Login'
        loginForm.addEventListener('submit', submitHandle )
        loginForm.append(userInput, submitBtn)
        loginDiv.appendChild(loginForm)
        main.appendChild(loginForm)
        
    }

    const submitHandle = (e) =>{
        e.preventDefault()
        let userName = {
            username: e.target[0].value
        }
        axios.post(usersURL, userName)
        .then(r => {
            currentUser = r.data
            loadGameMenu()
        })
    }

    const loadGameMenu = () =>{
        axios.get(gamesURL)
        .then(console.log)
    }

    const redDotGame = () =>{
        // const 
        // const targetDiv = document.createElement('div')
        // const 
    }

    userLogin()
})


// //* THINGGY MOVING AROUND MODULES
// let div = document.querySelector('div#testing')

// let setXProperty = (xLocation, yLocation) => {
//     div.style.setProperty('--xLocation', xLocation + '%')
//     div.style.setProperty('--yLocation', yLocation + '%')
// }

// let changeLocation = () =>{
//     const xLocation = Math.random()*100;
//     console.log(xLocation)
//     const yLocation = Math.random()*100;
//     setXProperty(xLocation, yLocation);
// }

// setInterval(changeLocation, 1200);

// //* LV2 MODULES
// let div2 = document.querySelector('div#testing2')

// let setYProperty = (xLocation, yLocation) => {
//     div2.style.setProperty('--xLocation', xLocation + '%')
//     div2.style.setProperty('--yLocation', yLocation + '%')
// }

// let changeAnotherLocation = () =>{
//     const xLocation = Math.random()*100;
//     console.log(xLocation)
//     const yLocation = Math.random()*100;
//     setYProperty(xLocation, yLocation);
// }

// setInterval(changeAnotherLocation, 1500)