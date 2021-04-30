import styled from 'styled-components';

export const ContactUsPopupContainer = styled.div`
  background-color: cadetblue;
  border: 1px solid #111111;
  width: 500px;
  height: 630px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -300px;
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
