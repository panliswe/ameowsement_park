const usersURL = "http://localhost:3000/users"
const redDotURL = "http://localhost:3000/red_dot_games"
const main = document.querySelector('div#main-container')
const sideNav = document.querySelector('div.sidenav')
const myBGM = document.querySelector('audio#BGM')
const gamesObj = {'Catch the Dot': catchTheDotGameMenu }
let currentUser



document.addEventListener('DOMContentLoaded',()=>{
    userLogin()
})
const userLogin = () =>{
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
        gameNav()
        musicManagement()
    })
}

const gameNav = () =>{
    main.innerHTML = ''
    sideNav.style.display = 'block'
    sideNav.innerHTML = ''
    const gamesUL = document.createElement('ul')
    gamesUL.className = 'no-bullets'
    for (const game in gamesObj){
        const li = document.createElement('li')
        li.className = 'game-title'
        li.className = 'hover-enlarge'
        li.innerText = game
        li.addEventListener('click', gamesObj[game])
        gamesUL.appendChild(li)
    }
    sideNav.appendChild(gamesUL)
    const leaderBoard = document.createElement('div')
    leaderBoard.id = 'nav-leader'
    sideNav.append(leaderBoard)
}

const musicManagement = () =>{
    myBGM.loop = true
    myBGM.volume = 0.1
    myBGM.play()
}

const clearMainDiv = () =>{
    main.innerHTML = ""
}
        
        //* MOVE TO A DIFFERENT FILE
        
        
        