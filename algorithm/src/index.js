const graph = {
  a: {
    b: 10,
    c: 3,
  },
  b: {
    c: 1,
    d: 2,
  },
  c: {
    b: 4,
    d: 8,
    e: 2,
  },
  d: {
    e: 7,
  },
  e: {
    d: 9,
  },
}

const djikstra = (graph, start, goal) => {
  const shortestDistance = {};
  const predecessor = {};
  const unseenNodes = { ...graph };
  const infinity = 999999999999;
  let path = [];

  for (let node in graph) {
    shortestDistance[node] = infinity;
  }
  shortestDistance[start] = 0;

  while (Object.keys(unseenNodes).length > 0) {
    let minNode = null;

    for(let node in unseenNodes) {
      if (minNode === null) {
        minNode = node;
      } else if (shortestDistance[node] < shortestDistance[minNode]) {
        minNode = node;
      }
    }

    for (const childNode in graph[minNode]) {
      const weight = graph[minNode][childNode];

      if (weight + shortestDistance[minNode] < shortestDistance[childNode]) {
        shortestDistance[childNode] = weight + shortestDistance[minNode];
        predecessor[childNode] = minNode;
      }
    }

    delete unseenNodes[minNode];
  }

  let currentNode = goal;
  while (currentNode !== start) {
    path = [currentNode, ...path];
    currentNode = predecessor[currentNode]
  }

  path = [start, ...path];
};

djikstra(graph, 'a', 'd');
