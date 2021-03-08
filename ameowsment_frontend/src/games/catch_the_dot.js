

class DotGameScore {
    constructor(user, score){
        this.user_id = user.id
        this.score = score
    }
}

const catchTheDotGameMenu = () =>{
    clearMainDiv()
    const ruleDiv = document.createElement('div')
    ruleDiv.className = 'rule-div'
    ruleDiv.innerText = 'Rule Goes Here'
    const startBtn = document.createElement('button')
    startBtn.innerText = 'START'
    startBtn.className = 'hover-enlarge'
    ruleDiv.appendChild(startBtn)
    main.append(ruleDiv)
    startBtn.addEventListener('click', countDownBeforeGame)
} 

const countDownBeforeGame = () =>{
    clearMainDiv()
    sideNav.style.display = 'none'
    const counterDiv = document.createElement('div')
    main.appendChild(counterDiv)
    let prepCounter = 3
    counterDiv.innerText = 'Ready...'
    const displayCounter = () =>{
        console.log(prepCounter)
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
        }
    }
    let interval = setInterval(displayCounter, 1000)
}


const dotGameStart = () =>{
    clearMainDiv()
    let scoreCounter = 0
    let currentScore = document.createElement('h1')
    const dot = document.createElement('div')
    const reStart = document.createElement('button')
    const quit = document.createElement('quit')
    reStart.addEventListener('click', countDownBeforeGame)
    quit.addEventListener('click', ()=>{
        clearInterval(runningDot)
        gameNav()
    })
    reStart.innerText = 'Restart'
    quit.innerText = 'Quit'
    currentScore.innerText = `Score: ${scoreCounter}`
    dot.id = 'dot-lv1'
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

    
    setTimeout(() => {
        let record = new DotGameScore(currentUser, scoreCounter)
        clearInterval(runningDot)
        dotSummary(record)
    }, 0);
    
    
    main.append(currentScore, dot, reStart, quit)
}

const dotSummary = (record) =>{
    main.innerHTML = ''
    const summaryDiv = document.createElement('div')
    const report = document.createElement('p')
    const reStart = document.createElement('button')
    const quit = document.createElement('button')
    const submit = document.createElement('button')
    report.innerText = `Your Score: ${record.score}`
    submit.innerText = 'SUBMIT'
    quit.innerText = 'QUIT'
    reStart.innerText = 'RESTART'
    submit.addEventListener('click', (e)=>{
        submitScore(record)
        e.target.disabled = 'disabled'
    })
    reStart.addEventListener('click', countDownBeforeGame)
    quit.addEventListener('click', gameNav)
    summaryDiv.append(report,submit, reStart, quit)
    main.appendChild(summaryDiv)
    console.log(record.score)
}

const submitScore = (record) =>{
    axios.post(redDotURL, record)
    .then(alert('Score sumitted successfully'))
}