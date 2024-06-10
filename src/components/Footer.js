import React from 'react'

function Footer(props) {
    return (
        <footer className={` ${props.className} text-center`}>
          © {new Date().getFullYear()} RDN Finance.
          Desenvolvedor <a className="nav-link" 
                            href="https://www.linkedin.com/in/rodineiteixeiradev" 
                            target="_blank" rel="noopener noreferrer">Rodinei Teixeira</a>
        </footer>
    );
}

export default Footer;
