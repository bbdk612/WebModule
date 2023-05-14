function lanceWilliams(
  alpha_U,
  alpha_V,
  beta,
  gamma,
  distance_US,
  distance_VS,
  distance_UV,
) {
  return (alpha_U * distance_US + alpha_V * distance_VS + beta * distance_UV +
    gamma * Math.abs(distance_US - distance_VS));
}
function distanceBetweenPoints(point1, point2) {
    return Math.sqrt( Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) )
  }

function HierarchyClusters(
  points,
  alpha_U,
  alpha_V,
  beta,
  gamma,
  numberOfClusters,
) {
  let distanceBetweenClusters = [];
  let clusters = [];
  //setting start
  console.log(points)
  for (let i = 0; i < points.length; i++) {
    let cluster_TMP = [];
    // console.log(points[i].index)
    cluster_TMP.push(points[i].index);
    clusters.push(cluster_TMP)
  }
  for (let i = 0; i < clusters.length; i++) {
    let distanceOnceCluster = [];
    for (let j = 0; j < clusters.length; j++) {
      distanceOnceCluster.push(
        distanceBetweenPoints(points[clusters[i][0]], points[clusters[j][0]]),
      );
    }
    distanceBetweenClusters.push(distanceOnceCluster);
  }
  //algorithm
  for (let t = 1; t < points.length - numberOfClusters + 1; t++) {
    let cluster_U;
    let cluster_V;
    let cluster_W = [];
    let minDistace = 1000000000000;
    for (let i = 0; i < clusters.length-1; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        if (distanceBetweenClusters[i][j] < minDistace) {
          minDistace = distanceBetweenClusters[i][j];
          cluster_U = i;
          cluster_V = j;
        }
      }
    }
    //creation of newClusters
    let newClusters = [];
    for(let i=0;i<clusters[cluster_U].length;i++){
        cluster_W.push(clusters[cluster_U][i]);
    }
    for(let i=0;i<clusters[cluster_V].length;i++){
        cluster_W.push(clusters[cluster_V][i]);
    }
    for (let i = 0; i < clusters.length; i++) {
      if (!(i === cluster_U || i === cluster_V)) {
        newClusters.push(clusters[i]);
      }
    }
    newClusters.push(cluster_W);
    //creation of newClustersDistance
    let newDistanceBetweenClusters = [...distanceBetweenClusters];
    //delete old clusters data
    for (let i=0; i<newDistanceBetweenClusters.length;i++){
        newDistanceBetweenClusters[i].splice(cluster_V,1)
    }
    for (let i=0; i<newDistanceBetweenClusters.length;i++){
        newDistanceBetweenClusters[i].splice(cluster_U,1)
    }
    newDistanceBetweenClusters.splice(cluster_V,1)
    newDistanceBetweenClusters.splice(cluster_U,1)
    //add new data
    let newCluster_Dis = []
    for(let i=0;i<newDistanceBetweenClusters[0].length;i++){
        let distance_US = distanceBetweenClusters[cluster_U][i];
        let distance_VS = distanceBetweenClusters[cluster_V][i];
        let distance_UV = distanceBetweenClusters[cluster_U][cluster_V];
        console.log(distanceBetweenClusters[cluster_U][cluster_V])
        console.log(cluster_U,cluster_V)
        console.log(lanceWilliams(alpha_U,alpha_V,beta,gamma,distance_US,distance_VS,distance_UV,))
        newCluster_Dis.push(lanceWilliams(alpha_U,alpha_V,beta,gamma,distance_US,distance_VS,distance_UV,))
    }
    newDistanceBetweenClusters.push(newCluster_Dis)
    for(let i = 0;i< newDistanceBetweenClusters.length;i++){
        let distance_US = distanceBetweenClusters[cluster_U][i];
        let distance_VS = distanceBetweenClusters[cluster_V][i];
        let distance_UV = distanceBetweenClusters[cluster_U][cluster_V];
        newDistanceBetweenClusters[i].push(lanceWilliams(alpha_U,alpha_V,beta,gamma,distance_US,distance_VS,distance_UV,))
    }
    //clusters = newClusters
    distanceBetweenClusters = [...newDistanceBetweenClusters];
    console.log(distanceBetweenClusters)
    clusters = [...newClusters];
  }
  console.log(clusters);
}
