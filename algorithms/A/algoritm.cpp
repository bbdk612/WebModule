
#include <iostream>
#include <cmath>
#include <vector>

using namespace std;

//вычисление дистанции до выхода(ближе=меньше)

int distance_to_end(int size,int end_point,int current_point)
{
    return abs(current_point/size-end_point/size)+abs(current_point%size-end_point%size);
}

int searchAStar(int size, int start, int end)
{
	vector<int> minDis(size*size);
	vector<bool> visited(size*size);
	vector<int> potencial(size*size);
	vector<int> tmp(size*size);
	int x, min_index=0, min, begin_index=start;
	for (int i = 0; i < size*size; i++)
	{
		minDis[i] = 100000000;
		visited[i] = true;
	}
	minDis[begin_index] = 0;
    tmp=lookaround(start);
    for(int i=0;i<tmp.size();i++)
    {
        potencial.push_back(tmp[i]);
		//to do: create colours to "potential" point
        minDis[tmp[i]]=start+1;//заменить 1 на вес ребра
    }
	while (potencial.size()>0)
	{
		min_index = 100000000;
		min = 100000000;
		for (int i = 0; i < potencial.size(); i++)
		{
			if (minDis[potencial[i]]+distance_to_end(size,potencial[i],end) < min)
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
            for(int i=0;i<tmp.size();i++)
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
        int current=end; 
        while (current!=start)
        {
            //to do: create colouring on "current"
            tmp=lookarond(current);
            for (int i = 0;i<tmp.size();i++)
            {
                int y=minDis[current];
                if (minDis[tmp[i]]<minDis[current] and minDis[tmp[i]]<y and visited[tmp[i]])
                {
                    y=minDis[tmp[i]];
                }
            }
        }
    }
}