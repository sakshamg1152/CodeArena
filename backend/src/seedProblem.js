import mongoose from "mongoose";
import {Problem} from "./models/problem.model.js";


const MONGO_URI =
  "mongodb+srv://sakshamg1152_db_user:P8DUtoosHpsi6WwG@cluster0.pzfkrew.mongodb.net/?appName=Cluster0";

const problems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    functionName: "twoSum",
    driverCode: `
int main(){

    vector<int> nums;
    int x;

    string line;
    getline(cin,line);

    for(char &c:line)
        if(c=='['||c==']'||c==',') c=' ';

    stringstream ss(line);

    while(ss>>x)
        nums.push_back(x);

    int target;
    cin>>target;

    Solution obj;

    auto ans=obj.twoSum(nums,target);

    cout<<"[";

    for(int i=0;i<ans.size();i++){

        cout<<ans[i];

        if(i+1<ans.size())
            cout<<",";

    }

    cout<<"]";

}
`,
starterCode: {
cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {

    }
};`,

java: `class Solution {
public int[] twoSum(int[] nums, int target) {

}
}`,

python: `class Solution:
    def twoSum(self, nums, target):
        pass`
},
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 9",
      },
    ],

    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
    ],

    tags: ["Array", "HashMap"],

    testCases: [
    {
        input: "[2,7,11,15]\n9",
        output: "[0,1]"
    },
    {
        input: "[3,2,4]\n6",
        output: "[1,2]"
    },
    {
        input: "[3,3]\n6",
        output: "[0,1]"
    }
],
  },

  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    functionName: "isValid",

driverCode: `
int main(){

    string s;
    cin>>s;

    Solution obj;

    cout<<(obj.isValid(s) ? "true" : "false");

    return 0;
}
`,
starterCode: {
cpp: `class Solution {
public:
    bool isValid(string s) {

    }
};`,

java: `class Solution {
public boolean isValid(String s) {

}
}`,

python: `class Solution:
    def isValid(self, s):
        pass`
},
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",

    examples: [
      {
        input: "()[]{}",
        output: "true",
        explanation: "All brackets are balanced.",
      },
    ],

    constraints: ["1 <= s.length <= 10^4"],

    tags: ["Stack"],

    testCases: [
    {
        input: "()[]{}",
        output: "true"
    },
    {
        input: "(]",
        output: "false"
    },
    {
        input: "([{}])",
        output: "true"
    }
],
  },

  {
    title: "Binary Search",
    difficulty: "Easy",
    functionName: "search",

driverCode: `
int main(){

    vector<int> nums;
    int x;

    string line;
    getline(cin,line);

    for(char &c:line){
        if(c=='[' || c==']' || c==',')
            c=' ';
    }

    stringstream ss(line);

    while(ss>>x){
        nums.push_back(x);
    }

    int target;
    cin>>target;

    Solution obj;

    cout<<obj.search(nums,target);

    return 0;
}
`,
starterCode: {
cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {

    }
};`,

java: `class Solution {
public int search(int[] nums, int target) {

}
}`,

python: `class Solution:
    def search(self, nums, target):
        pass`
},
    description:
      "Given a sorted array and a target value, return the index if found.",

    examples: [
      {
        input: "nums=[-1,0,3,5,9,12], target=9",
        output: "4",
        explanation: "9 exists at index 4.",
      },
    ],

    constraints: ["Array is sorted."],

    tags: ["Binary Search"],

    testCases: [
    {
        input: "()[]{}",
        output: "true"
    },
    {
        input: "(]",
        output: "false"
    },
    {
        input: "([{}])",
        output: "true"
    }
],
  },

  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    functionName: "maxSubArray",

driverCode: `
int main(){

    vector<int> nums;
    int x;

    string line;
    getline(cin,line);

    for(char &c:line){
        if(c=='[' || c==']' || c==',')
            c=' ';
    }

    stringstream ss(line);

    while(ss>>x){
        nums.push_back(x);
    }

    Solution obj;

    cout<<obj.maxSubArray(nums);

    return 0;
}
`,
starterCode: {
cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {

    }
};`,

java: `class Solution {
public int maxSubArray(int[] nums) {

}
}`,

python: `class Solution:
    def maxSubArray(self, nums):
        pass`
},
    description:
      "Find the contiguous subarray having the largest sum.",

    examples: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has sum 6",
      },
    ],

    constraints: ["1 <= nums.length <= 10^5"],

    tags: ["Array", "Dynamic Programming"],

    testCases: [
    {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6"
    },
    {
        input: "[1]",
        output: "1"
    },
    {
        input: "[5,4,-1,7,8]",
        output: "23"
    }
],
  },

  {
    title: "Merge Intervals",
    difficulty: "Medium",
    functionName: "merge",

driverCode: `
int main() {

    string s;
    getline(cin,s);

    vector<vector<int>> intervals;

    vector<int> curr;
    int num=0;
    bool reading=false;

    for(char c:s){

        if(isdigit(c)){
            num=num*10+(c-'0');
            reading=true;
        }
        else{

            if(reading){
                curr.push_back(num);
                num=0;
                reading=false;

                if(curr.size()==2){
                    intervals.push_back(curr);
                    curr.clear();
                }
            }

        }

    }

    Solution obj;

    auto ans=obj.merge(intervals);

    cout<<"[";

    for(int i=0;i<ans.size();i++){

        cout<<"["<<ans[i][0]<<","<<ans[i][1]<<"]";

        if(i+1<ans.size())
            cout<<",";

    }

    cout<<"]";

    return 0;
}
`,
starterCode: {
cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {

    }
};`,

java: `class Solution {
public int[][] merge(int[][] intervals) {

}
}`,

python: `class Solution:
    def merge(self, intervals):
        pass`
},
    description:
      "Merge all overlapping intervals and return an array of non-overlapping intervals.",

    examples: [
      {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Intervals [1,3] and [2,6] overlap.",
      },
    ],

    constraints: ["1 <= intervals.length <= 10^4"],

    tags: ["Array", "Sorting"],

    testCases: [
    {
        input: "[[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]"
    },
    {
        input: "[[1,4],[4,5]]",
        output: "[[1,5]]"
    },
    {
        input: "[[1,4],[0,4]]",
        output: "[[0,4]]"
    }
],
  },
];

async function seedProblems() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    await Problem.deleteMany();
    await Problem.insertMany(problems);

    console.log("Problems inserted successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedProblems();