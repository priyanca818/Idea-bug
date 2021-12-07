import { useState } from 'react';
import BaseModalWrapper from './BaseModalWrapper';

function App() {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const toggleModal = () => {
        setIsModalVisible(wasModalVisible => !wasModalVisible)
    }

    <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} />

    return (
        <div className="App">
            <button onClick={toggleModal}>Show modal</button>
        </div>
    );
}

export default App;