import React, {Component} from 'react';
import {Guide} from './Guide';
import {Intro} from './Intro';

type State = {
    guideText: string[]
}

type Props = {}

export class GuideMain extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            guideText: []
        };
    }


    render() {
        return (
            <>
                <Intro/>
                <Guide/>
            </>
        )
    }
}