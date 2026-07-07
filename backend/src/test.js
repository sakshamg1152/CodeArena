import axios from "axios";

const response = await axios.post(
  "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
  {
    source_code: `
#include<iostream>
using namespace std;

int main(){
    int a,b;
    cin>>a>>b;
    cout<<a+b;
}
`,
    language_id: 54,
    stdin: "2 7"
  }
);

console.log(response.data);