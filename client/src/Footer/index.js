import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  margin: auto 0 0 0;
  font-size: 0.75rem;
  position: relative;

  a {
    color: black;
  }

  .footer-wave {
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    position: relative;
    margin-bottom: -1px;
  }

  .footer-wave svg {
    display: block;
    width: calc(134% + 1.3px);
    // change using media queries
    height: var(--footer-wave-height);
  }

  .footer-wave .shape-fill {
    fill: var(--primary);
  }

  .content {
    background-color: var(--primary);
    height: var(--footer-content-height);
    display: flex;
    justify-content: center;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: var(--max-width);
  padding: 0 var(--horizontal-padding) 0 var(--horizontal-padding);
  width: 100%;
  color: var(--white);
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-top: 10px;
`;

/**
 *
 * @returns {JSX} - JSX representing footer component
 */
const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="content">
        <Content>
          <div className="left">
            © {new Date().getFullYear()} - Emerge Digital
          </div>
          <div className="right">
            Built with ❤️ by D.T. I.F. K.C. L.K. M.C. S.C.
          </div>
        </Content>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
