import { appPage } from './app.js'

new appPage('#app')

const buttonList = document.querySelector('.save-button')

buttonList.addEventListener('click',() => {
    document.querySelector('.box-movies').classList.toggle('hide')
})


