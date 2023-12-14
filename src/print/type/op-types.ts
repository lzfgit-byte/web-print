export interface OPProp {}
export interface OPMethod {
  print: () => void;
}
export interface OPExpose {
  print: () => void;
}
export interface OPOpts {
  height?: number; // 高度 单位px
  width?: number; // 宽度 单位mm
}
export interface OPRuleOpts {
  height?: number; // 高度 单位px
  widthMM?: number; // 宽度 单位mm
}

export interface OPViewerExpose {
  print: () => void;
}

export interface OPViewerProp {}
