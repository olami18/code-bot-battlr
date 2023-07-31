import React from 'react';

function YourarmyBotArmy({army, handleRemove}) {
  

  return (

    <div>
      <h2>Your armyBot Army</h2>
      {army.length === 0 ? (
        <p>No armyBots enlisted in your army.</p>
      ) : (
        <ul>
          {army.map((armyBot) => (
            <li key={armyBot.id}>
             
             <h3>{armyBot.name}</h3>
              <p>Damage: {armyBot.damage}</p>
              <p>Armor: {armyBot.armor}</p>
              <p>Health: {armyBot.health}</p>
              <img src={armyBot.avatar_url} alt=''/> 
              <button onClick={() => handleRemove(armyBot) }> Remove Bot </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default YourarmyBotArmy;
