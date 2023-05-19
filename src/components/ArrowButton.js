import React, { useState, useEffect } from 'react';
import { IoChevronUpSharp } from "react-icons/io5";

const ArrowButton = () => {
    const [BackToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setBackToTop(true);
            } else {
                setBackToTop(false);
            }
        })
    }, []);

    const scrollToTop = () => {
        window.scroll({
            top: 150,
            behavior: "smooth"
        })
    };

    return (
        <div style={{ overflowX: "hidden", position: "fixed", bottom: "20px", right: "20px" }} >
            {BackToTop && (
                <button style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '50px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#25c19b',
                    color: '#fff',
                    fontSize: '24px',
                    lineHeight: '50px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    zIndex: '999',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    className={BackToTop ? 'back-to-top active' : 'back-to-top'}
                    onClick={scrollToTop}
                >
                    <IoChevronUpSharp />
                </button>
            )}
        </div>
    )
}

export default ArrowButton;