// support
const data = require('./data');

const animals = data.animals;

const checkSex = (residents, option) => {
  let message = '';
  const array = [];
  residents.forEach((resident) => {
    if (resident.sex === option.sex) {
      array.push(resident.name);
    }
    message = array;
  });
  if (option.sorted) {
    message = array.sort();
  }
  return message;
};

const finalResidents = resident => resident.name;


const otherResidentsChoice = (residents, option) => {
  let message = '';
  if (option.includeNames && (option.sex === 'male' || option.sex === 'female')) {
    message = checkSex(residents, option);
  } else {
    message = residents.map(finalResidents);
  }
  return message;
};

const residentNameSort = resident => resident.name;

const residentsName = (residents, option) => {
  let message = '';
  if (option.includeNames && option.sorted && !option.sex) {
    message = residents.map(residentNameSort).sort();
  } else {
    message = otherResidentsChoice(residents, option);
  }
  return message;
};

const newInnerObject = (animal, option) => {
  const newObject = {};
  animals.find(({ name, residents }) => {
    if (animal === name) {
      newObject[animal] = residentsName(residents, option);
    }
    return false;
  });
  return newObject;
};

const arrangeOfAnimals = (arrayOfAnimal, option) => {
  const finalArray = [];
  arrayOfAnimal.forEach((animal) => {
    finalArray.push(newInnerObject(animal, option));
  });
  return finalArray;
};

const includingNames = (locationObject, option) => {
  const arrayOfEntries = Object.entries(locationObject);
  const newObject = {};
  arrayOfEntries.forEach((location, index) => {
    newObject[arrayOfEntries[index][0]] = arrangeOfAnimals(arrayOfEntries[index][1], option);
  });
  return newObject;
};


const locationObjectTemplate = (location) => {
  const arrayOfAnimals = [];
  animals.find((animal) => {
    if (animal.location === location) {
      arrayOfAnimals.push(animal.name);
    }
    return false;
  });
  return arrayOfAnimals;
};
const noParameter = () => {
  const locationObject = [];

  const finalObject = {};
  animals.forEach(({ location }) => {
    locationObject.push(location);
  });
  locationObject.forEach((location) => {
    finalObject[location] = locationObjectTemplate(location);
  });
  return finalObject;
};

module.exports = {
  noParameter,
  includingNames,
};
