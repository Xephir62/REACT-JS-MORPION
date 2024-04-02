import React, { useState } from "react";
import "./App.css";

function App() {
  const [pions, setPions] = useState(Array(9).fill(""));
  const [joueurs] = useState(["X", "O"]);
  const [tour, setTour] = useState(0);
  const [jeuEstFini, setJeuEstFini] = useState(false);
  const [message, setMessage] = useState(
    "Le jeu peut commencer ! Joueur " + joueurs[tour] + " c'est votre tour."
  );

  function estValide(index) {
    return pions[index] === "";
  }

  function rechercherVainqueur(pions, joueurs, tour) {
    const lignesGagnantes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let ligne of lignesGagnantes) {
      const [a, b, c] = ligne;
      if (
        pions[a] === joueurs[tour] &&
        pions[b] === joueurs[tour] &&
        pions[c] === joueurs[tour]
      ) {
        setJeuEstFini(true);
        setMessage(
          "Le joueur " +
            joueurs[tour] +
            " a gagné ! Rejouer"
        );
        return true;
      }
    }

    if (pions.every((pion) => pion !== "")) {
      setJeuEstFini(true);
      setMessage("Match Nul ! Rejouer");
      return true;
    }

    return false;
  }

  function handleClick(index) {
    if (jeuEstFini || !estValide(index)) {
      setMessage(
        "Case occupée ! Joueur " +
          joueurs[tour] +
          " c'est toujours à vous !"
      );
      return;
    }

    const nouveauxPions = [...pions];
    nouveauxPions[index] = joueurs[tour];
    setPions(nouveauxPions);

    if (!rechercherVainqueur(nouveauxPions, joueurs, tour)) {
      setTour((tour + 1) % 2);
      setMessage("Joueur " + joueurs[(tour + 1) % 2] + " c'est à vous !");
    }
  }

  return (
    <div className="App">
      <h1>Le jeu du morpion</h1>
      <div id="Jeu">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <button key={index} onClick={() => handleClick(index)}>
            {pions[index]}
          </button>
        ))}
      </div>
      <div id="StatutJeu" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default App;
