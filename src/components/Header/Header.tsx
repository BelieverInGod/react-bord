import React, { useState } from 'react';
import './Header.scss'

interface HeaderProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    scale: number;
    setScale: (value: number) => void;
}

interface Item {
    id: number;
    text: string;
}

const Header: React.FC<HeaderProps> = ({ onZoomIn, onZoomOut, scale, setScale }) => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [items, setItems] = useState<Item[]>([
        { id: 25, text: '25' },
        { id: 30, text: '30' },
        { id: 40, text: '40' },
        { id: 50, text: '50' },
        { id: 60, text: '60' },
        { id: 70, text: '70' },
        { id: 80, text: '80' },
        { id: 90, text: '90' },
        { id: 100, text: '100' },
        { id: 125, text: '125' },
        { id: 150, text: '150' },
    ]);

    const toggleClass = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className='header'>
            <div className='logo'>
                SERVICES
                <div className='circle'>
                    0
                </div>
            </div>
            <div className='btns'>
                <div className='listView'>LIST VIEW</div>
                <div className='nav'>♦</div>
                <div className='zoomContainer'>
                    <button className='zoomBtn' onClick={onZoomIn}>+</button>
                    <div className='zoomPercent' onClick={toggleClass}>{scale}%
                        <ul className={isMenuActive ? 'perList' : 'none'}>
                            {items.map((item) => (
                                <div className='zoomPercent' onClick={() => setScale(item.id)} key={item.id}
                                >
                                    {item.text}%
                                </div>
                            ))}
                        </ul>
                    </div>
                    <button className='zoomBtn' onClick={onZoomOut}>-</button>
                </div>
            </div>

        </header >
    );
};

export default Header;