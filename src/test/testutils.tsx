import { render } from '@testing-library/react';
import { Web3Provider } from '../contexts/Web3Provider';
import { BrowserRouter } from 'react-router-dom'

export const renderWithContext = (component: JSX.Element) => {
    return render(
        <Web3Provider>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Web3Provider>
    );
}

