const generateErrMessage = status => {
  const errContainer = document.createElement('h5')
  errContainer.classList.add('mt-2', 'mb-4', 'text-red-dark', 'text-center')
  errContainer.textContent = `${status} - Invalid username or password`

  return errContainer
}

const generateConfirmation = () => {
  const confirmContainer = document.createElement('div')

  const headingEl = document.createElement('h3')
  headingEl.classList.add('mb-4', 'text-center', 'text-blue-dark')
  headingEl.textContent = 'Successfully logged in'

  const textEl = document.createElement('p')
  textEl.classList.add('mb-6', 'text-center', 'text-blue-darker')
  textEl.textContent = 'You can now continue on using the API'

  confirmContainer.appendChild(headingEl)
  confirmContainer.appendChild(textEl)

  return confirmContainer
}

const submitForm = (username,password) => {
  const data = {
    email: username,
    password
  }

  fetch('/users/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  }).then(response => {
    if(response.status !== 200) {
      const errMessage = generateErrMessage(response.status)
      return document.querySelector('#password-container').appendChild(errMessage)
    }
    return response.json()
  }).then(responeJson => {
    sessionStorage.setItem('ltToken', responeJson.token)
    const confirmation = generateConfirmation()
    loginForm.remove()
    document.querySelector('#main-container').appendChild(confirmation)
  })
}
