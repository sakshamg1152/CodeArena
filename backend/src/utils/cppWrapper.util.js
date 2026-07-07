const generateCppCode = (userCode, problem) => {

return `
#include<bits/stdc++.h>
#include<sstream>
using namespace std;

${userCode}

int main(){

    vector<int> nums;
    int x;

    string line;
getline(cin, line);

for(char &c : line){
    if(c=='[' || c==']' || c==',')
        c=' ';
}

stringstream ss(line);

while(ss >> x){
    nums.push_back(x);
}

    int target;
    cin>>target;

    Solution obj;

    vector<int> ans = obj.${problem.functionName}(nums,target);

    cout << "[";
for(int i=0;i<ans.size();i++){
    cout << ans[i];
    if(i+1<ans.size()) cout << ",";
}
cout << "]";

    return 0;
}
`;
}

export default generateCppCode;