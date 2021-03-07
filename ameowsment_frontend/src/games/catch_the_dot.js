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
    const counterDiv = document.createElement('div')
    main.appendChild(counterDiv)
    let prepCounter = 3
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
    const scoreCounter = 0
    let gamePlay
    

        switch(scoreCounter){
            case (scoreCounter < 500):
                console.log('hello')
                scoreCounter+=100

        }

    let score = document.createElement('h1')
    score.innerText = `Score: ${scoreCounter}`
    const dotLv1 = document.createElement('div')
    dotLv1.id = 'dot-lv1'
    main.append(score, dotLv1)
}




// //* THINGGY MOVING AROUND MODULES
// let div = document.querySelector('div#dot-lv1')

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