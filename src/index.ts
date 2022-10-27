type ValidTarget = object
type ValidKey = string | symbol
type ValidValue = unknown

export namespace Reflect {
	export const Metadata: Map<ValidTarget,Map<string,Map<ValidKey, ValidValue>>> = new Map()

	export function GetMetadataMap(Target: ValidTarget, Property: ValidKey): Map<ValidKey, ValidValue> {
		const TargetMetadata = Metadata.get(Target) ?? Metadata.set(Target, new Map()).get(Target) as Map<ValidKey, Map<ValidKey, ValidValue>>
		const PropertyMetadata = TargetMetadata.get(Property) ?? TargetMetadata.set(Property, new Map()).get(Property) as Map<ValidKey, ValidValue>
	
		return PropertyMetadata
	}

	/**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", Number, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", Number, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", Number, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): PropertyDecorator {
      *         return (target, key) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
	export function defineMetadata(metadataKey: ValidKey, metadataValue: ValidValue, target: ValidTarget, propertyKey: ValidKey): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const AnyTarget = (target as any)

		const MetadataMap = GetMetadataMap(target, propertyKey)

		AnyTarget.ReflectPrototype ?? (AnyTarget.ReflectPrototype = target)

		MetadataMap.set(metadataKey, metadataValue)
	}

	/**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param targetKey The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
	export function getMetadata(metadataKey: ValidKey, target: ValidTarget, targetKey: ValidKey): ValidValue {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const AnyTarget = (target as any)

		return AnyTarget.ReflectPrototype ? GetMetadataMap(AnyTarget.ReflectPrototype, targetKey).get(metadataKey) : GetMetadataMap(target, targetKey).get(metadataKey)
	}

	/**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
	export function metadata(metadataKey: ValidKey, metadataValue: ValidValue): (target: ValidTarget, propertyKey: ValidKey) => void {
		return (target: ValidTarget, propertyKey: ValidKey) => {
			defineMetadata(metadataKey, metadataValue, target, propertyKey)
		}
	}
}