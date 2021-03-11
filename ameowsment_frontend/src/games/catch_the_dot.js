

class DotGameScore {
    constructor(user, score){
        this.user_id = user.id
        this.score = score
    }
}

const catchTheDotGameMenu = () =>{
    clearMainDiv()
    const ruleDiv = document.createElement('div')
    const startBtn = document.createElement('button')
    const br = document.createElement('br')

    ruleDiv.className = 'rule-div'
    ruleDiv.innerText = 'Mysterious red dot randomly appeared in the dark! Gotta catch it meow!'
    startBtn.innerText = 'START'
    startBtn.className = 'hover-enlarge'
    startBtn.addEventListener('click', countDownBeforeGame)

    ruleDiv.append(br, startBtn)
    main.append(ruleDiv)
} 

const countDownBeforeGame = () =>{
    clearMainDiv()
    main.id = 'black-fade-in'
    sideNav.style.display = 'none'
    const counterDiv = document.createElement('div')
    counterDiv.id = 'countdown'
    main.appendChild(counterDiv)
    let prepCounter = 3
    counterDiv.innerText = 'Ready...'
    const displayCounter = () =>{
        if (prepCounter > 0){
            counterDiv.innerText = prepCounter
            prepCounter--
        } else if(prepCounter === 0){
            counterDiv.innerText = 'START'
            prepCounter--
        }
        else{
            clearInterval(interval)
            dotGameStart()
            console.log('Game Start')
        }
    }
    let interval = setInterval(displayCounter, 1000)
}


const dotGameStart = () =>{
    clearMainDiv()
    let scoreCounter = 0
    let timer = 5
    let currentScore = document.createElement('h1')
    const timerDisplay = document.createElement('h1')
    const buttonDiv = document.createElement('div')
    const dot = document.createElement('div')
    const reStart = document.createElement('i')
    const quit = document.createElement('i')

    buttonDiv.id = 'right-top-corner'
    reStart.classList.add('fas', 'fa-undo', 'hover-enlarge')
    reStart.title = 'Restart'
    quit.classList.add('fas', 'fa-ban', 'hover-enlarge')
    currentScore.innerText = `Score: ${scoreCounter}`
    dot.id = 'dot-lv1'
    const changeTime = () => timerDisplay.innerText = `Time: ${timer}s`
    changeTime()
    
    reStart.addEventListener('click', ()=>{
        clearInterval(runningDot)
        clearInterval(gameTime)
        countDownBeforeGame()
    })
    quit.addEventListener('click', ()=>{
        clearInterval(gameTime)
        clearInterval(runningDot)
        main.id = 'main-container'
        gameNav()
    })

    dot.addEventListener('click', ()=>{
        scoreCounter+=100
        dot.style.display = 'none'
        currentScore.innerText = `Score: ${scoreCounter}`
    })
    let setDotProperty = (xLocation, yLocation) => {
        dot.style.setProperty('display', 'block')
        dot.style.setProperty('--xLocation', xLocation + '%')
        dot.style.setProperty('--yLocation', yLocation + '%')
    }

    let changeLocation = () =>{
        const xLocation = Math.random()*100;
        console.log(xLocation)
        const yLocation = Math.random()*100;
        console.log(yLocation)
        setDotProperty(xLocation, yLocation);
    }
    let runningDot = setInterval(() => {
        if (scoreCounter < 500){
            changeLocation()
        }
        else if (scoreCounter >= 500 && scoreCounter <1000){
            dot.id = 'dot-lv2'
            dot.addEventListener('click', ()=>scoreCounter+=5)
            changeLocation()
        }
        else if (scoreCounter >= 1000 && scoreCounter <1500){
            dot.id = 'dot-lv3'
            dot.addEventListener('click',()=>scoreCounter+=7)
            changeLocation()
        }
        else if (scoreCounter >= 1500){
            dot.id = 'dot-lv4'
            changeLocation()
        }
    }, 1400);

    const gameTime = setInterval(()=>gameCountDown(),1000)
//* SET UP FOR ANIMATION FOR TIMER SOON
    const gameCountDown = () => {
        if(timer > 5){
            timer--
            changeTime()
        } else if (timer <=5 && timer >3){
            timer--
            changeTime()
        } else if (timer === 0){
            endGame()
        } else {
            timer--
            changeTime()
        }
    }

    const endGame = () =>{
        let record = new DotGameScore(currentUser, scoreCounter)
        clearInterval(runningDot)
        clearInterval(gameTime)
        dotSummary(record)
    }
    
    buttonDiv.append(reStart, quit)
    main.append(currentScore,timerDisplay, dot, buttonDiv)
}

const dotSummary = (record) =>{
    main.innerHTML = ''
    const summaryDiv = document.createElement('div')
    const report = document.createElement('p')
    const buttonDiv = document.createElement('div')
    const tableDiv = document.createElement('div')
    const reStart = document.createElement('button')
    const quit = document.createElement('button')
    const submit = document.createElement('button')

    summaryDiv.id = 'summary'
    report.innerText = `Your Score: ${record.score}`
    submit.innerText = 'SUBMIT'
    quit.innerText = 'QUIT'
    reStart.innerText = 'RESTART'
    buttonDiv.className = 'summary-buttons'
    tableDiv.className = 'game-table'

    submit.addEventListener('click', (e)=>{
        submitScore(record)
        e.target.disabled = 'disabled'
    })
    reStart.addEventListener('click', countDownBeforeGame)
    quit.addEventListener('click', ()=>{
        main.id = 'main-container'
        gameNav()
    })
    buttonDiv.append(submit,reStart,quit)
    summaryDiv.append(report, buttonDiv, tableDiv)
    renderLeaderBoard().then(leaderBoard => tableDiv.appendChild(leaderBoard))
    main.appendChild(summaryDiv)
    console.log(record.score)
}

const submitScore = (record) =>{
    axios.post(redDotURL, record)
    .then(alert('Score sumitted successfully'))
}


const renderLeaderBoard = async () =>{
    const table = document.createElement('table')
    const titleTr = document.createElement('tr')
    const rankTh = document.createElement('th')
    const usernameTh = document.createElement('th')
    const scoreTh = document.createElement('th')

    rankTh.innerText = 'Rank'
    usernameTh.innerText = 'Username'
    scoreTh.innerText = 'Score'
    titleTr.append(rankTh, usernameTh, scoreTh)
    table.appendChild(titleTr)

    const res = await axios.get(`${redDotURL}/topscore`)
    for(let rank = 0; rank < res.data.length; rank++){
        const recordTr = document.createElement('tr')
        const rankTh = document.createElement('th')
        const usernameTh = document.createElement('th')
        const scoreTh = document.createElement('th')
        rankTh.innerText = `${rank+1}`
        usernameTh.innerText = `${res.data[rank].user.username}`
        scoreTh.innerText = `${res.data[rank].score}`
        recordTr.append(rankTh, usernameTh, scoreTh)
        table.appendChild(recordTr)
    }
    return table
}

const moreGames = () =>{
    clearMainDiv()
    let moreDiv = document.createElement('div')
    moreDiv.className = 'rule-div'
    moreDiv.innerText = 'More games under construction, bookmark this page to check back often'
    main.append(moreDiv)
}