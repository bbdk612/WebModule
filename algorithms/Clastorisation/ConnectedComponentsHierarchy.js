function conCompClusters(points, R,alpha_U,alpha_V,beta,gamma) {
    console.log(R);
    let distanceBetweenClusters=[];
    let clusters = [];
    //setting start
    for (let i = 0;i<points.length;i++){
        clusters.push(point[i]);
    }
    for (let i = 0;i<(clusters.length*clusters.length)-1;i++){
        for(let j=i+1;j<clusters.length*clusters.length;j++){
            distanceBetweenClusters[i][j]=distanceBetween(clusters[i],clusters[j])
        }
    }
    //algorithm
    for(let t=1;t<points.length;t++){
        let point_U;
        let point_V;
        let minDistace=1000000000000;
        for (let i=0;i<(clusters[t-1].length*clusters.length)-1;i++){
            for (let j = i+1; j<clusters[t-1].length*clusters.length;j++){
                if (distanceBetweenClusters<minDistace){
                    minDistace=distanceBetweenClusters;
                    point_U=i;
                    point_V=j;
                }
            }
        }
        let newCluster=[];
        newCluster=clusters;
    }
}