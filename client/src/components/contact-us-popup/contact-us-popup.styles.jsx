import styled from 'styled-components';

export const ContactUsPopupContainer = styled.div`
  background-color: white;
  border: 1px solid #111111;
  width: 500px;
  height: 600px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -300px;
`;

ContactUsPopupContainer.displayName = 'ContactUsPopupContainer';

export const ContactUsFormContainer = styled.div`
  margin: 30px;
`;

export const ContactUsTitle = styled.h2`
  margin: 10px 0;
`;

ContactUsFormContainer.displayName = 'ContactUsFormContainer';
