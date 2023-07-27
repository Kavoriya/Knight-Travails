class Node {
   constructor(value) { 
      this.value = value; 
      this.visited = false;
      this.prev = null;
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
         if (branch == 'value' || branch == 'prev'|| branch == 'visited') continue;
         node[branch] = this.buildTree(node[branch], adjacencyList);
      }
      
      return node;
   }

   find(value, node = this.root) {
      node = structuredClone(node);
      let queue = [];
      let result = [];
      queue.push(node);
      while (queue[0].value != value) {
         for (let branch in queue[0]) {
            if (branch == 'value' || branch == 'prev'|| branch == 'visited') continue;
            queue.push(queue[0][branch]);
         }
         result.push(queue[0].value);
         queue.shift();
      }
      result.push(queue[0].value)
      return result;
   }

   bfs(target) {
      let queue = [];
      this.root.visited = true;
      queue.push(this.root);
      while (queue.length != 0) {
         let current = queue.shift();
         for (let branch in current) {
            if (branch == 'value' || branch == 'prev'|| branch == 'visited') continue;
            if (!current[branch].visited) {
               current[branch].visited = true;
               queue.push(current[branch]);
               current[branch].prev = current;
            }
            if (current[branch].value == target) {
               return (this.traceRoute(current[branch]))
            }
         }
      }
   }

   traceRoute(node) {
      let trace = [];
      while (node != null) {
         trace.push(node);
         node = node.prev;
      }
      return trace.reverse();
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
console.log(tree.bfs(12));
console.log(tree);