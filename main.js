const usersURL = "https://ameowsement-park.herokuapp.com/users"
const redDotURL = "https://ameowsement-park.herokuapp.com/red_dot_games"
const topDiv = document.querySelector('div#top-div')
const main = document.querySelector('div#main-container')
const sideNav = document.querySelector('div.sidenav')
const myBGM = document.querySelector('audio#BGM')
const scoreSound = document.querySelector('audio#dotScore')
const gamesObj = {'Catch the Dot': catchTheDotGameMenu, 'More Games to Come': moreGames}
let currentUser

document.addEventListener('DOMContentLoaded',()=>{
    userLogin()
})
const userLogin = () =>{
    renderLogo()
    axios.get(usersURL)
    const loginDiv = document.createElement('div')
    const header = document.createElement('header')
    const loginForm = document.createElement('form')
    const userInput = document.createElement('input')
    const submitBtn = document.createElement('button')
    const br = document.createElement('br')
    const musicDiv = document.createElement('div')
    const music = document.createElement('i')
    musicDiv.className = 'bottom-right-corner'
    musicDiv.id = 'mute-control'
    music.classList.add('fas', 'fa-volume-up', 'hover-enlarge')
    music.addEventListener('click', (e)=>toggleMute(e))
    musicDiv.append(music)
    topDiv.append(musicDiv)
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
    })
}

const gameNav = () =>{
    main.innerHTML = ''
    main.id = 'main-container'
    myBGM.src = 'assets/audio/bathtime-funk-all-good-folks-main-version-01-16-689.mp3'
    BGMplay()
    renderLogo()
    sideNav.style.display = 'block'
    sideNav.innerHTML = ''
    const greetingDiv = document.createElement('div')
    const greeting = document.createElement('header')
    const gamesDiv = document.createElement('div')
    const gamesHeader = document.createElement('p')
    const gamesUL = document.createElement('ul')
    const leaderBoardDiv = document.createElement('div')
    const highScore = document.createElement('p')
    const mute = document.querySelector('div#mute-control')

    greetingDiv.className ='hover-enlarge'
    greeting.innerText = `Welcome, ${currentUser.username}`
    greeting.id = 'greeting'
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
    mute.className = 'bottom-right-corner'

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

const renderLogo = () =>{
    const logoDiv = document.createElement('div')
    const logo = document.createElement('img')
    const phrase = document.createElement('p')
    logoDiv.id = 'logo'
    logo.src = 'assets/img/main_logo.png'
    logo.alt = 'A-meow-sement Park Logo'
    logo.title = 'A-MEOW-sement Park'
    logo.width = '490'
    logo.height = '300'
    phrase.innerText = 'Where you can spend the day being a cat'
    logoDiv.append(logo, phrase)
    main.append(logoDiv)
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

    editBtn.addEventListener('click', (e)=>updateForm(e))

    let user = await axios.get(`${usersURL}/${currentUser.id}`)
    for(let i = 0; i< user.data.redDotGames.length; i++){
        const recordTr = document.createElement('tr')
        const scoreTh = document.createElement('th')
        const dateTh = document.createElement('th')
        const deleteTh = document.createElement('th')
        const deleteIcon = document.createElement('i')
        deleteIcon.className ='hover-enlarge'
        deleteIcon.id = user.data.redDotGames[i].id
        scoreTh.innerText = user.data.redDotGames[i].score
        dateTh.innerText = user.data.redDotGames[i].created_at.split('T')[0]
        deleteIcon.classList.add('fas', 'fa-trash')
        deleteIcon.addEventListener('click', (e)=>confirmPop(e))
        deleteTh.append(deleteIcon)
        recordTr.append(scoreTh, dateTh, deleteTh)
        dotTable.append(recordTr)
    }
    main.append(userNameArea, dotTableDiv)
}


const destroyRecord = async(e, confirmation) => {
    let sure = confirmation
    let scoreData = await axios.get(`${redDotURL}/topscore`)
    let topTen = scoreData.data.map(score => score.id)
    let idNum = parseInt(e.target.id, 10)
    console.log(idNum)
    if(sure && !topTen.includes(idNum)){
        axios.delete(`${redDotURL}/${e.target.id}`)
        .then(()=>{
            warningPop('Record Deleted')
            e.target.parentElement.parentElement.remove()
        })
    } else if (sure && topTen.includes(idNum)){
        warningPop('Cannot delete top 10 record')
    }
}

const updateForm = (e) =>{
    const userDiv = e.target.parentElement
    const updateForm = document.createElement('form')
    const input = document.createElement('input')
    const submitBtn = document.createElement('button')

    input.value = currentUser.username
    input.name = 'username'
    submitBtn.innerText = 'Update'
    userDiv.innerHTML = ''

    updateForm.addEventListener('submit', (e) =>updateUser(e))
    updateForm.append(input, submitBtn)
    userDiv.append(updateForm)
}

const updateUser = (e) =>{
    e.preventDefault()
    axios.patch(`${usersURL}/${currentUser.id}`, {
        username: e.target.username.value
    })
    .then((user)=>{
        console.log(user)
        const greeting = document.querySelector('#greeting')
        currentUser = user.data
        warningPop('Username updated')
        greeting.innerText = `Welcome, ${currentUser.username}`
        getUser()
    })
}

const BGMplay = () =>{
    myBGM.loop = true
    myBGM.volume = 0.08
    myBGM.play()
}

const toggleMute = (e) =>{
    if(myBGM.muted){
        scoreSound.muted = !scoreSound.muted
        myBGM.muted = !myBGM.muted
        e.target.className = 'fas fa-volume-up hover-enlarge'
    } else {
        scoreSound.muted = !scoreSound.muted
        myBGM.muted = !myBGM.muted
        e.target.className = 'fas fa-volume-mute hover-enlarge'
    }
}

const clearMainDiv = () =>{
    main.innerHTML = ""
}

const confirmPop = (e) =>{
    const bigDiv = document.createElement('div')
    const smallDiv = document.createElement('div')
    const br = document.createElement('br')
    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')
    let result

    bigDiv.className = 'masking-div'
    smallDiv.className = 'modal-like'
    smallDiv.innerText = 'Are you sure?'
    yesBtn.innerText = 'Yes'
    noBtn.innerText = 'No'
    
    yesBtn.addEventListener('click', ()=>{
        result = true
        removeItself(bigDiv)
        destroyRecord(e, result)
    })
    noBtn.addEventListener('click', ()=>{
        result = false
        removeItself(bigDiv)
        destroyRecord(e,result)
    })
    smallDiv.append(br, yesBtn, noBtn)
    bigDiv.append(smallDiv)
    topDiv.prepend(bigDiv)
}

const warningPop = (string) => {
    const bigDiv = document.createElement('div')
    const smallDiv = document.createElement('div')
    const br = document.createElement('br')
    const okBtn = document.createElement('button')

    bigDiv.className = 'masking-div'
    smallDiv.className = 'modal-like'
    smallDiv.innerText = string
    okBtn.innerText = 'OK'
    
    okBtn.addEventListener('click', () => removeItself(bigDiv))
    smallDiv.append(br, okBtn)
    bigDiv.append(smallDiv)
    topDiv.prepend(bigDiv)
}

const removeItself = (itself) =>{
    itself.remove()
}

        
        
        