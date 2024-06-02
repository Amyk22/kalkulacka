// Vyhledá HTML prvek s id "display" (obrazovka kalkulačky)
const display = document.querySelector("#display");
// Vyhledá všechny HTML tlačítka na stránce
const buttons = document.querySelectorAll("button");

// Procházení všech tlačítek v poli "buttons"
buttons.forEach((item) => {
  // Definování události kliknutí pro každé tlačítko
  item.onclick = () => {
    // Pokud tlačítko má id "clear" (tlačítko pro vymazání)
    if (item.id == "clear") {
      // Vymaž obsah displeje
      display.innerText = "";
    } 
    // Pokud tlačítko má id "backspace" (tlačítko pro smazání posledního znaku)
    else if (item.id == "backspace") {
      // Převeď obsah displeje na řetězec
      let string = display.innerText.toString();
      // Odstraň poslední znak z displeje
      display.innerText = string.substr(0, string.length - 1);
    } 
    // Pokud je displej ne prázdný a tlačítko má id "equal" (tlačítko pro výpočet)
    else if (display.innerText != "" && item.id == "equal") {
      try {
        // Vyhodnoť matematický výraz a zobraz výsledek
        display.innerText = eval(display.innerText);
      } catch (error) {
        // Pokud je chyba ve výrazu, zobraz chybovou hlášku a po 2 sekundách ji smaž
        display.innerText = "Error!";
        setTimeout(() => (display.innerText = ""), 2000);
      }
    } 
    // Pokud je displej prázdný a tlačítko má id "equal"
    else if (display.innerText == "" && item.id == "equal") {
      // Zobraz hlášku "Empty!" a po 2 sekundách ji smaž
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    }
    // Pokud tlačítko má id "power" (tlačítko pro umocnění na druhou)
    else if (item.id == "power") {
      try {
        // Umocni číslo na displeji na druhou a zobraz výsledek
        display.innerText = Math.pow(eval(display.innerText), 2);
      } catch {
        // Pokud je chyba, zobraz chybovou hlášku a po 2 sekundách ji smaž
        display.innerText = "Error";
        setTimeout(() => (display.innerText = ""), 2000);
      }
    }
    // Pokud tlačítko má id "." (desetinná tečka)
    else if (item.id == ".") {
      // Přidej desetinnou tečku, pokud aktuální výraz neobsahuje tečku v posledním čísle
      let currentText = display.innerText;
      if (!currentText.endsWith(".")) {
        display.innerText += ".";
      }
    }
    // Pokud tlačítko má id "%" (procenta)
    else if (item.id == "%") {
      let currentText = display.innerText;
      if (!currentText.endsWith("%")) {
        // Vypočti procento z aktuální hodnoty a zobraz výsledek
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

// Možnost psát do kalkulačky klávesnicí

// Počká, až se celý dokument načte
document.addEventListener('DOMContentLoaded', (event) => {
  // Přidá událost pro stisk klávesy
  document.addEventListener('keydown', (event) => {
    // Získá hodnotu stisknuté klávesy
    const key = event.key;

    // Funkce pro manipulaci s displejem kalkulačky
    const display = document.getElementById('display');

    // Funkce pro přidání klávesy na displej kalkulačky
    const calculator = (key) => {
      display.innerText += key;
    };

    // Funkce pro vyhodnocení výrazu na displeji kalkulačky
    const calculate = () => {
      try {
        // Vyhodnoť výraz a zobraz výsledek
        eval(display.innerText);
        display.innerText = eval(display.innerText);
      } catch (error) {
        // Pokud je chyba, zobraz chybovou hlášku a po 2 sekundách ji smaž
        display.innerText = "Error!";
        setTimeout(() => (display.innerText = ""), 2000);
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

    // Pokud stisknutá klávesa je číslo nebo operátor
    if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.', '%'].includes(key)) {
      if (key === '%') {
        let currentText = display.innerText;
        if (!currentText.endsWith("%")) {
          display.innerText = parseFloat(currentText) / 100;
        }
      } else {
        // Přidá hodnotu klávesy na displej
        calculator(key);
      }
    } 
    // Pokud je stisknutá klávesa Enter, vyhodnoť výraz
    else if (key === 'Enter') {
      event.preventDefault();
      calculate();
    } 
    // Pokud je stisknutá klávesa Backspace, smaž poslední znak
    else if (key === 'Backspace') {
      clearLastCharacter();
    } 
    // Pokud je stisknutá klávesa Delete, vymaž celý displej
    else if (key === 'Delete') {
      clearCalculator();
    }
  });
});
