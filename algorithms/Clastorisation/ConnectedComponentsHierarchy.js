function lanceWilliams(alpha_U,alpha_V,beta,gamma,distanceBetweenClusters,cluster_U,cluster_V,cluster_S){
    let distance_US=distanceBetweenClusters[cluster_U][cluster_S]
    let distance_VS=distanceBetweenClusters[cluster_V][cluster_S]
    let distance_UV=distanceBetweenClusters[cluster_U][cluster_V]
    return alpha_U*distance_US+alpha_V*distance_VS+beta*distance_UV+gamma*Math.abs(distance_US-distance_VS)
}
function conCompClusters(points, alpha_U,alpha_V,beta,gamma,numberOfClusters) {
    let distanceBetweenClusters=[]
    let clusters = []
    //setting start
    for (let i = 0;i<points.length;i++){
        clusters.push(point[i].index)
    }
    for (let i = 0;i<clusters.length*clusters.length;i++){
        let distanceOnceCluster=[]
        for(let j=0;j<clusters.length*clusters.length;j++){
            distanceOnceCluster.push(distanceBetween(point[clusters[i]],point[clusters[j]]))
        }
        distanceBetweenClusters.push(distanceOnceCluster)
    }
    //algorithm
    for(let t=1;t<points.length-numberOfClusters;t++){
        let cluster_U
        let cluster_V
        let cluster_W
        let minDistace=1000000000000
        for (let i=0;i<(clusters.length*clusters.length)-1;i++){
            for (let j = i+1; j<clusters.length*clusters.length;j++){
                if (distanceBetweenClusters<minDistace){
                    minDistace=distanceBetweenClusters
                    cluster_U=i
                    cluster_V=j
                }
            }
        }
        //creation of newClusters
        let newClusters=[]
        cluster_W.push(clusters[cluster_U])
        cluster_W.push(clusters[cluster_V])
        for (let i = 0;i<points.length;i++){
            if(i===cluster_U||i===cluster_V){
                newClusters.push(clusters[i])
            }
        }
        newClusters.push(cluster_W);
        //creation of newClustersDistance
        let newDistanceBetweenClusters = distanceBetweenClusters;
        newDistanceBetweenClusters.splice(newDistanceBetweenClusters[cluster_V],1)
        newDistanceBetweenClusters.splice(newDistanceBetweenClusters[cluster_U],1)
        for (let i = 0;i<(clusters.length*clusters.length)-1;i++){
            newDistanceBetweenClusters[i].splice(newDistanceBetweenClusters[cluster_V],1)
            newDistanceBetweenClusters[i].splice(newDistanceBetweenClusters[cluster_U],1)
        }
        for(let i = 0; i<newDistanceBetweenClusters.length;i++){
            newDistanceBetweenClusters.push(lanceWilliams(alpha_U,alpha_V,beta,gamma,distanceBetweenClusters,cluster_U,cluster_V,i))
        }
        let cluster_WDistance=[];
        for (let i = 0;i<(clusters.length*clusters.length)-1;i++){
            cluster_WDistance.push(lanceWilliams(alpha_U,alpha_V,beta,gamma,distanceBetweenClusters,cluster_U,cluster_V,i))
        }
        newDistanceBetweenClusters.push(cluster_WDistance)
        distanceBetweenClusters=newDistanceBetweenClusters
        clusters=newClusters
    }
}