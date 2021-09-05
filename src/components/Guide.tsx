import * as React from "react"
import {Component} from "react"
import {
    GuideLine,
    GuideSections,
    GuideSubSection,
    LineType
} from "../types/GuideSection";
import {ParseGuide, ParseGuideFromJson} from "./GuideParser";
import {Accordion, Checkbox} from "semantic-ui-react";
import _ from "lodash";

interface State {
    guideText: GuideSections
}

interface Props {
}

export class Guide extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const localStorageState = localStorage.getItem('GuideState')
        const initialGuideState = localStorageState ? ParseGuideFromJson(JSON.parse(localStorageState)) : new GuideSections([])
        debugger;
        this.state = {
            guideText: initialGuideState,
        }
        if (initialGuideState.sections && initialGuideState.sections.length <= 0) {
            this.getGuideLines();
        }

    }

    getGuideLines() {
        ParseGuide().then(guide => {
            this.setState({guideText: guide as GuideSections})
        })

    }

    onCheckboxCheck(index: Number) {
        let newGuideText = this.state.guideText
        newGuideText.toggleCheckbox(index);
        this.setState({guideText: newGuideText})
        localStorage.setItem('GuideState', JSON.stringify(newGuideText));
    }

    isTask(line: GuideLine): boolean {
        return line.type === LineType.Task
    }

    isNote(line: GuideLine): boolean {
        return line.type === LineType.Note
    }

    generateLines(lines: GuideLine[]) {

        return lines.map((line: GuideLine) => {
                if (line.isTask()) {
                    debugger;
                    return <p><Checkbox checked={line.checked} key={_.snakeCase(line.text)} label={line.text} onClick={() => {
                        this.onCheckboxCheck(line.index)
                    }}/></p>
                }
                if (line.isNote()) {
                    return (<p key={_.snakeCase(line.text)} className={'note'}>- {line.text}</p>)
                }
                return <></>
            }
        )
    }

    parseSubSectionLines(subSections: GuideSubSection[]) {
        return (<span className={'subSection'}>
            <Accordion.Accordion className={'subHeading'} panels={subSections.map(subSection => {
                if (subSection.header === "") {
                    return (<>{this.generateLines(subSection.lines)}</>)
                }
                return {
                    key: `panel-${_.snakeCase(subSection.header)}-${subSection.lines.length}`,
                    title: subSection.header,
                    content: {
                        content: (<>{this.generateLines(subSection.lines)}</>)
                    }
                }
            })}/>
        </span>)
    }

    createPanels() {
        return this.state.guideText.sections.map(sections => ({
            key: `panel-${_.snakeCase(sections.header)}`,
            title: sections.header,
            content: {content: this.parseSubSectionLines(sections.subSections)}
        }))
    }

    render() {
        const panels = this.createPanels();
        return (
            <>
                <Accordion
                    defaultActiveIndex={[0, 2]}
                    panels={panels}
                    exclusive={false}
                    fluid
                />
            </>
        )
    }
}