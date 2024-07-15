import React, { useState, useEffect } from 'react';
import './Hamster.css'; // CSS faylni import qilish
import sefy from "../assets/closed.png"; // Adjust the path as needed
import kalendar from "../assets/planner.png";
import search from "../assets/search-dollar.png";
import lion from "../assets/hmas.jpg";
import coin from "../assets/dollar.png";
import sett from "../assets/settings.png";
import bnc from "../assets/coin.png";
import mine from "../assets/pickaxe.png";
import friend from "../assets/friends.png";
import earn from "../assets/earnings.png";
import ton from "../assets/currency.png";
import { useTelegram } from "../hook/Web";

const Hamster = () => {

    const { onClose, increment } = useTelegram(); // decrement ni hozircha ishlatmaymiz
    const [count, setCount] = useState(0);

    useEffect(() => {
        const savedCount = parseInt(localStorage.getItem('count'), 10);
        if (!isNaN(savedCount)) {
            setCount(savedCount);
        }
    }, []);

    const handleTouch = (e) => {
        const numTouches = e.touches.length;
        increment(count, setCount, numTouches);
    };
    const [currentProfit, setCurrentProfit] = useState(1.31);
    const [previousProfit, setPreviousProfit] = useState(1.0);
    const [balance, setBalance] = useState(21159780);
    const [percentageIncrease, setPercentageIncrease] = useState(0);
    const [numbers, setNumbers] = useState([]); // Array to store numbers for animation

    // Calculate percentage increase
    const updatePercentageIncrease = () => {
        const newPercentageIncrease = ((currentProfit - previousProfit) / previousProfit) * 100;
        setPercentageIncrease(newPercentageIncrease);
    };

    // Handle avatar click
    const handleAvatarClick = () => {
        setPreviousProfit(currentProfit);
        setBalance(prevBalance => prevBalance + 10);
        updatePercentageIncrease();
        const newNumber = { id: Date.now(), value: 10 }; // Unique ID for each number
        setNumbers(prevNumbers => [...prevNumbers, newNumber]);
        setTimeout(() => {
            setNumbers(prevNumbers => prevNumbers.filter(number => number.id !== newNumber.id));
        }, 2000); // Remove number after 2 seconds
    };

    return (
        <div className="hamster-kombat">
            <header className="header">
                <div className="header-left">
                    <img src={bnc} alt="Profile" className="profile-img" />
                    <div>
                        <h2>Azimjon (CEO)</h2>
                        <p>Grandmaster 9 / 11</p>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${percentageIncrease}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="profit">
                        <img src={coin} alt="Closed Icon" className="closed-icon" />
                        <span>+1M</span>
                        <img src={sett} alt="Closed Icon" className="closed-icon" />
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="tasks">
                    <div className="task">
                        <img src={kalendar} alt="Closed Icon" className="closed-icon" />
                        <p>Vazifalar ro'yxati</p>
                        <span>18:59</span>
                    </div>
                    <div className="task">
                        <img src={sefy} alt="Closed Icon" className="closed-icon" />
                        <p>Kundalik shifr</p>
                        <span>13:59</span>
                    </div>
                    <div className="task">
                        <img src={search} alt="Closed Icon" className="closed-icon" />
                        <p>Kundalik kombinatsiya</p>
                        <span>06:59</span>
                    </div>
                </div>
                <div className="balance">
                    <h1>
                        <img src={coin} alt="Dollar Icon" className="balance-icon" />
                        {balance.toLocaleString()}
                    </h1>
                </div>
                <div className="avatar" onClick={handleAvatarClick}>
                    <img src={lion} alt="Hamster Avatar" />
                    {numbers.map(number => (
                        <div key={number.id} className="number-overlay">+{number.value}</div>
                    ))}
                </div>
            </main>
            <footer className="footer">
                <div className="footer-item">
                    Exchange
                    <img src={bnc} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    Mine
                    <img src={mine} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    Friends
                    <img src={friend} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    Earn
                    <img src={earn} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    Airdrop
                    <img src={ton} alt="Hamster Avatar" className='footer-icon' />
                </div>
            </footer>
        </div>
    );
};

export default Hamster;
