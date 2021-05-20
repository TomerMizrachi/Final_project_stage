import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { Grid } from '@material-ui/core'
import { Button } from '@components/uielements/Button/Button'

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

export default function PublishForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <div>
      {/* <button onClick={toggleModal}>Open modal</button> */}
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal!</span>
        <Grid item xs={6}>
          <Button className="accent bt-xl" onClick={toggleModal}>Publish New Audition</Button>
        </Grid>
        {/* <button onClick={toggleModal}>Close me</button> */}
      </StyledModal>
    </div>
  );
}

// const FadingBackground = styled(BaseModalBackground)`
//   opacity: ${(props) => props.opacity};
//   transition: all 0.3s ease-in-out;
// `;

// function App() {
//   return (
//     <ModalProvider backgroundComponent={FadingBackground}>
//       <div className="App">
//         <h1>Hello styled-react-modal</h1>
//         <h2>Start editing to see some magic happen!</h2>
//         <FancyModal />
//       </div>
//     </ModalProvider>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
