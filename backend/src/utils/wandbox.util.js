import axios from "axios";


const executeCode = async (code, language, input, problem = null) => {

    if (language === "cpp" && problem) {
    code = `
#include<bits/stdc++.h>
#include<sstream>
using namespace std;

${code}

${problem.driverCode}
`;
}

    try {

        console.log("===== CODE SENT TO WANDBOX =====");
        console.log(code);

        console.log("===== INPUT SENT =====");
        console.log(input);

        const response = await axios.post(
            "https://wandbox.org/api/compile.json",
            {
                code,
                compiler: "gcc-head",
                stdin: input
            }
        );

        console.log(response.data);

        return {
            stdout: response.data.program_output || "",
            stderr: response.data.program_error || "",
            compile_output: response.data.compiler_output || "",
            status: response.data.status,
            compiler_message: response.data.compiler_message || "",
            program_message: response.data.program_message || ""
        };

    } catch (error) {

        console.log("Wandbox error:");
        console.log(error.response?.data || error.message);

        return {
            stdout: "",
            stderr: error.response?.data || error.message,
            compile_output: ""
        };
    }
};

export default executeCode;