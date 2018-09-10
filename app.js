const request = require('request');
const timesOfRequest = 10;
const numberOfImage = 86;
const data = require('./data');
const fs = require('fs');

// name generator
makeName = () => {
  let i1 = Math.floor(Math.random() * 20);
  let i2 = Math.floor(Math.random() * 20);
  let i3 = Math.floor(Math.random() * 20);
  while (data.lastName[i1] === data.middleName[i2] || data.middleName[i2] === data.firstName[i3] || data.lastName[i1] === data.firstName[i3]) {
    i1 = Math.floor(Math.random() * 20);
    i2 = Math.floor(Math.random() * 20);
    i3 = Math.floor(Math.random() * 20);
  }
  return data.lastName[i1] + data.middleName[i2] + data.firstName[i3];
}

// make random number of asterimsms
makeAsterisms = () => {
  let asterisms = '';
  const maxAsterisms = 3;
  const asterismsNumber = Math.floor(Math.random() * (maxAsterisms + 1));
  for (let i = 0; i < asterismsNumber - 1; i++) {
    const randomIndex = Math.floor(Math.random() * data.dummy.length);
    const asterismName = data.dummy[randomIndex];
    asterisms += `${asterismName} `;
  }
  const randomIndex2 = Math.floor(Math.random() * data.dummy.length);
  return asterisms + data.dummy[randomIndex2];
}

postHandler = () => {
  const name = makeName();
  const asterisms= makeAsterisms();
  const imageName = `IMG_${Math.floor(Math.random() * (numberOfImage)) + 1}`;

  const formData = {
    starName: name,
    msg: `${asterisms.split(' ')[0] || ''} ${name}`,
    asterisms: asterisms,
    img: fs.createReadStream(__dirname + `/img/${imageName}.png`)
  }
  return request.post({url:'http://52.78.57.243:5000/star', formData: formData})
}

// loop for post request 
for (let i = 0; i < timesOfRequest; i++) {
  postHandler();
}

console.log("Post request number:", timesOfRequest);