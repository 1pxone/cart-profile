import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    toggleModal(e){
        e.stopPropagation();
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.props.isOpen){
            this.props.onClose();
        }
    };
    componentDidUpdate(){
        if(this.props.isOpen){
            document.body.classList.add("noScroll");
        } else {
            document.body.classList.remove("noScroll");
        }

    }

    render() {
        return (
            <CSSTransition in={this.props.isOpen} timeout={300} classNames="fade" unmountOnExit>
                <div className="rmodal" onClick={(e)=>this.toggleModal(e)}>
                    <CSSTransition in={this.props.isOpen} timeout={700} classNames="fadeIndown" unmountOnExit>
                        <div className={"rmodal__inner " + (this.props.isBig ? "rmodal__inner--big" : null)}ref={this.setWrapperRef}>
                            <div className="rmodal__header">
                                <span>{this.props.heading}</span> <button className="rmodal__close" onClick={this.props.onClose}>&times;</button>
                            </div>
                            <div className="rmodal__content">
                                {this.props.children}
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        );
    }
};

export default Modal;
