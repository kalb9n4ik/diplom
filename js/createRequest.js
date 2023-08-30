const sendRequest = (str, callback) => {
    fetch('https://jscp-diplom.netoserver.ru/', {
      method: 'POST',
      body: str, // Тело запроса в JSON-формате
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      callback(data)
    })
    
}

