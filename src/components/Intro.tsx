import * as React from "react"
import { Message } from "semantic-ui-react";

export const Intro: React.FC = () => {
    return (
        <>
            <h1 className={'mainHeading'}>Oldschool Runescape Ironman guide - By OzirisRS</h1>
            <Message>
                <p>Old version (v3) found <a href ='https://pastebin.com/0xGyuk5r'>here</a>.</p>
                <p>This version is mostly copy pasted from the old, with improved quest order and new methods, just in case you're wondering why it looks the exact same at first.</p>

                <p>If you want to donate to me for making this guide, here's a link you can use: <a href='https://paypal.me/ozirisrs'>https://paypal.me/ozirisrs</a>. This is completely optional, all donations are very much appreciated.</p>
                <p><b>Please read this first bit before starting with the actual guide.</b></p>


                <p>If there's a mistake in this guide somewhere then feel free to tweet me @ozirislol but don't tell me to update this as soon as some new update comes, these take a very long time to make.</p>
                <p>Also I rarely reply to questions that can easily be answered by using ctrl+F on this guide OR by
                    googling.</p>

                <p>There is no single right way to play this game, everything in this guide is just what I would
                    recommend. If
                    you don't want to follow a step by step guide then feel free to do your own thing. It might still be
                    worth
                    reading this to pick up some ideas on what goals you could go for.</p>


                <p>Thank you for reading and enjoy the guide!</p>

                <p>Good luck & have fun.</p>
            </Message>

        </>);
}