"use strict";
(() => {
var exports = {};
exports.id = 565;
exports.ids = [565];
exports.modules = {

/***/ 961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ generate)
});

;// CONCATENATED MODULE: external "openai"
const external_openai_namespaceObject = require("openai");
;// CONCATENATED MODULE: ./pages/api/generate.js

const configuration = new external_openai_namespaceObject.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new external_openai_namespaceObject.OpenAIApi(configuration);
/* harmony default export */ async function generate(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md"
            }
        });
        return;
    }
    const question = req.body.question || "";
    if (question.trim().length === 0) {
        console.log(question);
        res.status(400).json({
            error: {
                message: "Please enter a valid sentence"
            }
        });
        return;
    }
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(question),
            temperature: 0.6,
            max_tokens: 1024
        });
        res.status(200).json({
            result: completion.data.choices[0].text
        });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request."
                }
            });
        }
    }
}
function generatePrompt(question) {
    const capitalizedQuestion = question[0].toUpperCase() + question.slice(1).toLowerCase();
    return `Answer the following question: ${question}
  \nQuestion: ${capitalizedQuestion}
  \nAnswer:`;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(961));
module.exports = __webpack_exports__;

})();