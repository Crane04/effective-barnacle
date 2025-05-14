interface BoolFieldOption {
  key: string;
  value: string;
}

interface BoolFields {
  [key: string]: BoolFieldOption[];
}

interface FieldLabels {
  [key: string]: string;
}

export type { BoolFields, FieldLabels };
