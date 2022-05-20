
const array = new Array(10000000).fill(100000);

console.log('array:', array);

// var sum = 0;
// if(array.length % 2 == 0) {
//     let left = 0;
//     let right = array.length - 1;
//     while(left < right) {
//         sum += array[left]+array[right];
//         left++;
//         right--;
//     }
// }
// else {
//     // console.log("odd");
//     let half = Math.floor(array.length/2);
//     // console.log(half);
//     let left = 0;
//     let right = half+1;
    
//     // console.log(left,right);
//     while(right <= array.length-1 || left <= half) {
//         if(right <= array.length-1) {
//             sum += array[left]+array[right];
//         }
//         else {
//             sum += array[left];
//         }
//         // console.log(sum);
//         left++;
//         right++;
//     }
// }
// console.log(sum);

// for(var k = 0; k<array.length; k++) {
//     sum += array[k];    
// }
// console.log(sum);