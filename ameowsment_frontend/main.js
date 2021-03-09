const usersURL = "http://localhost:3000/users"
const redDotURL = "http://localhost:3000/red_dot_games"
const main = document.querySelector('div#main-container')
const sideNav = document.querySelector('div.sidenav')
const myBGM = document.querySelector('audio#BGM')
const gamesObj = {'Catch the Dot': catchTheDotGameMenu, 'More Games to Come': ""}
let currentUser



document.addEventListener('DOMContentLoaded',()=>{
    userLogin()
})
const userLogin = () =>{
    const loginDiv = document.createElement('div')
    const header = document.createElement('header')
    const loginForm = document.createElement('form')
    const userInput = document.createElement('input')
    const submitBtn = document.createElement('button')
    const br = document.createElement('br')
    loginDiv.className = 'nav-bar-item'
    userInput.type = 'text'
    userInput.name = 'username'
    userInput.placeholder = 'Enter Username here'
    header.innerText = "What's your name?"
    submitBtn.innerText = 'Login'
    loginForm.addEventListener('submit', submitHandle )
    loginForm.append(userInput,br, submitBtn)
    loginDiv.appendChild(loginForm)
    sideNav.append(header, loginDiv)
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
    const greetingDiv = document.createElement('div')
    const greeting = document.createElement('p')
    const userBtn = document.createElement('button')
    const gamesDiv = document.createElement('div')
    const gamesUL = document.createElement('ul')
    const leaderBoardDiv = document.createElement('div')
    const highScore = document.createElement('p')

    greeting.innerText = `Welcome, ${currentUser.username}`
    highScore.className = 'leader-title'
    highScore.innerText = 'High Score'
    gamesDiv.className = 'nav-bar-item'
    gamesUL.className = 'no-bullets'
    leaderBoardDiv.className = 'nav-bar-item'
    leaderBoardDiv.id = 'leaderboard'
    leaderBoardDiv.style.display ='none'

    for (const game in gamesObj){
        const li = document.createElement('li')
        li.className = 'game-title'
        li.className = 'hover-enlarge'
        li.innerText = game
        li.addEventListener('click', ()=>{
            leaderBoardDiv.style.display = 'block'
            leaderBoardDiv.innerHTML = ''
            leaderBoardDiv.append(highScore)
            renderLeaderBoard().then(leaderBoard => leaderBoardDiv.appendChild(leaderBoard))
            const gameSelected = gamesObj[game]
            gameSelected()
        })
        gamesUL.appendChild(li)
    }
    gamesDiv.append(gamesUL)
    sideNav.append(gamesDiv, leaderBoardDiv)
}

const moreGames = () =>{
    alert('Please check often')
}


const musicManagement = () =>{
    myBGM.loop = true
    myBGM.volume = 0.1
    // myBGM.play()
}

const clearMainDiv = () =>{
    main.innerHTML = ""
}

        
        //* MOVE TO A DIFFERENT FILE
        
        
        