const rewire = require("rewire")
const debugger_rollbar = rewire("./debugger-rollbar")
const getLevel = debugger_rollbar.__get__("getLevel")
const getMessage = debugger_rollbar.__get__("getMessage")
const parseJson = debugger_rollbar.__get__("parseJson")
const getPayload = debugger_rollbar.__get__("getPayload")
// @ponicode
describe("getLevel", () => {
    test("0", () => {
        let callFunction = () => {
            getLevel({ Level: { toLowerCase: () => "Long-finned Pilot Whale" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getLevel({ Level: { toLowerCase: () => "La Plata Dolphin" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getLevel({ Level: { toLowerCase: () => "Amazon River Dolphin" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getLevel({ Level: { toLowerCase: () => "Sei Whale" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getLevel({ Level: { toLowerCase: () => "False Killer Whale" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getLevel(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getMessage", () => {
    test("0", () => {
        let callFunction = () => {
            getMessage("invoice")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getMessage("deposit")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getMessage("payment")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getMessage("withdrawal")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getMessage(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("parseJson", () => {
    test("0", () => {
        let callFunction = () => {
            parseJson("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            parseJson("<?xml version=\"1.0\" ?><a b=\"c\"/>")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            parseJson(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getPayload", () => {
    test("0", () => {
        let callFunction = () => {
            getPayload({ Payload: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getPayload(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("debugger_rollbar.handler", () => {
    test("0", () => {
        let callFunction = () => {
            debugger_rollbar.handler({ ROLLBAR_TOKEN: " " }, { rollbar: false, rollbarConfig: "1.0.0" }, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            debugger_rollbar.handler({ ROLLBAR_TOKEN: " " }, { rollbar: false, rollbarConfig: "v1.2.4" }, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            debugger_rollbar.handler({ ROLLBAR_TOKEN: " " }, { rollbar: false, rollbarConfig: "4.0.0-beta1\t" }, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            debugger_rollbar.handler({ ROLLBAR_TOKEN: " " }, { rollbar: true, rollbarConfig: "4.0.0-beta1\t" }, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            debugger_rollbar.handler({ ROLLBAR_TOKEN: " " }, { rollbar: true, rollbarConfig: "v4.0.0-rc.4" }, () => "return callback value")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            debugger_rollbar.handler(undefined, {}, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
