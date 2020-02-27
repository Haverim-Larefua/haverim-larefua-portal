import React, { useRef, useEffect } from "react";

const ClickOutsideHandler = (props) => {

    const useOutsideClickHandler = (ref) => {
        const handleClickOutside = (event) => {
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
