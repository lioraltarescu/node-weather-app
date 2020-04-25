console.log("client side javascript file is loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit' ,(e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'L-O-A-D-I-N-G'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if ( data.error ) {
            return messageOne.textContent='error ' + data.error
        }
        messageOne.textContent='location: ' + data.location
        messageTwo.textContent='forcast: ' + data.forecast

    })
})
} )