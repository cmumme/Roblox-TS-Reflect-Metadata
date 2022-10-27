import { describe, it } from "mocha"
import { expect } from "chai"
import { Reflect } from "."

describe("Reflect Metadata", () => {
    it("Imperatively defines and successfully retrieves metadata on a class property", () => {
        const MetadataKey = "custom:MyMetadata"
        const ExpectedValue = "This is the metadata for MyProperty."

        class MyClass {
            public MyProperty = "Hello, world!"

            public constructor() {
                Reflect.defineMetadata(MetadataKey, ExpectedValue, this, "MyProperty")
            }
        }

        const MyClassInstance = new MyClass()

        expect(Reflect.getMetadata(MetadataKey, MyClassInstance, "MyProperty")).to.equal(ExpectedValue)
    })

    it("Declaratively defines and successfully retrieves metadata on a class property", () => {
        const MetadataKey = "custom:MyMetadata"
        const ExpectedValue = "This is the metadata for MyProperty."

        class MyClass {
            @Reflect.metadata(MetadataKey, ExpectedValue)
            public MyProperty = "Hello, world!"
        }

        const MyClassInstance = new MyClass()

        expect(Reflect.getMetadata(MetadataKey, MyClassInstance, "MyProperty")).to.equal(ExpectedValue)
    })
})