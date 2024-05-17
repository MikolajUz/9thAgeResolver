export interface UnitRules {
  name: string;
  description: string;
  type_rule: string;
}

export class UnitRules {
  constructor(
    public name: string,
    public description: string,
    public type_rule: string
  ) {}
}

export const adaptOption = (
  optionRaw: UnitRules[]
): UnitRules[] => {
  let array: UnitRules[] = [];
  optionRaw.forEach((option) =>
    array.push(
      new UnitRules(option.name, option.description, option.type_rule)
    )
  );
  return array;
};
