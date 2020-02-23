import React from "react";
interface InitialsProps {
    initialsColors: string;
    initials: string;
}


const Initials: React.FC<InitialsProps> = (props:InitialsProps) => {


    return (
        <span className={`ffh-userlist-item__initials ${props.initialsColors}`}>{props.initials} </span>
      );
}

export default Initials;