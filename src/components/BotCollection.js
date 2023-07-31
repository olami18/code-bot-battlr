import React, { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';

function BotCollection() {

  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  const handleEnlistBot = (clickBot) => {
    if (!army.some((bot) => bot.id === clickBot.id)) {
      setArmy([...army, clickBot]);
    }
  };

  function handleDeleteClick (bot) {
    fetch(`http://localhost:8001/bots/${bot.id}` , {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then(() => {
      const updateArmy = army.filter((armyBot) => armyBot.id !== bot.id)
      setArmy(updateArmy);
    })
    .catch((error) => {
      console.log("Error deleting bot:", error);
    });
  }

  function handleRemove(bot) {
    const updateArmy = army.filter((armyBot) => armyBot.id !== bot.id)
    setArmy(updateArmy);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/bots');
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <YourBotArmy army={army} handleRemove={handleRemove} />
      <h2>Bot Collection</h2>
      {bots.length === 0 ? (
        <p>Loading bots...</p>
      ) : (
        <ul>
          {bots.map((bot) => (
            <li key={bot.id}>
              <h3>{bot.name}</h3>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <p>Health: {bot.health}</p>
              <img src={bot.avatar_url} alt=''/> 
              <button onClick={() => handleEnlistBot(bot) }> Enlist </button>
              <button onClick={() => handleDeleteClick(bot) }> X </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BotCollection;

