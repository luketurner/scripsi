export type FixedSizeUnit = 'px' | '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12' | '16' | '24' | '32' | '48' | '64';
export type FractionalSizeUnit = '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '5/6' | 'full';
export type KeywordSizeUnit = 'auto' | 'screen';

export type SizeUnit = FixedSizeUnit | FractionalSizeUnit | 'auto' | 'screen';
export type MarginPaddingUnit = '0' | FixedSizeUnit;
