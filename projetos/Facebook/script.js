const buttonLogin = document.getElementById('button-login');

buttonLogin.addEventListener('click', function () {
  const emailInput = document.getElementById('user-email-phone');
  alert(emailInput.value);
});

const buttonRegister = document.getElementById('facebook-register');
const personal = document.getElementById('personal');
const form = document.getElementById('form');


function deleteForm() {
  const rightContentDelete = document.getElementsByClassName('right-content');

  const counter = rightContentDelete[0].childElementCount;
  for (let index = 0; index < counter; index += 1) {
    const childItem = rightContentDelete[0].children[0];
    rightContentDelete[0].removeChild(childItem);
  }
}

function createMessage(name, lastName, email, date, gender) {
  deleteForm();

  const rightContent = document.getElementsByClassName('right-content')[0];
  const message = document.createElement('p');
  const message2 = document.createElement('p');
  message.classList.add('new-paragraph')
  message2.classList.add('new-paragraph2')
  message.innerText = `Olá, ${name} ${lastName}`;
  message2.innerText = `Cadastro Realizado com sucesso. Uma mensagem foi enviada para o seu email: ${email}
  `;
  rightContent.appendChild(message);
  rightContent.appendChild(message2);
}

function checkGender(feminino, masculino) {
  let message = '';
  if (feminino) {
    message = 'Feminino';
  } else if (masculino) {
    message = 'Masculino';
  } else {
    message = 'Personalizado';
  }

  return message;
}

buttonRegister.addEventListener('click', function () {
  event.preventDefault();
  const inputItems = document.getElementsByClassName('input-item');
  let counter = 0;
  for (let index = 0; index < inputItems.length; index += 1) {
    const result = inputItems[index];
    if (result.value === '') {
      counter += 1;
    }
  }
  const feminino = document.getElementById('feminino').checked;
  const masculino = document.getElementById('masculino').checked;

  const gender = checkGender(feminino, masculino);

  const name = inputItems[0].value;
  const lastName = inputItems[1].value;
  const email = inputItems[2].value;
  const date = inputItems[4].value;


  const gen = ((feminino) === false && (masculino) === false && (personal.checked) === false);
  if (counter > 0 || gen === true) {
    const tagP = document.createElement('p');
    tagP.innerText = 'Campos inválidos';
    form.appendChild(tagP);
  } else {
    createMessage(name, lastName, email, date, gender);
  }
});


const buttonBox = document.getElementById('button-box');
personal.addEventListener('click', function () {
  const inputGender = document.querySelector('.input-item.gender')
  if (!inputGender) {
    const newInput = document.createElement('input');
    form.insertBefore(newInput, buttonBox);
    newInput.name = 'gender-custom';
    newInput.placeholder = 'Gender (optional)';
    newInput.classList.add('input-item')
    newInput.classList.add('gender')
  }
});

const sex = document.querySelectorAll('.sex')

sex.forEach((element) => {
  element.addEventListener('click', (event) => {
    const inputGender = document.querySelector('.input-item.gender')
    if (inputGender) {
      const parent = inputGender.parentNode
      parent.removeChild(inputGender)
    }
  })
})