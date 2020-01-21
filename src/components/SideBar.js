import React from 'react';
import { Link } from 'react-router-dom'
import Condition from './Condition';
import Footer from './Footer';

function Sidebar(props) {
    return (
        <Condition test={props.visible}>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>
                        <img src="https://via.placeholder.com/210x48/FFFFFF/00000?text=Rdn+Finance" alt="logo" />
                    </h3>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <Link to="/">
                            <i className="fas fa-home"></i> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/category"><i className="fas fa-briefcase"></i> Categorias</Link>
                    </li>
                    <li>
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fas fa-list"></i> Contas</a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li>
                                <Link to="/billpay"><i className="fas fa-briefcase"></i> A Pagar</Link>
                            </li>
                            <li>
                                <Link to="/billreceive"><i className="fas fa-briefcase"></i> A Receber</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/report"><i className="fas fa-briefcase"></i> Extrato</Link>
                    </li>
                    <li>
                        <Link to="/graphic"><i className="fas fa-paper-plane"></i> Gráfico</Link>
                    </li>
                </ul>
                <Footer className={''} />
            </nav>            
        </Condition>
    );
}

export default Sidebar;
