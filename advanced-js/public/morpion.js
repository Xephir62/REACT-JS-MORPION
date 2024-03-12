function estValide(button) {
  return button.innerHTML === "";
}

function setSymbol(btn, symbole) {
  btn.innerHTML = symbole;
}

function rechercherVainqueur(pions, joueurs, tour) {
  const lignesGagnantes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // lignes verticales
    [0, 4, 8], [2, 4, 6] // diagonales
  ];

  for (const ligne of lignesGagnantes) {
    const [a, b, c] = ligne;
    if (
      pions[a].innerHTML === joueurs[tour] &&
      pions[b].innerHTML === joueurs[tour] &&
      pions[c].innerHTML === joueurs[tour]
    ) {
      pions[a].style.backgroundColor = "#9ACD32";
      pions[b].style.backgroundColor = "#9ACD32";
      pions[c].style.backgroundColor = "#9ACD32";
      return true;
    }
  }
  return false;
}

function matchNul(pions) {
  return Array.from(pions).every(button => button.innerHTML !== "");
}

const Afficheur = function(element) {
  const affichage = element;
  function setText(message) {
    affichage.innerHTML = message;
  }
  return { sendMessage: setText };
};

function main() {
  const pions = document.querySelectorAll("#Jeu button");
  const joueurs = ["X", "O"];
  let tour = 0;
  let jeuEstFini = false;
  const afficheur = new Afficheur(document.querySelector("#StatutJeu"));
  afficheur.sendMessage(
    "Le jeu peut commencer ! <br /> Joueur " +
      joueurs[tour] +
      " c'est votre tour."
  );
  pions.forEach(button => {
    button.addEventListener("click", function() {
      if (jeuEstFini) return;

      if (!estValide(this)) {
        afficheur.sendMessage(
          "Case occupée ! <br />Joueur " +
            joueurs[tour] +
            " c'est toujours à vous !"
        );
      } else {
        setSymbol(this, joueurs[tour]);
        jeuEstFini = rechercherVainqueur(pions, joueurs, tour);

        if (jeuEstFini) {
          afficheur.sendMessage(
            "Le joueur " +
              joueurs[tour] +
              ' a gagné ! <br /> <a href="https://s4-8101.nuage-peda.fr/vscode/proxy/3000/">Rejouer</a>'
          );
          return;
        }

        if (matchNul(pions)) {
          afficheur.sendMessage(
            'Match Nul ! <br/> <a href="https://s4-8101.nuage-peda.fr/vscode/proxy/3000/">Rejouer</a>'
          );
          return;
        }

        tour = (tour + 1) % 2;
        afficheur.sendMessage("Joueur " + joueurs[tour] + " c'est à vous !");
      }
    });
  });
}

main();
