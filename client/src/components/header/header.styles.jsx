import styled from 'styled-components';
import {Link} from "react-router-dom";

// For styling divs syntax is styled.div and for <p> it is styled.p and so on
export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    
    @media screen and (max-width: 800px) {
      height: 60px;
      padding: 10px;
      margin-bottom: 20px;
    }
`;

// For components, the syntax is the pass the Component into the styled function
// and the rest is same
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width: 800px) {
      width: 50px;
      padding: 0;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    @media screen and (max-width: 800px) {
      width: 80%;
      
    }
`;

// Here, the Styled CSS is reused
export const OptionLink = styled(Link)`
     padding: 10px 15px;
     cursor: pointer;
`;