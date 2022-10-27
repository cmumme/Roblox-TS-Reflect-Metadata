# Experimental Reflect
An experimental and incomplete Roblox-TS implementation of the Reflect Metadata API.

Declarative Syntax:

```ts
import { Reflect } from "@rbxts/experimental-reflect"

class MyClass {
    @Reflect.metadata("custom:MyMetadata", "This is the metadata for MyProperty.")
    public MyProperty = "Hello, world!"
}

const MyClassInstance = new MyClass()

print(Reflect.getMetadata("custom:MyMetadata", MyClassInstance, "MyProperty")) // Expected output: "This is the metadata for MyProperty."
```

Imperative Syntax:

```ts
import { Reflect } from "@rbxts/experimental-reflect"

class MyClass {
    public MyProperty = "Hello, world!"

    public constructor() {
        Reflect.defineMetadata("custom:MyMetadata", "This is the metadata for MyProperty.", this, "MyProperty")
    }
}

const MyClassInstance = new MyClass()

print(Reflect.getMetadata("custom:MyMetadata", MyClassInstance, "MyProperty")) // Expected output: "This is the metadata for MyProperty."
```