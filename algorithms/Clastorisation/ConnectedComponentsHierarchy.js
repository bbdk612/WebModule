function lanceWilliams(
  alpha_U,
  alpha_V,
  beta,
  gamma,
  distance_US,
  distance_VS,
  distance_UV,
) {
  return alpha_U * distance_US + alpha_V * distance_VS + beta * distance_UV +
    gamma * Math.abs(distance_US - distance_VS);
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
  for (let i = 0; i < points.length; i++) {
    // console.log(points[i].index)
    clusters.push(points[i].index);
  }
  for (let i = 0; i < clusters.length; i++) {
    let distanceOnceCluster = [];
    for (let j = 0; j < clusters.length; j++) {
      distanceOnceCluster.push(
        Point.distanceBetween(points[clusters[i]], points[clusters[j]]),
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
    for (let i = 0; i < clusters.length; i++) {
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
    cluster_W.push(clusters[cluster_U]);
    cluster_W.push(clusters[cluster_V]);
    console.log(cluster_W)
    for (let i = 0; i < points.length; i++) {
      if (i !== cluster_U && i !== cluster_V) {
        newClusters.push(clusters[i]);
      }
    }
    newClusters.push(cluster_W);
    console.log(newClusters)
    //creation of newClustersDistance
    let newDistanceBetweenClusters = [...distanceBetweenClusters];
    newDistanceBetweenClusters.splice(newDistanceBetweenClusters[cluster_V], 1);
    newDistanceBetweenClusters.splice(newDistanceBetweenClusters[cluster_U], 1);
    for (let i = 0; i < newDistanceBetweenClusters.length; i++) {
      newDistanceBetweenClusters[i].splice(
        newDistanceBetweenClusters[cluster_V],
        1,
      );
      newDistanceBetweenClusters[i].splice(
        newDistanceBetweenClusters[cluster_U],
        1,
      );
    }
    for (let i = 0; i < newDistanceBetweenClusters.length; i++) {
      // console.log(cluster_U)
      newDistanceBetweenClusters[i].push(
        lanceWilliams(
          alpha_U,
          alpha_V,
          beta,
          gamma,
          distanceBetweenClusters[cluster_U][i],
          distanceBetweenClusters[cluster_V][i],
          distanceBetweenClusters[cluster_U][cluster_V],
        ),
      );
    }
    let cluster_WDistance = [];
    for (let i = 0; i < newDistanceBetweenClusters.length; i++) {
      cluster_WDistance.push(
        lanceWilliams(
          alpha_U,
          alpha_V,
          beta,
          gamma,
          distanceBetweenClusters[cluster_U][i],
          distanceBetweenClusters[cluster_V][i],
          distanceBetweenClusters[cluster_U][cluster_V],
        ),
      );
    }
    newDistanceBetweenClusters.push(cluster_WDistance);
    distanceBetweenClusters = [...newDistanceBetweenClusters];
    clusters = [...newClusters];
  }
  console.log(clusters);
}
