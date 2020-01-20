const API = 'http://127.0.0.1:5000/api/v1.0/'

export const fetcher = async (uri, method, payload) => {
  const response = await 
  fetch(API + uri + '/', {
      method: method,
      headers: {
        'Authorization': 'Basic ' + btoa('web:test'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: payload ? JSON.stringify(payload) : null
    })
  .catch((error) => {
    console.error(error)
  })
  .then(res => res.json())

  return response
}