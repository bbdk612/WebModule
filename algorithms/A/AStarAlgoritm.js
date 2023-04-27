function distanceToEnd(size, endPoint, currentPoint) {
	return (Math.abs(currentPoint / size - endPoint / size) + Math.abs(currentPoint % size - endPoint % size));
}

function AStarAlgoritm(size, start, end) {
	let minDis = Array();//minimal distance from start to this point
	let used_points = Array();//array of potencial and visited points 
	let potencial = Array();//array of point that border with visited points
	let tmp;//tmp array
	let tmp_x;//как вариант убрать эту переменную нахуй т.к. js ведь не требователен к типам и можно тогда присваивать временные данные к tmp(я ебал формулировать ЭТО на иглише)
	let min_index = 0;//closest to end potencial point
	let min;//minimal distance in way: start->current point->one of potencial points
	let begin_index = start;//не ебу зачем это. может это просто убрать?(я ебал писать ЭТО на иглише)
	//setting start data
	for (let i = 0; i < size * size; i++) {
		minDis[i] = 100000000;
		used_points[i] = true;
	}
	//setting start point
	minDis[begin_index] = 0;
	tmp = lookAround(start);
	for (let i = 0; i < tmp.length; i++) {
		potencial.push(tmp[i]);
		//TODO: create colors to "potential" point
		minDis[tmp[i]] = start + 1;//TODO:заменить 1 на вес ребра
	}
	//algoritm
	while (potencial.length > 0) {
		min_index = 100000000;
		min = 100000000;
		for (let i = 0; i < potencial.size(); i++) {
			if (minDis[potencial[i]] + distanceToEnd(size, potencial[i], end) < min) {
				min = minDis[potencial[i]];
				min_index = potencial[i];
			}
		}
		if (min_index == end) {
			break;
		}
		if (min_index != 100000000) {
			//TODO: убрать min_index из массива potencial
			tmp = lookaround(min_index);
			for (let i = 0; i < tmp.size(); i++) {
				if (used_points[tmp[i]]) {
					potencial.push_back(tmp[i]);
					//TODO: create colours to "potential" point
					minDis[tmp[i]] = min_index + 1;//TODO:заменить 1 на вес ребра
					used_points[i] = false;
				} else {
					tmp_x = min + graph[min_index][i];
					if (tmp_x < minDis[i]) {
						minDis[i] = tmp_x;
					}
				}
			}
			used_points[min_index] = false;
		}
	}
	//way output
	if (used_points[end])
		return -1;
	else {
		let current = end;
		while (current != start) {
			//TODO: create colouring on "current"
			tmp = lookarond(current);
			for (let i = 0; i < tmp.size(); i++) {
				tmp_x = minDis[current];
				if (minDis[tmp[i]] < minDis[current] && minDis[tmp[i]] < y && used_points[tmp[i]]) {
					tmp_x = minDis[tmp[i]];
				}
			}
		}
	}
}