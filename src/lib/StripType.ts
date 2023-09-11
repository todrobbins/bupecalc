class StripType {
	drugType: string;
	fullStripDose: number;
	shape: [number, number];

	constructor(drugType: string, fullStripDose: number) {
		this.drugType = drugType;
		this.fullStripDose = fullStripDose;

		this.shape = this.drugType == 'belbuca' ? [2, 2] : [2, 4];
	}
}

export const STRIP_TYPES: { [id: string]: StripType } = {
	belbuca: new StripType('belbuca', 0.25),
	'suboxone 2mg': new StripType('suboxone', 2),
	'suboxone 4mg': new StripType('suboxone', 4),
	'suboxone 8mg': new StripType('suboxone', 8)
};

export { StripType };
