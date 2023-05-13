function conCompClusters(points, R) {
    console.log(R)
    unvisitedPoints = [...points]
    let colors = []
    let clusters = []
    while (unvisitedPoints.length > 0) {
        console.log(unvisitedPoints)
        let GrCenterIndex = randInt(unvisitedPoints.length - 1)
        let GraphCenter = unvisitedPoints[GrCenterIndex]
        console.log(GraphCenter)
        unvisitedPoints.splice(GrCenterIndex, 1) 
        let color
        do {
            color = `rgb(${randInt(255, 0)}, ${randInt(255, 0)}, ${randInt(255, 0)})`
        } while (colors.includes(color));

        colors.push(color)
        let cluster = new Graph(GraphCenter, color)
        let i = 0;
        while (unvisitedPoints.length > 0 && i < unvisitedPoints.length) {
            console.log(unvisitedPoints.length)
            console.log(Point.distanceBetween(unvisitedPoints[unvisitedPoints.length - 1], GraphCenter))
            if (Point.distanceBetween(unvisitedPoints[unvisitedPoints.length - 1], GraphCenter) <= R) {
                cluster.addPoint(unvisitedPoints[unvisitedPoints.length - 1])
                unvisitedPoints.pop()
                i = 0
            } else {
                i++
            }
        }

        clusters.push(cluster)
    }

    Point.ClearField(points)
}