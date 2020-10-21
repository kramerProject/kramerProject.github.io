function mostRepeatedNumber(numbers) {
  let mostRepeated = 0
  /* Checking if any number repeats greater or equal 3*/
  numbers.forEach((element) => {
    let numberOfTimesRepeat = 0
    for (let j in numbers) {
      if (element === numbers[j]) {
        numberOfTimesRepeat += 1
      }
    if (numberOfTimesRepeat > mostRepeated) {
      mostRepeated = numberOfTimesRepeat
    }
  }   
})
  return mostRepeated
}
console.log(mostRepeatedNumber([4, 2, 4, 4, 5, 6, 7, 8, 9, 0, -1]))