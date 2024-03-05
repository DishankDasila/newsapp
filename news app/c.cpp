#include<bits/stdc++.h> 
using namespace std; 
 
struct City { 
    int goods; 
    int tax; 
    string name; 
}; 
 
int totalTax = 0; 
unordered_map<string,int>m; 
void dfs(map<string, vector<City>>& graph, string currentCity, set<string>& visited, string& route,string x) { 
    visited.insert(currentCity); 
    route += currentCity + "-"; 
 
    vector<City>& neighbors = graph[currentCity]; 
    sort(neighbors.begin(), neighbors.end(), [](const City& a, const City& b) { 
        if (a.goods == b.goods) { 
            if (a.tax == b.tax) { 
                return a.name < b.name; 
            } 
            return a.tax < b.tax; 
        } 
        return a.goods > b.goods; 
    }); 
 
    for (const City& neighbor : neighbors) { 
        if (visited.find(neighbor.name) == visited.end()) { 
            totalTax += m[neighbor.name]; 
            dfs(graph, neighbor.name, visited, route,x); 
            if(currentCity!=x) 
            totalTax += m[currentCity]; 
            route += currentCity + "-"; 
        } 
    } 
} 
 
int main() { 
    int N; 
    cin >> N; 
 
    map<string, vector<City>> graph; 
    string x; 
    int f=0; 
    for (int i = 0; i < N - 1; i++) { 
        string city1, city2; 
        int goods, tax; 
         
        cin >> city1 >> city2 >> goods >> tax; 
        if(f==0){ 
        x=city1; 
        f=1; 
        } 
        m[city2]=tax; 
        graph[city1].push_back({ goods, tax, city2 }); 
        graph[city2].push_back({ goods, tax, city1 }); 
    } 
 
    set<string> visited; 
    string route = ""; 
    dfs(graph, x, visited, route,x); 
     
    // Remove the trailing hyphen at the end 
    route.pop_back(); 
 
    cout << route << endl; 
    cout << totalTax; 
 
    return 0; 
}