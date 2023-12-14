import type { Ref } from 'vue';

export type ElementTypes = 'text' | 'img' | 'table' | 'shape';
export interface BaseElementOpts {
  id?: string;
  scopeId: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  parentRef: Ref<HTMLDivElement>;
  onClick?: (el: HTMLDivElement) => void;
  [x: string]: any;
}
export interface TextElementOpts extends BaseElementOpts {
  label?: string;
  text?: string;
}
