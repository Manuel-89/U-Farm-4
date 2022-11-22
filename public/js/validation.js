const name= document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('error');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (error) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 charecters')
    }

    if (password.value.length <= 6) {
        messages.push('Password cannot be password')
    }

    if (password.value.length >= 20) {
        messages.push('Password must be less than 20 charecters')
    }

    if (messages.length > 0) {        
        error.preventDefault()
        errorElement.innerText = messages.join(',')
    }
})