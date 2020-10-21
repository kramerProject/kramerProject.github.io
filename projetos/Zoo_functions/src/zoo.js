/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
const support = require('./support');

const animals = data.animals;
const employees = data.employees;
const prices = data.prices;
const hours = data.hours;

function animalsByIds(...ids) {
  // seu código aqui
  const message = [];
  let result = [];
  if (ids) {
    ids.forEach((element) => {
      result = animals.find(animal => element === animal.id);
      message.push(result);
    });
  }
  return message;
}

// support animalsOlderThan
const countAnimals = (allResidents, idade) => {
  const final = allResidents.reduce((count, { age }) => {
    if (age >= idade) {
      count += 1;
    }
    return count;
  }, 0);
  return final;
};

function animalsOlderThan(animal, age) {
  // seu código aqui
  const chosenAnimal = data.animals.filter(({ name }) => name === animal);
  const allResidents = chosenAnimal[0].residents;

  if (countAnimals(allResidents, age) === allResidents.length) {
    return true;
  }
  return false;
}

// support employee
const checkNames = (employeeName) => {
  const message = data.employees.filter(({ firstName, lastName }) => {
    if (firstName === employeeName || lastName === employeeName) {
      return true;
    }
    return false;
  });
  return message;
};
function employeeByName(employeeName) {
  // seu código aqui
  let message = [{}];
  if (employeeName) {
    message = checkNames(employeeName);
  }
  return message[0];
}


function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const spreadManagers = [];
  employees.forEach(({ managers }) => {
    managers.forEach(item => spreadManagers.push(item));
  });
  return spreadManagers.some(manager => manager === id);
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return employees;
}

// support
const animalNoParameter = () => {
  const animalCountObject = {};
  animals.forEach(({ name, residents }) => {
    animalCountObject[name] = residents.length;
  });
  return animalCountObject;
};

function animalCount(species) {
  // seu código aqui
  let message = animalNoParameter();
  if (species) {
    const found = animals.find(animal => animal.name === species);
    message = found.residents.length;
  }
  return message;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  if (Object.values(entrants).length === 0) {
    entrants = 0;
  } else if (Object.values(entrants).length > 0) {
    const { Adult = 0, Senior = 0, Child = 0 } = entrants;
    entrants = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  }
  return entrants;
}

// support in support.js

function animalMap(options) {
  // seu código aqui
  let message = '';
  if (!options || !options.includeNames) {
    message = support.noParameter();
  } else {
    message = support.includingNames(support.noParameter(), options);
  }
  return message;
}


// support schedule
const scheduleWithDay = (dayName) => {
  const finalObject = {};
  const arrayOfHours = Object.entries(hours);
  const dayFound = arrayOfHours.find(day => day[0] === dayName);

  const [day, { open, close }] = dayFound;

  if (day === 'Monday') {
    finalObject[day] = 'CLOSED';
  } else {
    finalObject[day] = `Open from ${open}am until ${close - 12}pm`;
  }
  return finalObject;
};


function schedule(dayName) {
  // seu código aqui
  let scheduleObject = {};
  const arrayOfHours = Object.entries(hours);
  if (!dayName) {
    arrayOfHours.forEach((day) => {
      if (day[0] === 'Monday') {
        scheduleObject[day[0]] = 'CLOSED';
      } else {
        scheduleObject[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
      }
    });
  } else {
    scheduleObject = scheduleWithDay(dayName);
  }
  return scheduleObject;
}

// support oldestSpecies
const oldestSupport = (animalsChosen) => {
  let biggest = 0;
  let final = [];
  animalsChosen.forEach((animal) => {
    if (animal.age > biggest) {
      biggest = animal.age;
      final = Object.values(animal);
    }
  });
  return final;
};
function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstAnimal = 0;
  const employee = employees.find(element => element.id === id);
  const animalId = employee.responsibleFor[firstAnimal];

  const animalsChosen = animals.find(animal => animal.id === animalId).residents;

  const final = oldestSupport(animalsChosen);
  return final;
}

function increasePrices(percentage) {
  // seu código aqui
  const increase = 1 + (percentage / 100);
  const { Adult, Senior, Child } = prices;
  prices.Adult = (Math.round((Adult * increase) * 100)) / 100;

  prices.Senior = (Math.round((Senior * increase) * 100)) / 100;
  prices.Child = (Math.round((Child * increase) * 100)) / 100;

  return prices;
}

// support employee Coverage
const employeeAnimal = (responsibleFor) => {
  const arrayOfAnimal = [];
  responsibleFor.forEach((animalId) => {
    animals.filter(({ id, name }) => {
      if (id === animalId) {
        arrayOfAnimal.push(name);
      }
      return false;
    });
  });
  return arrayOfAnimal;
};

const withNameId = (idOrname) => {
  const newObject = {};
  employees.filter(({ id, firstName, lastName, responsibleFor }) => {
    if (idOrname === id || idOrname === firstName || idOrname === lastName) {
      newObject[`${firstName} ${lastName}`] = employeeAnimal(responsibleFor);
    }
    return false;
  });
  return newObject;
};
function employeeCoverage(idOrName) {
  // seu código aqui
  const newObject = {};
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      newObject[`${firstName} ${lastName}`] = employeeAnimal(responsibleFor);
    });
  } else {
    return withNameId(idOrName);
  }
  return newObject;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
