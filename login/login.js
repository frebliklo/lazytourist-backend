const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')

const loginForm = document.querySelector('#login-form')
const loginButton = document.querySelector('#login-button')

loginButton.addEventListener('click', e => {
  e.preventDefault()
  submitForm(usernameInput.value, passwordInput.value)
})

loginForm.addEventListener('submit', e => {
  e.preventDefault()
  submitForm(usernameInput.value, passwordInput.value)
})
