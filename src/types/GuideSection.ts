export enum LineType {
    Task = 1,
    Note
}

export function GuideSectionsJsonBuilder(json: any) {
    return new GuideSections(json.sections)
}

export class GuideSections {
    sections: GuideSection[];

    constructor(sections: GuideSection[]) {
        this.sections = sections;
    }

    toggleCheckbox(index: Number) {
        this.sections.forEach(section => {
            section.subSections.forEach(subSection => {
                subSection.lines.forEach(line => {
                    if (line.index === index) {
                        line.checked = !line.checked
                    }
                })
            })
        })

    }
}

export class GuideSection {
    header: string;
    subSections: GuideSubSection[];

    constructor(header: string, subSections: GuideSubSection[]) {
        this.header = header;
        this.subSections = subSections;
    }
}

export class GuideSubSection {
    header: string;
    lines: GuideLine[];

    constructor(header: string, lines: GuideLine[]) {
        this.header = header;
        this.lines = lines;
    }
}

export class GuideLine {
    text: string;
    type: LineType;
    index: number;
    checked: boolean;

    constructor(line: string, type: LineType, index: number, checked: boolean) {
        this.text = line;
        this.type = type;
        this.index = index;
        this.checked = checked;
    }

    isTask(): boolean {
        return this.type === LineType.Task
    }

    isNote(): boolean {
        return this.type === LineType.Note
    }
}