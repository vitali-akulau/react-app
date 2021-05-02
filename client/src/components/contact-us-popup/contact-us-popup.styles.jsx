import styled from 'styled-components';

export const ContactUsPopupWrapper = styled.div`
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  backdrop-filter: blur(15px);
  position: fixed;
  z-index: 1;
`;

export const ContactUsPopupContainer = styled.div`
  background-color: cadetblue;
  border: 1px solid #111111;
  width: 30%;
  position: fixed;
  z-index: 2;
  left: 33%;
  top: 15%;
`;

ContactUsPopupContainer.displayName = 'ContactUsPopupContainer';

export const ContactUsFormWrapper = styled.div`
  margin: 30px;
`;

export const ContactUsFormContainer = styled.div`
  background-color: white;
  margin: 30px;
  border: 1px solid #111111;
`;

export const ContactUsTitle = styled.h2`
  margin: 10px 0;
`;

ContactUsFormContainer.displayName = 'ContactUsFormContainer';

export const ContactUsButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1520px) {
    display: block;
    
    & button {
      width: 100%;
      margin-top: 5px;
    }
  }
`;

ContactUsButtonsContainer.displayName = 'ContactUsButtonsContainer';
