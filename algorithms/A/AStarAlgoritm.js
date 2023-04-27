distanceToEnd(size,end_point,current_point)
{
    return abs(current_point/size-end_point/size)+abs(current_point%size-end_point%size);
}

AStarAlgoritm(size,start,end)
{
    let minDis;
    let visited;
    let potencial;
    let tmp;
    let x, min_index=0, min, begin_index=start;
    for (let i = 0; i < size*size; i++)
	{
		minDis[i] = 100000000;
		visited[i] = true;
	}
	minDis[begin_index] = 0;
    tmp=lookaround(start);
    for(let i=0;i<tmp.size();i++)
    {
        potencial.push_back(tmp[i]);
		//to do: create colours to "potential" point
        minDis[tmp[i]]=start+1;//заменить 1 на вес ребра
    }
	while (potencial.size()>0)
	{
		min_index = 100000000;
		min = 100000000;
		for (let i = 0; i < potencial.size(); i++)
		{
			if (minDis[potencial[i]]+distanceToEnd(size,potencial[i],end) < min)
			{
				min = minDis[potencial[i]];
				min_index = potencial[i];
			}
		}
        if (min_index==end)
        {
            break;
        }
		if (min_index != 100000000)
		{
            //убрать min_index из массива potencial
            tmp=lookaround(min_index);
            for(let i=0;i<tmp.size();i++)
            {
                if (visited[tmp[i]])
                {
                    potencial.push_back(tmp[i]);
					//to do: create colours to "potential" point
                    minDis[tmp[i]]=min_index+1;//1 замнить на вес ребра
                }
                else
                {
                    x = min + graph[min_index][i];
					if (x < minDis[i])
					{
						minDis[i] = x;
					}
                }
            }
			visited[min_index] = false;
		}
	}
	if (visited[end])
		return -1;
	else
    {
        let current=end; 
        while (current!=start)
        {
            //to do: create colouring on "current"
            tmp=lookarond(current);
            for (let i = 0;i<tmp.size();i++)
            {
                let y=minDis[current];
                if (minDis[tmp[i]]<minDis[current] && minDis[tmp[i]]<y && visited[tmp[i]])
                {
                    y=minDis[tmp[i]];
                }
            }
        }
    }
}