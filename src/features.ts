export enum FeaturesType {
  DEBUG_BAR = 'DEBUG_BAR',
}

export const isFeatureActive = (
  features: ReadonlyArray<string>,
  name: string,
): boolean => features.includes(name);

export const features: FeaturesType[] = [FeaturesType.DEBUG_BAR];
