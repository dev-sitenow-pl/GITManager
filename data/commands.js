const lang = {
  "button": "Użyj",
  "buttonCopy": "Użyto"
}

const commandsData = [
  {
    "category": "Najczęściej stosowane",
    "commands": [
      {
        "command": "git status",
        "description": "Sprawdza aktualny stan repozytorium."
      },
      {
        "command": "git add .",
        "description": "Dodaje wszystkie zmienione pliki do indeksu."
      },
      {
        "command": "git push",
        "description": "Wysyła zmiany do zdalnego repozytorium."
      },
      {
        "command": "git pull",
        "description": "Pobiera zmiany z zdalnego repozytorium."
      },
      {
        "command": "git log --oneline --decorate --graph --all",
        "description": "Wyświetla szczegółową historię commitów w postaci graficznej linii czasu, łącznie z dekoracjami i wszystkimi gałęziami."
      }
    ]
  },
  {
    "category": "Praca z gałęziami (Branching i Merging)",
    "commands": [
      {
        "command": "git branch",
        "description": "Wyświetla listę lokalnych gałęzi."
      }
    ]
  },
  {
    "category": "Inspekcja i Porównywanie",
    "commands": [
      {
        "command": "git log",
        "description": "Wyświetla historię commitów."
      },
      {
        "command": "git diff",
        "description": "Pokazuje różnice między zmianami."
      },
      {
        "command": "git log --oneline --decorate --graph --all",
        "description": "Wyświetla szczegółową historię commitów w postaci graficznej linii czasu, łącznie z dekoracjami i wszystkimi gałęziami."
      }
    ]
  },
  {
    "category": "Naprawa i Modyfikacja",
    "commands": [
      {
        "command": "git reset",
        "description": "Resetuje indeks i opcjonalnie bieżący stan roboczy do określonego stanu."
      }
    ]
  },
  {
    "category": "Tagowanie i Wersjonowanie",
    "commands": [
      {
        "command": "git tag",
        "description": "Wyświetla listę dostępnych tagów."
      }
    ]
  },
  {
    "category": "Zaawansowane Ustawienia i Konfiguracja",
    "commands": [
      {
        "command": "git config --list",
        "description": "Wyświetla listę wszystkich ustawień konfiguracyjnych Git."
      }
    ]
  },
  {
    "category": "Zdalne Repozytoria (Remote)",
    "commands": [
      {
        "command": "git remote -v",
        "description": "Wyświetla adresy do zdalnych repozytoriów."
      }
    ]
  },
  // {
  //   "category": "Narzędzia i Wtyczki",
  //   "commands": [
  //     // Tutaj możesz dodać komendy związane z narzędziami i wtyczkami, jeśli istnieją.
  //   ]
  // },
  // {
  //   "category": "Zabezpieczenia i Prywatność",
  //   "commands": [
  //     // Tutaj możesz dodać komendy związane z zabezpieczeniami i prywatnością, jeśli istnieją.
  //   ]
  // },
  // {
  //   "category": "Poza Ścieżką (Diverse Tricks)",
  //   "commands": [
  //     // Tutaj możesz dodać mniej znane, ale przydatne komendy i triki.
  //   ]
  // }
]



// console.log(lang);