import Login from '../../components/Login';
import { welcomeBackground } from '../../utils/constant.js';
import './index.css';

const Welcome = () => {
    return (
        <div
            className="welcomeBox"
            style={{ background: `url(${welcomeBackground[1]}) 0 / cover fixed` }}
        >
            {/* <div className="left"></div>
            <div className="right">
                <Login />
            </div> */}
            <Login />
        </div>
    );
};

export default Welcome;
