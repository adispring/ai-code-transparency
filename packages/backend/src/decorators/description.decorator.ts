import 'reflect-metadata';

export function Description(description: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('description', description, target, propertyKey);
  };
}

export function getDescription(target: any, propertyKey: string): string | undefined {
  return Reflect.getMetadata('description', target, propertyKey);
}
