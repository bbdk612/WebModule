const randInt = (max, min = 0) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

function conCompClusters(points, R) {
    unvisitedPoints = points
    let colors = []
    let clusters = []
    while (unvisitedPoints.length > 0) {
        console.log(unvisitedPoints)
        let GrCenterIndex = randInt(unvisitedPoints.length - 1)
        let GraphCenter = unvisitedPoints[GrCenterIndex]
        unvisitedPoints.splice(GrCenterIndex, 1) 
        let color
        do {
            color = `rgb(${randInt(255, 0)}, ${randInt(255, 0)}, ${randInt(255, 0)})`
        } while (colors.includes(color));

        colors.push(color)
        let cluster = new Graph(GraphCenter, color)
        for (let i = 0; i < unvisitedPoints.length; i++) {
            if (Point.distanceBetween(unvisitedPoints[i], GraphCenter) <= R) {
                cluster.addPoint(unvisitedPoints[i])
                unvisitedPoints.splice(i, 1)
            }
        }

        clusters.push(cluster)
    }

    for (let cluster of clusters) {
        Point.ClearField(cluster.points)
    }
}