import { ImageProps, LinkProps } from './types';

type FilterProps<T> = Omit<T, 'node'>;

export function filterProps<T extends { node?: unknown }>(props: T): FilterProps<T> {
  const { ...rest } = props;
  return rest;
}

export function getImageProps(props: { node?: unknown } & ImageProps): ImageProps {
  return filterProps(props);
}

export function getLinkProps(props: { node?: unknown } & LinkProps): LinkProps {
  return filterProps(props);
}