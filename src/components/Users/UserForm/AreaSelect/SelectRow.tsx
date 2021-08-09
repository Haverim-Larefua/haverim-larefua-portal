import React, {useEffect, useState} from "react";
import './SelectRow.scss';
import { ReactComponent as CheckboxOn } from "../../../../assets/icons/checkbox-on.svg";
import { ReactComponent as CheckboxOff } from "../../../../assets/icons/checkbox-off.svg";
import { ReactComponent as CheckboxDeselect } from "../../../../assets/icons/checkbox-deselect.svg";
import { ReactComponent as Expand } from "../../../../assets/icons/expand.svg";
import { ReactComponent as Collapse } from "../../../../assets/icons/collapse.svg";

interface ISelectRowProps {
    name:string;
    isChecked:boolean;
    isExpanded?:boolean;
    onSelected:Function;
    onExpand?:Function;
    expendable?:boolean;
    isSelectable?:boolean;
    className:string;
}



const SelectRow = ({name, isChecked, isExpanded = false, onSelected, onExpand = () => {}, expendable = true, isSelectable = true, className}:ISelectRowProps) => {

    const [isExpand, setIsExpand] = useState(isExpanded);

    useEffect(() => {
        setIsExpand(isExpanded);
    }, [isExpanded]);

    return (
        <div className={className + " row-select-top"} key={name}>
            <div className={"row-select-inner-right"}>
                <div onClick={() => {
                    if (isSelectable) {
                        onSelected()
                    }
                }} className={"row-select-checkbox"}>
                    {isChecked ? <CheckboxOn className={"checkbox-on-icon"}/> :
                        isExpand ? <CheckboxDeselect/> : <CheckboxOff/>}
                </div>
                <div className="ffh-district-selection__item-title">{name}</div>
            </div>
            {expendable && <label className={"expand-icon"} onClick={() => {
                setIsExpand(!isExpand)
                onExpand();
            }}>
                {isExpand ? <Collapse/> : <Expand/>}
            </label>}

        </div>)
};

export default SelectRow;