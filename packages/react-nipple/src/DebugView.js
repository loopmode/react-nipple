import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DebugView extends Component {
    static propTypes = {
        data: PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number
            }),
            angle: PropTypes.shape({
                radian: PropTypes.number,
                degree: PropTypes.number
            }),
            direction: PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
                angle: PropTypes.number
            }),
            force: PropTypes.number,
            pressure: PropTypes.number,
            distance: PropTypes.number
        })
    };
    render() {
        const { position = {}, force, pressure, distance, angle = {}, direction = {} } = this.props.data || {};

        return (
            <div className="debug">
                <ul>
                    <li className="position">
                        position :
                        <ul>
                            <li className="x">
                                x :
                                <span className="data" children={position.x} />
                            </li>
                            <li className="y">
                                y :
                                <span className="data" children={position.y} />
                            </li>
                        </ul>
                    </li>
                    <li className="force">
                        force : <span className="data" children={force} />
                    </li>
                    <li className="pressure">
                        pressure : <span className="data" children={pressure} />
                    </li>
                    <li className="distance">
                        distance : <span className="data" children={distance} />
                    </li>
                    <li className="angle">
                        angle :
                        <ul>
                            <li className="radian">
                                radian :
                                <span className="data" children={angle.radian} />
                            </li>
                            <li className="degree">
                                degree :
                                <span className="data" children={angle.degree} />
                            </li>
                        </ul>
                    </li>
                    <li className="direction">
                        direction :
                        <ul>
                            <li className="x">
                                x :
                                <span className="data" children={direction.x} />
                            </li>
                            <li className="y">
                                y :
                                <span className="data" children={direction.y} />
                            </li>
                            <li className="angle">
                                angle :
                                <span className="data" children={direction.angle} />
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="dump" />
            </div>
        );
    }
}
