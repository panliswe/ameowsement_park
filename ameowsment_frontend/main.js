
//* THINGGY MOVING AROUND MODULES
let div = document.querySelector('div#testing')

let setXProperty = (xLocation, yLocation) => {
    div.style.setProperty('--xLocation', xLocation + '%')
    div.style.setProperty('--yLocation', yLocation + '%')
}

let changeLocation = () =>{
    const xLocation = Math.random()*100;
    console.log(xLocation)
    const yLocation = Math.random()*100;
    setXProperty(xLocation, yLocation);
}

setInterval(changeLocation, 1200);

//* LV2 MODULES
let div2 = document.querySelector('div#testing2')

let setYProperty = (xLocation, yLocation) => {
    div2.style.setProperty('--xLocation', xLocation + '%')
    div2.style.setProperty('--yLocation', yLocation + '%')
}

let changeAnotherLocation = () =>{
    const xLocation = Math.random()*100;
    console.log(xLocation)
    const yLocation = Math.random()*100;
    setYProperty(xLocation, yLocation);
}

setInterval(changeAnotherLocation, 1500)