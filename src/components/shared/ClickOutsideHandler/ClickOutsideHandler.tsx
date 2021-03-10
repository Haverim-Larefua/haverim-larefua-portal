import React, { useRef, useEffect } from "react";

interface ClickOutsideHandlerProps {
  onClickOutside: () => void;
  children: any;
}

const ClickOutsideHandler: React.FC<ClickOutsideHandlerProps>  = (props) => {

    const useOutsideClickHandler = (ref:any) => {
        const handleClickOutside = (event:any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            props.onClickOutside();
          }
        }

        useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        });
      }

  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef);

  return <div style={{width: '100%'}} ref={wrapperRef}>{props.children}</div>;
}


export default ClickOutsideHandler;
