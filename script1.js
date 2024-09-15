function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const leftHalf = mergeSort(arr.slice(0, mid));
  const rightHalf = mergeSort(arr.slice(mid));

  return merge(leftHalf, rightHalf);
}

function merge(left, right) {
  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      sortedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      sortedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return sortedArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const testArrays = [
  [],
  [1, 1, 1, 1],
  [5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
  [3, 1, 4, 1, 5, 9, 2, 6]
];

testArrays.forEach(arr => {
  console.log('Original array:', arr);
  console.log('Sorted array:', mergeSort(arr));
  console.log();
});
