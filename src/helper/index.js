const API = 'https://logboek-siak.herokuapp.com/api/v1.0/'

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
  .then(res => res.json())

  return response
}

export const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const numberSep = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}