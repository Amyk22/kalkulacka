const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

// Procházení všech tlačítek v poli "buttons"
buttons.forEach((item) => {
  // Definování události kliknutí pro každé tlačítko
  item.onclick = () => {
    // Pokud tlačítko má id "clear"
    if (item.id == "clear") {
      // Vymaž obsah displeje
      display.innerText = "";
    } 
    // Pokud tlačítko má id "backspace"
    else if (item.id == "backspace") {
      // Převeď obsah displeje na řetězec
      let string = display.innerText.toString();
      // Odstraň poslední znak z displeje
      display.innerText = string.substr(0, string.length - 1);
    } 

    //výpočet
    else if (display.innerText != "" && item.id == "equal") {
      try {
        // Ověření platnosti výrazu
        display.innerText = eval(display.innerText);
      } catch (error) {
        display.innerText = "Error!";
        setTimeout(() => (display.innerText = ""), 2000);
      }
    } 
    
    else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    }

    // Pokud tlačítko má id "power" (na druhou)
    else if (item.id == "power") {
      try {
        // Na druhou číslo na displeji
        display.innerText = Math.pow(eval(display.innerText), 2);
      } catch {
        display.innerText = "Error";
        setTimeout(() => (display.innerText = ""), 2000);
      }
    }
    else if (item.id == ".") {
      // Přidej desetinnou tečku, pokud aktuální výraz neobsahuje tečku v posledním čísle
      let currentText = display.innerText;
      if (!currentText.endsWith(".")) {
        display.innerText += ".";
      }
    }
    else if (item.id == "%") {
      let currentText = display.innerText;
      if (!currentText.endsWith("%")) {
        display.innerText = parseFloat(currentText) / 100;
      }
    }
    // Ve všech ostatních případech (tlačítka s čísly a operátory)
    else {
      // Přidej ID tlačítka k aktuálnímu textu na displeji
      display.innerText += item.id;
    }
  };
});

// Najde tlačítko pro přepínání témat na stránce
const themeToggleBtn = document.querySelector(".theme-toggler");
// Najde kalkulačku na stránce
const calculator = document.querySelector(".calculator");
// Najde ikonu přepínače témat na stránce
const toggleIcon = document.querySelector(".toggler-icon");
// Nastaví výchozí stav tématu na tmavý (true)
let isDark = true;

// Přidá událost kliknutí na tlačítko pro přepínání témat
themeToggleBtn.onclick = () => {
  // Přepne třídu "dark" na prvku kalkulačky
  calculator.classList.toggle("dark");
  // Přepne třídu "active" na tlačítku pro přepínání témat
  themeToggleBtn.classList.toggle("active");
  // Změní hodnotu proměnné isDark na opačnou (světlou) (pokud byla true, změní na false a naopak)
  isDark = !isDark;
};

//možnost psát do kalkulačky klávesnicí

// Počká, až se celý dokument načte
document.addEventListener('DOMContentLoaded', (event) => {
  // Přidá událost pro stisk klávesy
  document.addEventListener('keydown', (event) => {
      const key = event.key; // Získá hodnotu stisknuté klávesy

      // Funkce pro manipulaci s displejem kalkulačky
      const display = document.getElementById('display');

      // Funkce pro výpočty
      const calculator = (key) => {
        display.innerText += key;
      };

      // Funkce pro vyhodnocení výrazu
      const calculate = () => {
        try {
            // Kontrola platnosti výrazu pomocí eval()
            eval(display.innerText); // Pokusí se vyhodnotit výraz
            display.innerText = eval(display.innerText); // Pokud je vše v pořádku, vyhodnotí výraz a zobrazí výsledek
        } catch (error) {
            display.innerText = "Error!"; // Pokud je výraz nesprávně zapsán, zobrazí chybu
            setTimeout(() => (display.innerText = ""), 2000); // Po 2 sekundách vymaže chybové hlášení
        }
      };
      // Funkce pro smazání posledního znaku (backspace)
      const clearLastCharacter = () => {
        display.innerText = display.innerText.slice(0, -1);
      };

      // Funkce pro vymazání celého displeje (delete)
      const clearCalculator = () => {
        display.innerText = "";
      };

      //výpočet procent (1% danné hodnoty = /100)
      if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.', '%'].includes(key)) {
        if (key === '%') {
          let currentText = display.innerText;
          if (!currentText.endsWith("%")) {
            display.innerText = parseFloat(currentText) / 100;
          }
        } else {
          calculator(key); // Přidá hodnotu klávesy na displej
        }
      } 
      else if (key === 'Enter') {
        event.preventDefault(); // Předejde výchozímu chování Enter (zajistí že se to nebude mazat)
        calculate(); // Vyhodnotí výraz
      } 
      else if (key === 'Backspace') {
        clearLastCharacter(); // Smaže poslední znak
      } 
      else if (key === 'Delete') {
        clearCalculator(); // Vymaže celý displej
      }
  });
});
