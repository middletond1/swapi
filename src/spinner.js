import React from "react";
import Spinner from "react-bootstrap/Spinner"

export default function SpinnerComp() {
    return (
        <div className="text-center mb-5 mt-5">
            <Spinner animation="border" role="status" className="text-primary">
            <span className="visually-hidden">Loading</span>
            </Spinner>
        </div>
    )
}