class Node {
   constructor(value) { 
      this.value = value; 
   }

   addBranch(i) {
      this[`branch${i}`] = i;
   }
}

class Tree {
   constructor(adjacencyList) {
      this.adjacencyList = adjacencyList;
      this.root = this.buildTree();
   }

   buildTree(root = 0, adjacencyList = this.adjacencyList) {
      let node = new Node(root);
      adjacencyList = this.removeEdge(root, adjacencyList);
      for (let i = 0; i < adjacencyList[root].length; i++) {
         node.addBranch(adjacencyList[root][i]);
      }
      for (let branch in node) {
         if (branch == 'value') continue;
         node[branch] = this.buildTree(node[branch], adjacencyList);
      }
      
      return node;
   }

   removeEdge(value, adjacencyList) {
      let copy = structuredClone(adjacencyList);
      copy.forEach(array => {
         for (let i = 0; i < array.length; i++) {
            if (array[i] === value) { 
               array.splice(i, 1);
            }
         }
      })
      return copy;
   }
}

class AdjacencyList {
   constructor(rows = 4, columns = 4) {
      this.adjacencyList = [];
      for (let i = 0; i < rows * columns; i++) {
         let possibleEdges = [1, 2, 3, 4, 5, 6, 7, 8];
         if (i < rows) {
            this.removeEdges([1, 2, 7, 8], possibleEdges); // first row
         }
         if (i >= rows && i < rows * 2) {
            this.removeEdges([1, 8], possibleEdges); // second row
         }
         if ((i + 1) % columns == 0) {
            this.removeEdges([1, 2, 3, 4], possibleEdges); // most right column
         }
         if ((i + 2) % columns == 0) {
            this.removeEdges([2, 3], possibleEdges); // second most right column
         }
         if (i >= (rows * columns - rows)) {
            this.removeEdges([3, 4, 5, 6], possibleEdges); // last row
         }
         if (i >= (rows * columns - rows * 2) && i < rows * columns) {
            this.removeEdges([4, 5], possibleEdges); // second last row
         }
         if (i % columns == 0) {
            this.removeEdges([5, 6, 7, 8], possibleEdges); // most left column
         }
         if ((i - 1) % columns == 0) {
            this.removeEdges([6, 7], possibleEdges); // second most left column
         }
         
         let calculatedEdges = [];
         possibleEdges.forEach(edge => {
            if (edge == 1) {
               calculatedEdges.push(i - rows * 2 + 1);
            }
            if (edge == 2) {
               calculatedEdges.push(i - rows + 2);
            }
            if (edge == 3) {
               calculatedEdges.push(i + rows + 2);
            }
            if (edge == 4) {
               calculatedEdges.push(i + rows * 2 + 1);
            }
            if (edge == 5) {
               calculatedEdges.push(i + rows * 2 - 1);
            }
            if (edge == 6) {
               calculatedEdges.push(i + rows - 2);
            }
            if (edge == 7) {
               calculatedEdges.push(i - rows - 2);
            }
            if (edge == 8) {
               calculatedEdges.push(i - rows * 2 - 1);
            }
         }); 
      this.adjacencyList.push(calculatedEdges);
      }
   }

   removeEdges(edgeIndices, array) {
      edgeIndices.forEach(index => {
         for (let i = 0; i < array.length; i++) {
            if ( array[i] === index) { 
               array.splice(i, 1);
           }
         }
      });
      return array; 
   }
}

let adjacencyList = new AdjacencyList();
let tree = new Tree(adjacencyList.adjacencyList);
console.log(tree);