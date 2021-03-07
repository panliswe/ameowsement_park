const usersURL = "http://localhost:3000/users"
const redDotURL = "http://localhost:3000/red_dot_games"
const main = document.querySelector('div#main-container')
const gamesObj = {'Catch the Dot': catchTheDotGameMenu }
let currentUser


//*texting
let hello = document.createElement('h1')
main.appendChild(hello)

document.addEventListener('DOMContentLoaded',()=>{

    const userLogin = () =>{
        const sideNav = document.querySelector('div.sidenav')
        const loginDiv = document.createElement('div')
        const loginForm = document.createElement('form')
        const userInput = document.createElement('input')
        const submitBtn = document.createElement('button')
        loginDiv.className = 'nav-bar-item'
        userInput.type = 'text'
        userInput.name = 'username'
        userInput.placeholder = 'Enter Username here'
        submitBtn.innerText = 'Login'
        loginForm.addEventListener('submit', submitHandle )
        loginForm.append(userInput, submitBtn)
        loginDiv.appendChild(loginForm)
        sideNav.appendChild(loginDiv)
    }

    const submitHandle = (e) =>{
        e.preventDefault()
        e.target.style.display = 'none'
        let userName = {
            username: e.target[0].value
        }
        axios.post(usersURL, userName)
        .then(r => {
            currentUser = r.data
            gameInterface()
        })
    }

    const gameInterface = () =>{
        clearMainDiv()
        const sideNav = document.querySelector('div.sidenav')
        for (const game in gamesObj){
            const li = document.createElement('li')
            li.className = 'game-title'
            li.innerText = game
            li.addEventListener('click', gamesObj[game])
            sideNav.appendChild(li)
        }
        const playFieldDiv = document.createElement('div')
        playFieldDiv.id = 'play-field'
        sideNav.append(playFieldDiv)
    }

    // const loadGameMenu = () =>{
    //     axios.get(gamesURL)
    //     .then(gameNames => render)
    // }


    
    // const catchTheDot = () =>{
        //     // const 
        //     // const targetDiv = document.createElement('div')
        //     // const 
        // }
        
        userLogin()
})
    
const clearMainDiv = () =>{
    main.innerHTML = ""
}

//* MOVE TO A DIFFERENT FILE


