// Imagine that you're a teacher who's just graded the final exam in a class. You have
// a list of student scores on the final exam in a particular order(not necessarily
// sorted), and you want to reward your students. You decide to do so fairly by giving
// them arbitrary rewards following two rules:

// 1. All students must receive at least one reward.
// 2. Any given student must receive strictly more rewards than an adjacent student
// (a student immediately to the left or to the right) with a lower score and
// must receive strictly fewer rewards than an adjacent student with a higher score.

// Write a function that takes in a list of scores and returns the minimum number
// of rewards that you must give out to students to satisfy the two rules.

// You can assume that all students have different scores; in other words, the
// scores are all unique.

// Sample input: scores = [8, 4, 2, 1, 3, 6, 7, 9, 5]
// Sample output: 25
// (you would give out the following rewards:[4, 3, 2, 1, 2, 3, 4, 5, 1])

//Naive approach: So in thinking about these two rules, it would not work to sort
//the scores array in ascending/descending order because the rewards given out would
//be strictly higher than the sample output of 25, given that rewards would go as
//follow: [1, 2, 3, 4, 5, 6, 7, 8, 9] for a total of 45. The correct approach is
//to loop in place and check the value of the current index compared to the next
//index's value in the array. We then check which of these values is the lowest
//to assign it a reward value of 1. We can add that value to a hash table we can use
// to store the rewards of all students. We can also check if it's going to be
//the end of the array and assign a 1 value to the last index's reward, to keep with
//the challenge of finding the minimum amount of rewards. I think with this approach
//we can achieve the minimum amount of rewards.

//Maybe the way to think about this algorithm is to use a Binary Tree. By assigning
//the value of 1 to the root node, we can then assign the values 2 and 3 of it's
//adjacent indices in the array to be it's children now. From there, we can assign
//a left or a right assignation to the remaining children nodes depending on if
//their value is greater than or less than the current node. So in the case of 2,
//it's only child node would be 4, which would be assigned to 2 as it's child.right
//node. Same goes for 4 and it's child 8, it would also go assigned as child.right.

//Here's what that would look like.

//scoresTree =      1
//               /    \
//              2     3
//               \     \
//               4     6
//                \     \
//                8     7
//                       \
//                       9
//                      /
//                     5

//Then we can traverse through the tree and check whether the value of current node
//has been stored in the rewards hash table. If it hasn't, we store it and we add it
//to minimumSum. If it *has* been stored, we recurse. By the end of the
//depth-first search we can return the minimumSum.

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }

//   addChild(value) {
//     if(this.value <= 0) {
//     this.right.push(new Node(value));
//     }
//     return this;
//   }
// };

//   function dfs(array, node = this){
//     let rewards = {};
//     let minSum;
//     if(!rewards[node.value]){
//     rewards[node.value] = true
//     minSum += 1;
//     }

//     for(const child in node.children) {
//       this.dfs(array, child);
//     }
//     return minSum;
//   }

//Worth leaving up here all these notes. The above approach definitely does not work.
//After some thought and guidance, finding the minimum values in the scores array
//was definitely the right approach. But instead of using a tree, we can just
//loop through the array once to the left, another to the right. As we loop, we
//compare values with the value that came before current index, if the current value
//is lower than the previous value, we store *i*(the current index) in the rewards
//array with *j*(a value of integer value of current index - 1). Now, while *j* is
//greater than or equal to zero and the value of the index j of scores array is
//less than the value of the index j + 1(the index that comes to the right of j),
//we make the j index at the rewards array equal to whatever the max is between the
//value of j index at the rewards array or the next index value of the rewards array
//plus 1(1 + 1 basically). Then we can decrement j and keep looping until we're
//at the end of the loop.

//in the end we return the total sum of all rewards.

//time complexity: Given that we're only looping through the array, the runtime is
//linear equal to the number of values in the input array.

//space complexity: Given that we have to store the value of all rewards in its own
//array, the space complexity is linear equal to the number of values in the
//rewards array.

//O(n) time | O(n) space complexity
function minRewards(scores) {
  // Write your code here.
  let rewards = [];
  let minSum = 0;
  scores.forEach((e, i) => {
    rewards.push(1);
  });

  for (let i in scores) {
    let j = i - 1;
    if (scores[i] > scores[j]) {
      rewards[i] = rewards[j] + 1;
    } else {
      while (j >= 0 && scores[j] > scores[j + 1]) {
        rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
        j -= 1;
      }
    }
  }
  const Sum = (t, n) => t + Math.round(n);

  return rewards.reduce(Sum, 0);
}
