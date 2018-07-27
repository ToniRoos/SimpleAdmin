import * as React from 'react';
import * as $ from "jquery";
import { getStyle } from "../logic/styleFinder";
import { ChangeStorage } from "../logic/changeStorage";

interface PopoverData {
    inputValue: string;
    tagId: string;
}

interface PopoverProps {
    changeStorage: ChangeStorage;
}

export class Popover extends React.Component<PopoverProps, PopoverData> {

    lastId = "";

    constructor(props: PopoverProps) {
        super(props);

        this.state = {
            inputValue: "",
            tagId: ""
        };

        $("h1, h2, h3, h4, h5, h6, a, p").click(event => {

            const tagId = event.target.id;
            this.lastId = tagId;

            $("#popoverContent").removeClass('hide');

            const tag = $("#" + tagId).get(0);
            const currentPosition = this.getCurrentTagPosition(tag);

            $("#popoverInput").css(currentPosition);

            // copy styles of text, to imitate it
            $("#popoverInput").css({
                fontSize: getStyle(tag, 'font-size'),
                fontWeight: getStyle(tag, 'font-weight'),
                fontFamily: getStyle(tag, 'font-family'),
                textAlign: getStyle(tag, 'text-align'),
                padding: getStyle(tag, 'padding'),
                fontStyle: getStyle(tag, 'font-style'),
                color: getStyle(tag, 'color'),
                lineHeight: getStyle(tag, 'line-height')
            });

            this.setState({
                inputValue: tag.innerText
            });
        });

        $("h1, h2, h3, h4, h5, h6, a, p").mouseover(event => {

            $("#easyadmin-popover").removeClass('hide');
            $("#popoverSelection").removeClass('hide');

            // move input to right position, to overlay orig text
            const tag = event.target;
            const currentPosition = this.getCurrentTagPosition(tag);
            $("#popoverSelection").css(currentPosition);
        });
    }

    getCurrentTagPosition(tag: HTMLElement) {

        const boundingClientRect = tag.getBoundingClientRect();
        const currentPosition = {
            top: boundingClientRect.top + window.scrollY,
            left: boundingClientRect.left + window.scrollX,
            height: boundingClientRect.height,
            width: boundingClientRect.width
        };

        return currentPosition;
    }

    render() {

        let popoverInputClassName = "easyAdmin-popover-input inactive";
        let popoverMenuClassName = "easyAdmin-popover-menu hide";

        // if (this.state.processed) {
        popoverInputClassName = "easyAdmin-popover-input active";
        popoverMenuClassName = "easyAdmin-popover-menu";
        // }

        return <div>

            <div id="popoverSelection" className="easyAdmin-popover-selection">
            </div>

            <div id="popoverContent" className="easyAdmin-popover hide">
                <textarea id="popoverInput"
                    className={popoverInputClassName}
                    value={this.state.inputValue}
                    onChange={
                        event => {
                            const newValue = event.target.value;
                            this.setState({ inputValue: newValue });

                            if (this.lastId !== "") {

                                const tag = $("#" + this.lastId);
                                const inputValue = newValue;
                                const inputValueWithReplacedLineBreaks = inputValue.replace(/\n/g, "<br>");
                                tag.html(inputValueWithReplacedLineBreaks);

                                this.props.changeStorage.addTag(tag[0]);

                                const currentPosition = this.getCurrentTagPosition(tag.get(0));
                                $("#popoverInput").css(currentPosition);
                            }
                        }
                    } />
                <div className={popoverMenuClassName}>
                    <i className="fa fa-check fa-2x easyAdmin-popover-button"></i>
                </div>
            </div>

        </div>
    }
}