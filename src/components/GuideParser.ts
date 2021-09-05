import {GuideLine, GuideSection, GuideSections, GuideSubSection, LineType} from "../types/GuideSection";

function isSectionHeader(line: string) {
    return line.length > 1 && line.charAt(0) === "!"
}

function isComment(line: string) {
    return line.length > 2 && line.substr(0, 2) === "//"
}

function isSubHeader(line: string) {
    return line.length > 1 && line.charAt(0) === "#"
}

function isTask(line: string) {
    return line.length > 1 && line.charAt(0) === "-"
}

function isNote(line: string) {
    return line.length > 1 && line.charAt(0) === "?"
}

function trimLine(line: string) {
    return line.substr(1, line.length)
}

function trimTaskLine(line: string) {
    return line.substr(line.indexOf('}') + 1, line.length)
}

function getTaskNumber(line: string) {
    return parseInt(line.substr(2, line.indexOf('}') - 1))
}

export function ParseGuideFromJson(json: any): GuideSections {
    const guide: GuideSection[] = [];

    json.sections.forEach((section: GuideSection) => {
        guide.push(new GuideSection(section.header, []))
        section.subSections.forEach((subSection: GuideSubSection) => {
            guide[guide.length - 1].subSections.push(new GuideSubSection(subSection.header, []))
            subSection.lines.forEach((line: GuideLine) => {
                let guideSubSections = guide[guide.length - 1].subSections;
                guideSubSections[guideSubSections.length - 1].lines.push(new GuideLine(line.text, line.type, line.index, line.checked))

            })
        })
    })
    debugger;
    return new GuideSections(guide);
}

export async function ParseGuide(): Promise<GuideSections> {
    return await fetch('./guide.txt')
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            const guide: GuideSection[] = [];
            const lines = data.split('\n');

            lines.forEach(line => {
                if (isSectionHeader(line)) {
                    guide.push(new GuideSection(trimLine(line), []))
                } else {
                    let guideSection = guide[guide.length - 1];

                    if (isComment(line) || line.trim() === "") {
                        return
                    }

                    if (isSubHeader(line)) {
                        guideSection.subSections.push(new GuideSubSection(trimLine(line), []))

                    }
                    if (guideSection.subSections.length === 0) {
                        guideSection.subSections.push(new GuideSubSection("", []))
                    }

                    if (isTask(line)) {
                        let subSection = guideSection.subSections[guideSection.subSections.length - 1]
                        subSection.lines.push(new GuideLine(trimTaskLine(line), LineType.Task, getTaskNumber(line), false))

                    }

                    if (isNote(line)) {
                        let subSection = guideSection.subSections[guideSection.subSections.length - 1]
                        subSection.lines.push(new GuideLine(trimLine(line), LineType.Note, 0, false))

                    }
                }

            })
            return new GuideSections(guide);
        })
        .catch(() => new GuideSections([]));
}