const usersURL = "http://localhost:3000/users"
const redDotURL = "http://localhost:3000/red_dot_games"
const main = document.querySelector('div#main-container')
const sideNav = document.querySelector('div.sidenav')
const myBGM = document.querySelector('audio#BGM')
const gamesObj = {'Catch the Dot': catchTheDotGameMenu, 'More Games to Come': moreGames}
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
    const greeting = document.createElement('header')
    const gamesDiv = document.createElement('div')
    const gamesHeader = document.createElement('p')
    const gamesUL = document.createElement('ul')
    const leaderBoardDiv = document.createElement('div')
    const highScore = document.createElement('p')

    greetingDiv.className ='hover-enlarge'
    greeting.innerText = `Welcome, ${currentUser.username}`
    greeting.title = 'Click to edit user'
    highScore.className = 'title'
    highScore.innerText = 'High Score'
    gamesDiv.className = 'nav-bar-item'
    gamesHeader.innerText = 'Games Selection'
    gamesHeader.className = 'title'
    gamesUL.className = 'no-bullets'
    leaderBoardDiv.className = 'nav-bar-item'
    leaderBoardDiv.id = 'leaderboard'
    leaderBoardDiv.style.display ='none'

    greetingDiv.addEventListener('click', getUser)
    for (const game in gamesObj){
        const li = document.createElement('li')
        li.className = 'game-title'
        li.className = 'hover-enlarge'
        li.innerText = game
        li.addEventListener('click', ()=>{
            leaderBoardDiv.style.display = 'block'
            leaderBoardDiv.innerHTML = ''
            leaderBoardDiv.append(highScore)
            switch (game){
                case 'Catch the Dot':
                    renderLeaderBoard().then(leaderBoard => leaderBoardDiv.appendChild(leaderBoard))
                    break
                case 'More Games to Come':
                    leaderBoardDiv.style.display = 'none'
                    break
            }
            const gameSelected = gamesObj[game]
            gameSelected()
        })
        gamesUL.appendChild(li)
    }
    greetingDiv.append(greeting)
    gamesDiv.append(gamesHeader, gamesUL)
    sideNav.append(greetingDiv, gamesDiv, leaderBoardDiv)
}

const getUser = async() =>{
    clearMainDiv()
    const userNameArea = document.createElement('div')
    const name = document.createElement('h1')
    const editBtn = document.createElement('button')
    const dotTableDiv = document.createElement('div')
    const dotTable = document.createElement('table')
    const header = document.createElement('header')
    const titleTr = document.createElement('tr')
    const scoreTh = document.createElement('th')
    const dateTh = document.createElement('th')
    const deleteTh = document.createElement('th')
    const leaderBoard = document.querySelector('div#leaderboard')
    
    name.innerText = `Username: ${currentUser.username}`
    editBtn.innerText = 'Edit'
    header.innerText = '<Catch The Dot> Record'
    header.className = 'title'
    dotTableDiv.className = 'main-sub-div'
    scoreTh.innerText = 'Score'
    dateTh.innerText = 'Date'
    deleteTh.innerText = 'Delete'
    leaderBoard.style.display = 'none'

    userNameArea.append(name, editBtn)
    titleTr.append(scoreTh, dateTh, deleteTh)
    dotTable.append(header, titleTr)
    dotTableDiv.append(dotTable)

    let user = await axios.get(`${usersURL}/${currentUser.id}`)
    for(let i = 0; i< user.data.redDotGames.length; i++){
        const recordTr = document.createElement('tr')
        const scoreTh = document.createElement('th')
        const dateTh = document.createElement('th')
        const deleteTh = document.createElement('th')
        const deleteIcon = document.createElement('i')
        deleteIcon.id = user.data.redDotGames[i].id
        scoreTh.innerText = user.data.redDotGames[i].score
        dateTh.innerText = user.data.redDotGames[i].created_at.split('T')[0]
        deleteIcon.classList.add('fas', 'fa-trash')
        deleteIcon.addEventListener('click', (e)=>destroyRecord(e))
        deleteTh.append(deleteIcon)
        recordTr.append(scoreTh, dateTh, deleteTh)
        dotTable.append(recordTr)
    }
    main.append(userNameArea, dotTableDiv)
}

const destroyRecord = (e) => {
    let sure = confirm("Do you want to  delete this record?")
    if(sure){
        axios.delete(`${redDotURL}/${e.target.id}`)
        .then(e.target.parentElement.parentElement.remove())
    }
}

const musicManagement = () =>{
    myBGM.loop = true
    myBGM.volume = 0.1
    // myBGM.play()
}

const clearMainDiv = () =>{
    main.innerHTML = ""
}

        
        
        