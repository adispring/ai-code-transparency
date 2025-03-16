import { getDescription } from '../decorators/description.decorator';

export function printFieldDescriptions(dtoClass: any) {
  const instance = new dtoClass();
  for (const key of Object.keys(instance)) {
    const description = getDescription(instance, key);
    if (description) {
      console.log(`${key}: ${description}`);
    }
  }
}
