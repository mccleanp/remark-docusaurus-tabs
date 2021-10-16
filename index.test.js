const index = require("./index")
// @ponicode
describe("index", () => {
    test("0", () => {
        let callFunction = () => {
            index()
        }
    
        expect(callFunction).not.toThrow()
    })
})
